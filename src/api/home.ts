import { defHttp } from '@/utils/http/index'

enum API {
  BRAND_INFO = "/mock/brans.json"
}

export const getBrand = () => defHttp.post<void>({ url: API.BRAND_INFO });
