import { ajax } from 'utils'

export const houseCheckList = ajax.fetchJSONByPost('/api/demo')
export const houseDetail = ajax.fetchJSONByPost('/house/detail')
