import React from 'react'
import { connect } from 'dva'
import l from './Users.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { Form, Input, Icon, Button, notification, } from 'antd';




function widthConnect(WrappedComponent, data) {
  class WithComponent  extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
    }
    componentDidMount() {
      this.setState({
        data: data
      })
    }
    noti = (msg) => {
      notification.error({
        message: `${msg}`
      })
    }

    render() {
      const { data } = this.state
      return <WrappedComponent data={data} error={this.noti} {...this.props}/>
    }
  }
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  WithComponent.displayName = `width_${getDisplayName(WrappedComponent)}`; //displayName 方便调试查找
  return WithComponent
  
}

class Noti extends React.Component {
  constructor(props) {
    super(props);
  }
  handle = () => {
    this.props.error('错误的信息')
  }
  render() {
    return (
      <div>
        <Button onClick={this.handle}>noti</Button>
      </div>
    );
  }
}

Noti = widthConnect(Noti, [1,2,3])











































class Users extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {location} = this.props;
    return (
      <MainLayout location={location}>
        
      </MainLayout>
    );
  }
}

export default Users
