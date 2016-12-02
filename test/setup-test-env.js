/**
 * This is used to set up the environment that's needed for most
 * of the unit tests for the project which includes babel transpilation
 * with babel-register, polyfilling, and initializing the DOM with jsdom
 */
require('babel-register')
require('babel-polyfill')

global.document = require('jsdom').jsdom('<body></body>')

global.window = document.defaultView
global.navigator = window.navigator
global.$GLOBALCONFIG = {
  $ctx: 'http://localhost:3000',
  STAFF: {
    code: '01188',
    name: '黄日天',
    previousLoginTime: '2016-08-01 3:11:29',
    previousLoginIp: '192.168.1.12',
    previousLoginCity: '',
    id: '43',
  },
}
