import React from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <UserLayout>登录注册</UserLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
