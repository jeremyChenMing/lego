import React from 'react'
import { Router, Route, Switch, BrowserRouter, HashRouter, Redirect } from 'dva/router'
import dynamic from 'dva/dynamic'

function RouterConfig ({ history, app }) {
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage')
  })

  const Users = dynamic({
    app,
    component: () => import('./routes/Users')
  })

  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact render={() => <Redirect to="/main"/>}  />
        <Route path='/main'  component={IndexPage} />
        <Route path='/shop'  component={IndexPage} />
        <Route path='/users' component={Users} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
