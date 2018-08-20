import React from 'react'
import { Router, Route, Switch, BrowserRouter, HashRouter, Redirect } from 'dva/router'
import dynamic from 'dva/dynamic'

import Main from './routes/Main'
import Login from './routes/Login'
import Person from './routes/Person'
import Shopping from './routes/Shopping'
import Users from './routes/Users'
import Upload from './routes/Upload'
import Center from './routes/Center'

function RouterConfig ({ history, app }) {
  // const Main = dynamic({
  //   app,
  //   component: () => import('./routes/Main')
  // })
  // const Login = dynamic({
  //   app,
  //   component: () => import('./routes/Login')
  // })
  // const Person = dynamic({
  //   app,
  //   component: () => import('./routes/Person')
  // })
  // const Shopping = dynamic({
  //   app,
  //   component: () => import('./routes/Shopping')
  // })
  // const Users = dynamic({
  //   app,
  //   component: () => import('./routes/Users')
  // })
  // const Upload = dynamic({
  //   app,
  //   component: () => import('./routes/Upload')
  // })
  // const Center = dynamic({
  //   app,
  //   component: () => import('./routes/Center')
  // })

  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact render={() => <Redirect to='/main/hot' />} />
        <Route path='/main' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/person/:id' component={Person} />
        <Route path='/shop' component={Shopping} />
        <Route path='/us' component={Users} />
        <Route path='/upload' component={Upload} />
        <Route path='/center' component={Center} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
