import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'
import cx from 'classnames';
import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout'
import _ from 'lodash'
import { Button } from 'antd'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    return (
      <MainLayout location={location}>
        <div >
          index page
        </div>
      </MainLayout>
    );
  }
}



export default connect()(IndexPage)
