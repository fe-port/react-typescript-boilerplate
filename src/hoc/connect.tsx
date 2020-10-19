/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { connect as _connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import './connect.less'

type IError = null | { message: string }

const FallbackComponent: React.FC<{
  error: IError
  errorInfo: unknown
}> = props => <pre className="fallback-component">{props.error?.message}</pre>

const connect = (key: string, component: React.ComponentType<any>) => {
  const mapStateToProps = (state: any) => ({
    data: state[key]
  })
  const mapDispatchToProps = (data: { [x: string]: any }) => ({ ...data[key] })
  return _connect(mapStateToProps, mapDispatchToProps)(component)
}

export const withConnect = (
  { model, Component }: { model: string; Component: React.ComponentType<any> },
  title?: string
) => {
  interface Props {}
  interface State {
    hasError: boolean
    error: null | { message: string }
    errorInfo: unknown
  }

  class WithErrorHandler extends React.Component<Props, State> {
    static displayName = `WithErrorHandler${Component.displayName}`

    constructor(props: Readonly<unknown>) {
      super(props)

      this.state = {
        hasError: false,
        error: null,
        errorInfo: null
      }
    }

    componentDidMount() {
      if (title) {
        document.title = title
      }
    }

    componentDidCatch(error: IError, errorInfo: unknown) {
      this.setState({ hasError: true, error, errorInfo })
    }

    render() {
      if (this.state.hasError) {
        const { error, errorInfo } = this.state
        return (
          <FallbackComponent
            {...this.props}
            error={error}
            errorInfo={errorInfo}
          />
        )
      }
      return <Component {...this.props} />
    }
  }
  return connect(
    model,
    withTranslation()(WithErrorHandler as React.ComponentType<any>)
  )
}
