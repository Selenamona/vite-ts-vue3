import { defHttp } from '@/utils/http/index'

enum API {
  BRAND_INFO = "/mock/brans.json",
  HOMELIST_INFO = "/mock/getHomeList.json",
  PERSONAL_INFO = "/mock/getPersonal.json",
}


interface GetBrandInfoModel {
  dataList: []
  pageCount: number
  pageIndex: number
  rowCount: number
}

export const getBrand = () => defHttp.post<GetBrandInfoModel>({ url: API.BRAND_INFO });
export const createList = () => defHttp.post<GetBrandInfoModel>({ url: API.HOMELIST_INFO });
export const getPersonalInfo = () => defHttp.post<GetBrandInfoModel>({ url: API.PERSONAL_INFO });


