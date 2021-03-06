import React from 'react'
import { connect } from 'dva'
import { Menu, Icon, Row, Col, Avatar, Dropdown, message } from 'antd'
import { Link, routerRedux } from 'dva/router'
import { outUser } from '../../services/common'
import { HOST } from '../../utils/common'
import { clearUserInfo, changeLoginType } from '../../actions/example'
import cx from 'classnames'
import l from './Header.less'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nav: [
        {name: '首页', path: '/main/hot'},
        {name: '作品', path: '/main/view'},
        {name: '商城', path: '/shop'},
        {name: '关于我们', path: '/us'}
      ],
      active: -1
    }
  }
  componentDidMount () {
    const { location: {pathname} } = this.props
    let num = -1
    if (pathname.indexOf('main/hot') !== -1) {
      num = 0
    } else if (pathname.indexOf('main/view') !== -1) {
      num = 1
    } else if (pathname.indexOf('shop') !== -1) {
      num = 2
    } else if (pathname.indexOf('us') !== -1) {
      num = 3
    }
    this.setState({
      active: num
    })
  }

  quiteSys = async() => {
    // 退出登录
    const { dispatch } = this.props
    try {
      const result = await outUser()
      if (result && !result.code) {
        dispatch(clearUserInfo())
        // Storage.clear()
        dispatch(routerRedux.replace('/login'))
      }
    } catch (err) {
      console.log(err)
    }
  }

  clickMore = ({key}) => {
    const { dispatch } = this.props
    if (key === '0') {
      dispatch(routerRedux.push('/center'))
    } else if (key === '1') {
      this.quiteSys()
    } else if (key === '2') {
      this.uploadLink()
    }
  }
  linkPath = (item) => {
    const { dispatch } = this.props
    // if (item.path === '/shop') {
    //    message.info('即将上线，敬请期待...');
    // }else{
    dispatch(routerRedux.push(item.path))
    // }
  }
  uploadLink = () => {
    const { example: {id}, dispatch } = this.props
    if (id) {
      dispatch(routerRedux.push('/upload'))
    } else {
      dispatch(routerRedux.push('/login'))
    }
  }


  log = (type) => {
    const { dispatch } = this.props
    dispatch(changeLoginType(type))
    // dispatch(routerRedux.push('/login'))
  }
  render () {
    const { location, example } = this.props
    const { nav, active } = this.state
    const menu = (
      <Menu onClick={this.clickMore} style={{width: 110}}>
        {
          example && example.nickname &&
          <Menu.Item key='-1'>
            <a>{example.nickname}</a>
          </Menu.Item>
        }
        {
          example && example.nickname && <Menu.Divider />
        }
        <Menu.Item key='2'>
          <a>上传作品</a>
        </Menu.Item>
        <Menu.Item key='3'>
          <Link to={`/person/${example.id}`}>我的作品</Link>
        </Menu.Item>
        <Menu.Item key='4'>
          <Link to={`/person/${example.id}?type=like`}>喜欢作品</Link>
        </Menu.Item>
        <Menu.Item key='0'>
          <a>个人中心</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='1'>
          <a>退出登录</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={cx(l.headerBox)}>
        <div className={cx(l.newH, 'main_container')}>
          <Link to="/">
            <img className={cx(l.logos)} src='/img/50.png' alt='也造LOGO' />
          </Link>
          <span style={{color: '#000'}}>&nbsp; —— 造生活，也造梦想</span>
          <div className={cx(l.nav)}>
            {
              nav.map((item, index) => {
                return <a href={`#${item.path}`}  className={cx(l.menuItems, l[ active === index ? 'active' : null])} title={`也造${item.name}`} key={index}>{item.name}</a>
              })
            }
          </div>
          <div className={l.avartBox}>
            <a onClick={this.uploadLink} className={cx('myself-icon', l.ups)}>&#xe61e;</a>
            {
              example.id
              ? <div className={cx(l.secDiv)}>
                <Dropdown overlay={menu} trigger={['hover']}>
                  <Avatar src={example.avatar ? `${HOST}${example.avatar}` : '/img/touxiang.png'} style={{ backgroundColor: '#87d068', cursor: 'pointer' }} />
                </Dropdown>
              </div>
              : <div className={cx(l.spans)}>
                <a href="#/login" onClick={this.log.bind(null, 'eq')}>登录</a>
                <span className='ant-divider' style={{backgroundColor: '#000'}} />
                <a href="#/login" onClick={this.log.bind(null, 'register')}>注册</a>
              </div>
            }
          </div>
        </div>
      </div>

    )
  }
}

const mapState = state => {
  const { example } = state
  return {
    example
  }
}
export default connect(mapState)(Header)
