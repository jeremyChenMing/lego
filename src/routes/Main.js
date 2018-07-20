import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'
import cx from 'classnames';
import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { Router, Route, Switch, BrowserRouter, HashRouter, Redirect } from 'dva/router'
import HotWorks from '../components/HotWorks'
import TotalWorks from '../components/TotalWorks'
import _ from 'lodash'
import { Button, Layout, Carousel, Row, Col, Icon, message } from 'antd'
const { Content, Footer } = Layout;

import IndexPage from './IndexPage'
import Detail from '../components/Detail'

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/main/hot'  component={IndexPage} />
          <Route path='/main/total'  component={IndexPage} />
          <Route path='/main/detail'  component={Detail} />
        </Switch>
      </div>
    );
  }
}


export default Main;
