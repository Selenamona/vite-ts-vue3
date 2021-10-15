import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios';
import { checkStatus } from "./checkStatus"

interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  data: T;
}

// 配置项
interface RequestOptions {
  hideLoading?: boolean
}

interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * 拦截器
   */
  private setupInterceptors() {

    // 请求拦截器处理
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    })

    // 响应拦截器处理
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      return res
    }, (e) => {
      // 响应错误处理
      const { response, code, message } = e || {};
      const msg: string = response?.data?.err?.message ?? '';
      const err: string = e?.toString?.() ?? '';
      try {
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
          console.log('sys.api.apiTimeoutMessage');
        }
        if (err?.includes('Network Error')) {
          console.log('sys.api.networkException');

        }
      } catch (error: any) {
        throw new Error(error);
      }
      checkStatus(e?.response?.status, msg);
    })
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  // 请求
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    return new Promise((resolve, reject) => {
      this.axiosInstance.request(config)
        .then((res: AxiosResponse<Result>) => {
          try {
            const { data: result } = res;
            console.log("🚀 ~ file: index.ts ~ line 77 ~ VAxios ~ .then ~ result", result)
            if (!result) {
              throw new Error('sys.api.apiRequestFailed'); // return '[HTTP] Request has no return value';
            }
            const { code, data, message } = result;
            if (code === 0) {
              console.log("请求结果：", data)
              resolve(data);
            } else {
              throw new Error(message || "sys.api.apiRequestFailed");
            }
          } catch (err) {
            reject(err || new Error('request error!'));
          }

        })
        .catch((err: Error) => {
          reject(err || new Error('request error!'));
        })
    })
  }
}


function createAxios() {
  return new VAxios({})
}

export const defHttp = createAxios();
