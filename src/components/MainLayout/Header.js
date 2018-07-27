import React from 'react'
import { connect } from 'dva'
import { Menu, Icon, Row, Col, Avatar, Dropdown } from 'antd'
import { Link, routerRedux } from 'dva/router'
import { outUser } from '../../services/common'
import { clearUserInfo } from '../../actions/example'
import cx from 'classnames'
import l from './Header.less'


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '作品', path: '/main/hot'},
        {name: '商城', path: '/shop'},
        {name: '关于我们', path: '/us'},
      ],
      active: -1,
    }
  }
  componentDidMount() {
    const { location: {pathname} } = this.props;
    let num = -1;
    if (pathname.indexOf('main') !== -1) {
      num = 0;
    }else if (pathname.indexOf('shop') !== -1) {
      num = 1;
    }else if (pathname.indexOf('us') !== -1) {
      num = 2;
    }
    this.setState({
      active: num
    })
  }
  upload = () => {
    document.location.href = `#/upload`;
  }

  quiteSys = async() => {
    // 退出登录
    const { dispatch } = this.props;
    try{
      const result = await outUser();
      if (result && !result.code) {
        dispatch(clearUserInfo())
        // Storage.clear()
        dispatch(routerRedux.replace('/login'))
      }
    }catch(err) {
      console.log(err)
    }
  }

  clickMore = ({key}) => {
    const { dispatch } = this.props;
    if (key === '0') {
      dispatch(routerRedux.push('/center'))
    }else if (key === '1') {
      this.quiteSys()
    }
  }
  render() {
    const { location, example } = this.props;
    const { nav, active } = this.state;
    const menu = (
      <Menu onClick={this.clickMore}>
        <Menu.Item key="0">
          <a>个人中心</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <a>退出登录</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={cx(l.headerBox)}>
        <Row className={cx(l.header, 'main_container')}>
          <Col span={4} className={cx(l.left)}>
            <img src="/img/brickFUN.png" alt=""/>
            <span>筑乐 <i>。</i></span>
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
              example.access_token ?
              <div className={cx(l.logined)}>
                <Icon onClick={this.upload} className={cx(l.upload)} style={{fontSize: '25px'}} type="cloud-upload-o" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Dropdown overlay={menu} trigger={['click']}>
                  <Avatar src={'/img/avart1.png'} style={{ backgroundColor: '#87d068', cursor: 'pointer' }} size="small" />
                </Dropdown>
              </div>
              
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

const mapState = state => {
  const { example } = state;
  return{
    example
  }
}
export default connect(mapState)(Header)
