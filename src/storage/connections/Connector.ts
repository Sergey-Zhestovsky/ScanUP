import axios, { Method, AxiosRequestConfig, CancelTokenSource, Canceler, AxiosResponse } from "axios";
import ServerError, { ServerErrorCodes as ErrorCodes } from "../../classes/ServerError";

interface Config {
  method?: Method
}

interface ServerResponse {
  error: object,
  result?: object
}

interface Response {
  cancel: Canceler;
  request: any;
}

export default class Connector {

  protected signRequests: boolean;

  constructor({ signRequests = false }: { signRequests?: boolean } = {}) {
    this.signRequests = signRequests;
  }

  * request(path: string, requestBody: any, config: Config = {},
    axiosConfig: AxiosRequestConfig): Generator {
    let requestObject = this.requestBuilder(path, requestBody, config, axiosConfig);

    yield requestObject.cancel;
    yield this.responseDestructor(requestObject.request, path, requestBody);
  }

  straightRequest(path: string, requestBody?: any, config: Config = {},
    axiosConfig?: AxiosRequestConfig): Promise<any> {
    return this.responseDestructor(
      this.requestBuilder(path, requestBody, config, axiosConfig).request,
      path,
      requestBody
    );
  }

  private async responseDestructor(promise: Promise<AxiosResponse<ServerResponse>>,
    path: string, requestBody: any): Promise<any> {
    try {
      let { data } = await promise;

      if (data.error) // connection is ok, error in body
        return this.ErrorHandler(path, requestBody, data.error, data.result);

      return data.result;
    } catch (error) {
      if (axios.isCancel(error))
        error.code = ErrorCodes.AXIOS__REQUEST_CANCELED;

      return this.ErrorHandler(path, requestBody, error);
    }
  }

  private requestBuilder(path: string, requestBody: any,
    config: Config, axiosConfig: AxiosRequestConfig = {}): Response {
    let source: CancelTokenSource = axios.CancelToken.source();

    axiosConfig = {
      ...axiosConfig,
      url: path,
      method: config.method = "post",
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