import axios, { Method, AxiosRequestConfig, CancelTokenSource, Canceler } from "axios";

interface Config {
  method?: Method
}

interface AxiosResponse {
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

  private async responseDestructor(promise: Promise<AxiosResponse>,
    path: string, requestBody: any): Promise<any> {
    try {
      return await promise;
    } catch ({ error, result }) {
      return this.ErrorHandler(path, requestBody, error, result);
    }
  }

  private requestBuilder(path: string, requestBody: any,
    config: Config, axiosConfig: AxiosRequestConfig = {}): AxiosResponse {
    //if (this.signRequests ) TODO

    let source: CancelTokenSource = axios.CancelToken.source();

    axiosConfig = {
      ...axiosConfig,
      url: path,
      method: config.method = "post",
      data: requestBody,
      cancelToken: source.token
    };

    let request = axios.request(axiosConfig)
      .then(
        ({ data }) => {
          if (data.error)
            Promise.reject(data);

          return data.result;
        }, (error) => {
          if (axios.isCancel(error))
            Promise.reject({ error: 'Request canceled' });

          Promise.reject({ error });
        }
      );

    return {
      cancel: source.cancel,
      request
    };
  }

  private ErrorHandler(path: string, requestBody: any, error: any, result: any) {
    if (!error.code)
      return Promise.reject(error);

    switch (error.code) {
      default:
        return Promise.reject(error);
    }
  }
}