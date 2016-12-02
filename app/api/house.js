import { ajax } from 'utils'

export const houseCheckList = ajax.fetchJSONByPost('/house/houseCheck')
export const houseDetail = ajax.fetchJSONByPost('/house/detail')
