import axios, { Method, AxiosRequestConfig, CancelTokenSource, Canceler, AxiosResponse } from "axios";
import ServerError, { ServerErrorCodes as ErrorCodes } from "../../classes/ServerError";

interface Config {
  method?: Method
}

interface DefaultServerResponse {
  error: object,
  result?: object
}

interface Response {
  cancel: Canceler;
  request: any;
}

interface ConnectorConfig {
  signRequests?: boolean;
  responseType?: ResponseType
  axiosConfig?: AxiosRequestConfig
}

export enum ResponseType {
  defaultObject,
  text
}

export default class Connector {

  protected signRequests: boolean;
  protected responseType: ResponseType;
  protected axiosConfig: AxiosRequestConfig;

  constructor({
    signRequests = false,
    responseType = ResponseType.defaultObject,
    axiosConfig = {}
  }: ConnectorConfig = {}) {
    this.signRequests = signRequests;
    this.responseType = responseType;
    this.axiosConfig = axiosConfig;
  }

  protected * request(path: string, requestBody: any, config: Config = {},
    axiosConfig: AxiosRequestConfig): Generator {
    let requestObject = this.requestBuilder(path, requestBody, config, axiosConfig);

    yield requestObject.cancel;
    yield this.responseDestructor(requestObject.request, path, requestBody);
  }

  protected straightRequest(path: string, requestBody?: any, config: Config = {},
    axiosConfig?: AxiosRequestConfig): Promise<any> {
    return this.responseDestructor(
      this.requestBuilder(path, requestBody, config, axiosConfig).request,
      path,
      requestBody
    );
  }

  private async responseDestructor(promise: Promise<AxiosResponse<any>>,
    path: string, requestBody: any): Promise<any> {
    try {
      let { data } = await promise;

      switch (this.responseType) {
        case ResponseType.defaultObject:
          return await defaultObjectHandler(data, this.ErrorHandler);
        case ResponseType.text:
          return await textHandler(data, this.ErrorHandler);
        default: return data;
      }
    } catch (error) {
      if (axios.isCancel(error))
        error.code = ErrorCodes.AXIOS__REQUEST_CANCELED;

      return this.ErrorHandler(path, requestBody, error);
    }

    function defaultObjectHandler(data: DefaultServerResponse,
      ErrorHandler: Function) {
      if (data.error)
        return ErrorHandler(path, requestBody, data.error, data.result);

      return data.result;
    }

    function textHandler(data: string, ErrorHandler: Function) {
      return data;
    }
  }

  private requestBuilder(path: string, requestBody: any,
    config: Config, axiosConfig: AxiosRequestConfig = {}): Response {
    let source: CancelTokenSource = axios.CancelToken.source();

    axiosConfig = {
      method: "post",
      ...this.axiosConfig,
      ...axiosConfig,
      ...config,
      url: path,
      data: requestBody,
      cancelToken: source.token
    };

    let request = axios.request(axiosConfig);

    return {
      cancel: source.cancel,
      request
    };
  }

  private ErrorHandler(path: string, requestBody: any, error: any, result?: any) {
    if (!error.code)
      return Promise.reject(error);

    switch (error.code) {
      case ErrorCodes.AXIOS__REQUEST_CANCELED: return Promise.reject(error);
      default: return Promise.reject(ServerError.create(error));
    }
  }
}