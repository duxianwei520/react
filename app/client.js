import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '@config'
import Routes from '@configs/router.config'
import configure from '@middleware/configureStore'

const store = configure({ })
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
