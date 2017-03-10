import fetch from 'isomorphic-fetch'
import { API_PREFIX, API_SUFFIX } from '../constants'

// todo : 连接store
const code = global.$GLOBALCONFIG.STAFF.code


export function fetchJSON(url, params) {
  // eslint-disable-next-line no-param-reassign
  params = {
    ...params,
    headers: {
      // 'User-Code': code,
      // credentials: 'include',
      // 'X-Requested-With': 'XMLHttpRequest',
      // Connection: 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      ...params.headers,
    },
  }
  // eslint-disable-next-line no-param-reassign
  url = `${API_PREFIX}${url}${API_SUFFIX}`
  return fetch(url, params)
}
function buildParams(obj) {
  if (!obj) {
    return ''
  }
  const params = []
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      const value = obj[key] === undefined ? '' : obj[key]
      params.push(`${key}=${value}`)
    }
  }
  return params.join('&')
}
// eslint-disable-next-line arrow-parens
export const fetchJSONByPost = url => query => {
  const params = {
    method: 'POST',
    body: buildParams(query),
  }
  return fetchJSON(url, params)
}

export const fetchJSONStringByPost = url => query => {
  const params = {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }
  return fetchJSON(url, params)
}
