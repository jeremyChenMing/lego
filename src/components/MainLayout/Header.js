import React from 'react'
import { Menu, Icon, Row, Col, Avatar } from 'antd'
import { Link } from 'dva/router'
import cx from 'classnames'
import l from './Header.less'
const { SubMenu } = Menu;


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '作品', path: '/main'},
        {name: '商城', path: '/shop'},
        {name: '关于我们', path: '/users'},
      ]
    }
  }

  render() {
    const { location } = this.props;
    const { nav } = this.state;
    return (
      <div className={cx(l.headerBox)}>
        <Row className={cx(l.header, 'main_container')}>
          <Col span={4} className={cx(l.left)}>
            brickFUN
          </Col>
          <Col span={17} className={cx(l.right)}>
            {
              nav.map( (item,index) => {
                return <Link className={cx(l.menuItems, l[('/#' + location.pathname).indexOf(item.path) !== -1 ? 'active' : null])} key={index} to={item.path}>{item.name}</Link> 
              })
            }
          </Col>
          <Col span={3} className={cx(l.avatar)}>
            {
              true ?
              <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
              :
              <span>
                <a>登录</a>
                <span className="ant-divider" />
                <a>注册</a>
              </span>
            }
          </Col>
        </Row>
      </div>
      
    );
  }
}


export default Header
