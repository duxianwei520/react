const tableList = require('./datas/tableList')

const prefix = '.json'

module.exports = {
  [`/tableList${prefix}`]: tableList,
}
