import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { store, history } from './store/rematch'
import ErrorBoundary from './modules/ErrorBoundary'
import App from './App'
import './index.less'

// if (process.env.sentry) {
//   const Sentry = require('@sentry/browser')
//   Sentry.init({ dsn: process.env.sentry.SENTRY_DNS })
// }

interface Props {}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ConnectedRouter>
    </Provider>
  )
}

const Content = (
  <Router history={history}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Router>
)

function bootstrap() {
  if (false /* process.env.rematch && process.env.antd */) {
    const { getPersistor } = require('@rematch/persist')
    const { PersistGate } = require('redux-persist/integration/react')
    const persistor = getPersistor()
    ReactDOM.render(
      <Wrapper>
        <PersistGate persistor={persistor}>{Content}</PersistGate>
      </Wrapper>,
      document.querySelector('#root')
    )
  } else {
    ReactDOM.render(
      <Wrapper>{Content}</Wrapper>,
      document.querySelector('#root')
    )
  }
}

bootstrap()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
