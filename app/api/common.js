import { ajax } from 'utils'

export const amList = ajax.fetchJSONByPost('/common/amList')
export const login = ajax.fetchJSONByPost('/login')
export const register = ajax.fetchJSONByPost('/register')
