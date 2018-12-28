const fetchUserDepttList = require('./fetchUserDepttList')
const fetchRoleList = require('./fetchRoleList')
const fetchUserList = require('./fetchUserList')
const fetchUserDetail = require('./fetchUserDetail')
const fetchUserDetailUpdate = require('../../success')
const fetchUserAdd = require('../../success')
const fetchUserDelete = require('../../success')
const fetchUserSetRole = require('../../success')
const fetchChangeUserStatus = require('../../success')
const synUser = require('../../success')


module.exports = {
  fetchUserDepttList,
  fetchRoleList,
  fetchUserList,
  fetchUserDetail,
  fetchUserDetailUpdate,
  fetchUserAdd,
  fetchUserDelete,
  fetchUserSetRole,
  fetchChangeUserStatus,
  synUser,
}
