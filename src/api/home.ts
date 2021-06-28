import { defHttp } from '@/utils/http/index'

enum API {
  BRAND_INFO = "/mock/brans.json"
}


interface GetBrandInfoModel {
  dataList: []
  pageCount: number
  pageIndex: number
  rowCount: number
}

export const getBrand = () => defHttp.post<GetBrandInfoModel>({ url: API.BRAND_INFO });
