import {
  createAction,
} from 'redux-actions'
import {
  house,
} from 'api'
import {
  createAjaxAction,
} from 'utils'


export const requestHouseCheckList = createAction('request houseCheck list');
export const recevieHouseCheckList = createAction('receive houseCheck list');
export const fetchHouseCheckList = createAjaxAction(
	house.houseCheckList,
	requestHouseCheckList,
	recevieHouseCheckList
)

export const updateHouseCheckListQuery = createAction('update houseCheck search query', payload => payload)
export const resetHouseCheckListQuery = createAction('reset houseCheck search query');

export const requestHouseDetail = createAction('request house detail')
export const recevieHouseDetail = createAction('receive house detail')
export const fetchHouseDetail = createAjaxAction(house.houseDetail, requestHouseDetail, recevieHouseDetail)
