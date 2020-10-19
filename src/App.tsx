import React from 'react'
// import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
import Routers from './routes'

const App = () => {
  return <Routers />
}

let RouteApp = withRouter(App)
if (process.env.NODE_ENV === 'development') {
  const { hot } = require('react-hot-loader/root')
  RouteApp = hot(RouteApp)
}

export default RouteApp
