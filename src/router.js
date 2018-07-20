import React from 'react'
import { Router, Route, Switch, BrowserRouter, HashRouter, Redirect } from 'dva/router'
import dynamic from 'dva/dynamic'

function RouterConfig ({ history, app }) {
  const Main = dynamic({
    app,
    component: () => import('./routes/Main')
  })

  const Users = dynamic({
    app,
    component: () => import('./routes/Users')
  })

  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact render={() => <Redirect to="/main/hot"/>}  />
        <Route path='/main'  component={Main} />
        <Route path='/detail'  component={Main} />
        <Route path='/shop'  component={Main} />
        <Route path='/users' component={Users} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
