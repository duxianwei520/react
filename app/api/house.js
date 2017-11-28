import { ajax } from 'utils'

export const houseCheckList = ajax.fetchJSONByPost('/tableList')
export const houseDetail = ajax.fetchJSONByPost('/house/detail')
