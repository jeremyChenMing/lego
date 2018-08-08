import React from 'react'
// import { connect } from 'dva'
// import l from './Users.less'
import MainLayout from '../components/MainLayout/MainLayout'
// import { Form, Input, Icon, Button, notification } from 'antd'

class Users extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const {location} = this.props
    return (
      <MainLayout location={location} />
    )
  }
}

export default Users
