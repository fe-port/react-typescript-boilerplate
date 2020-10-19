import React from 'react'
// import * as Sentry from '@sentry/browser'

interface Props {}

type IError = null | {
  message: string
}

interface State {
  hasError: boolean
  error: IError
  errorInfo: unknown
}

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null, errorInfo: null }

  componentDidCatch(error: IError, info: unknown) {
    this.setState({ hasError: true, error, errorInfo: info })
    // Sentry.captureException(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="error-boundary"
          onClick={() => {
            console.warn('ErrorBoundary error snap')
            // Sentry.lastEventId() && Sentry.showReportDialog()
          }}
        >
          <p>Quelqu'un a fait une boulette quelque part</p>
          <p>Des investigations sont en cours pour retrouver les coupables</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
