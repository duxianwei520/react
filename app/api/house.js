import { ajax } from 'utils'

export const houseCheckList = ajax.fetchJSONByPost('/mockapi/data')
export const houseDetail = ajax.fetchJSONByPost('/house/detail')
