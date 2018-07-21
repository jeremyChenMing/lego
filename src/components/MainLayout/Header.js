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
        {name: '作品', path: '/main/hot'},
        {name: '商城', path: '/shop'},
        {name: '关于我们', path: '/users'},
      ],
      active: 0,
    }
  }
  componentDidMount() {
    const { location: {pathname} } = this.props;
    if (pathname.indexOf('main')) {
      this.setState({
        active: 0
      })
    }else if (pathname.indexOf('shop')) {
      this.setState({
        active: 1
      })
    }else if (pathname.indexOf('us')) {
      this.setState({
        active: 2
      })
    }
  }
  render() {
    const { location } = this.props;
    const { nav, active } = this.state;
    return (
      <div className={cx(l.headerBox)}>
        <Row className={cx(l.header, 'main_container')}>
          <Col span={4} className={cx(l.left)}>
            <img src="/img/brickFUN.png" alt=""/>
          </Col>
          <Col span={17} className={cx(l.right)}>
            {
              nav.map( (item,index) => {
                return <Link className={cx(l.menuItems, l[ active === index ? 'active' : null])} key={index} to={item.path}>{item.name}</Link> 
              })
            }
          </Col>
          <Col span={3} className={cx(l.avatar)}>
            {
              false ?
              <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
              :
              <span>
                <a href="#/login">登录</a>
                <span className="ant-divider" style={{backgroundColor: '#000'}}/>
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
