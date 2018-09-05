import React from 'react'
import cx from 'classnames'
import l from './Login.less'
import { connect } from 'dva'
import InputField from '../components/MainLayout/InputField'
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import { registerUser, loginUser, getUserToken, getProfile } from '../services/common'
import { getSearchObj } from '../utils/common'
import { saveUserInfo } from '../actions/example'
import { routerRedux } from 'dva/router'

const FormItem = Form.Item
const required = (value) => {
  return typeof (value) === 'number' || value ? undefined : '此项是必填项'
}

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      countTime: 60,
      runCount: false,
      checked: true,
      show: 'login',
      submitting: false,
      eye: false
    }
  }
  componentDidMount () {
    const { location } = this.props
    const query = getSearchObj(location)
    if (query.type) {
      this.setState({
        show: query.type
      })
    }
    console.log(this.props.location)

  }
  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  handlNav = (index) => {
    const { dispatch, reset, change } = this.props
    // reset('password');
    // dispatch(reset('password'))
    // dispatch(change('code', ''))
    this.setState({
      active: index
    })
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props
    const { active } = this.state; // 0 密码登录  1 短信登录

    console.log(values)
    this.setState({submitting: true})
    return new Promise((resolve, reject) => {
      loginUser(values).then(result => {
        if (result && !result.code) {
          getUserToken(values).then(token => {
            this.setState({submitting: false})
            if (token && !token.code) {
              // dispatch({type: 'example/setsMes', payload: {callback: this.back}})
              // dispatch(routerRedux.replace('/main/hot'))
              dispatch(saveUserInfo(token))
              getProfile().then(data => {
                if (data && !data.code) {
                  dispatch(routerRedux.replace('/main/hot'))
                  dispatch({type: 'example/sets', payload: {...data}})
                } else {
                  reject(new SubmissionError({_error: '错误信息', password: data.message}))
                }
              })
            } else {
              reject(new SubmissionError({_error: '错误信息', password: token.message}))
            }
          })
          // document.cookie = `id=Bearer`
          // setTimeout(function () {
          //   dispatch({type: 'example/checkLogin'})
          // }, 0)
          // dispatch(routerRedux.replace('/main/hot'))
        } else {
          this.setState({submitting: false})
          reject(new SubmissionError({_error: '错误信息', password: result.message}))
        }
      })
    })
  }

  count = () => {
    this.setState({
      runCount: true
    }, () => {
      this.timer = setInterval(this.sets, 1000)
    })
  }
  sets = () => {
    const { countTime, runCount } = this.state
    if (runCount && countTime > 0) {
      this.setState({
        countTime: this.state.countTime - 1
      })
    } else {
      this.setState({
        runCount: false,
        countTime: 60
      })
      clearInterval(this.timer)
    }
  }
  renderInput = (active) => {
    const { runCount, countTime, checked } = this.state
    const { handleSubmit } = this.props
    if (active) {
      return <div className={cx(l.code)}>
        <InputField inputStyle={{width: '100%', height: '42px', lineHeight: '42px'}}// onKeyUp={this.handleSubmit}
          placeholder='验证码'
          name='code'
          validate={[required]} />
        <a onClick={this.count} disabled={runCount}>
          获取验证码
          {runCount ? `(${countTime}s)` : null}
        </a>
      </div>
    } else {
      return <InputField inputStyle={{width: '100%', height: '42px', lineHeight: '42px'}}// onKeyUp={this.handleSubmit}
        placeholder='密码'
        name='password'
        type='password'
        onPressEnter={handleSubmit(this.handleSubmit.bind(this))}
        validate={[required]} />
    }
  }
  renderRig = () => {
    const { eye } = this.state
    return <div className={cx(l.code)}>
      <InputField inputStyle={{width: '100%', height: '42px', lineHeight: '42px'}}// onKeyUp={this.handleSubmit}
        placeholder='密码'
        name='password'
        type={eye ? 'text' : 'password'}
        validate={[required]} />
      <Icon onClick={this.showEye.bind(null, eye)} className={cx(l.iicon, l[eye ? 'the' : null])} type='eye-o' />
    </div>
  }
  showEye = (bool) => {
    this.setState({
      eye: !bool
    })
  }

  changeCheck = (e) => {
    this.setState({
      checked: e.target.checked
    })
  }
  changeTab = (type) => {
    this.setState({
      show: type
    })
  }

  linkIndex = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/main/hot'))
  }

  linkRegister = () => {
    this.setState({
      show: 'register'
    })
  }
  register = (values) => {
    const { dispatch } = this.props
    console.log(values)
    values.login = true
    this.setState({submitting: true})
    return new Promise((resolve, reject) => {
      registerUser(values).then(token => {
        this.setState({submitting: false})
        if (token && !token.code) {
          dispatch(saveUserInfo(token))
          getProfile().then(data => {
            if (data && !data.code) {
              dispatch(routerRedux.replace('/main/hot'))
              dispatch({type: 'example/sets', payload: {...data}})
            } else {
              reject(new SubmissionError({_error: '错误信息', password: data.message}))
            }
          })
        } else {
          reject(new SubmissionError({_error: '错误信息', password: token.message}))
        }
      })
    })
  }
  render () {
    const { handleSubmit } = this.props
    const { active, checked, show, submitting } = this.state
    return (
      <div className={cx(l.loginBox)}>
        <img onClick={this.linkIndex} src='/img/W80.1.png' alt='logo' className={cx(l.lo)} />
        <p>登陆筑乐与10万+积木爱好者一起交流设计 分享快乐吧！</p>
        {
          show === 'login'
          ? <div className={cx(l.login)}>
            {/**/}<div className={cx(l.qrBox)} onClick={this.changeTab.bind(null, 'qr')}>
              <span className={cx(l.icons, 'myself-icon')}>&#xe615;</span>
            </div> 
            <div className={cx(l.nav)} style={{display: 'none'}}>
              {
                ['密码登录'].map((item, index) => {
                  return (
                    <span onClick={this.handlNav.bind(null, index)} className={cx(l.menuItems, l[ active === index ? 'active' : null])} key={index}>{item}</span>
                  )
                })
              }
            </div>
            <div className={cx(l.titles)}>账号登录</div>
            {/* 密码登录和短信登录 */}
            
            <div>
              <div className={cx(l.login_form)}>
                <InputField
                  name='username'
                  placeholder='用户名'
                  inputStyle={{width: '100%', height: '42px', lineHeight: '42px'}}
                  validate={[required]}
                  size='large'
                  onPressEnter={handleSubmit(this.handleSubmit.bind(this))}
                />
                {this.renderInput(active)}
                <Button
                  type='primary'
                  loading={submitting}
                  disabled={submitting}
                  style={{width: '100%', color: '#000', height: '42px', lineHeight: '42px', marginBottom: '10px'}}
                  size='large'
                  onClick={handleSubmit(this.handleSubmit.bind(this))}>登录</Button>
              </div>
              <Row>
                <Col span={12} style={{textAlign: 'left'}}>
                  {/* <Checkbox onChange={this.changeCheck} checked={checked}> <span style={{color: '#282828'}}>下次自动登录</span></Checkbox> */}
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                  {/* <a>忘记密码</a> | */}<a onClick={this.linkRegister}>注册</a>
                </Col>
              </Row>
            </div>
            
          </div>
          : show === 'register'
            ? <div className={cx(l.login)}>
              <div className={cx(l.pcBox)} onClick={this.changeTab.bind(null, 'login')}>
                <Icon type='rollback' className={cx(l.icons)} />
              </div>
              <div className={cx(l.login_form)}>
                <InputField
                  name='username'
                  placeholder='用户名'
                  inputStyle={{width: '100%', height: '42px', lineHeight: '42px'}}
                  validate={[required]}
                  size='large'
                  // onPressEnter={handleSubmit(this.handleSubmit.bind(this))}
                />
                {this.renderRig()}
                <Button
                  type='primary'
                  loading={submitting}
                  disabled={submitting}
                  style={{width: '100%', color: '#000', height: '42px', lineHeight: '42px', marginBottom: '10px'}}
                  size='large'
                  onClick={handleSubmit(this.register)}>注册</Button>
              </div>
            </div>
          : <div className={cx(l.login)}>
            <div className={cx(l.pcBox)} onClick={this.changeTab.bind(null, 'login')}>
              {/*<Icon type='rollback' className={cx(l.icons)} />*/}
              <span className={cx(l.icons, 'myself-icon')}>&#xe614;</span>
            </div>

            <QR />
          </div>
        }
      </div>
    )
  }
}
class QR extends React.Component {
  constructor (props) {
    super(props)
  }
  
  componentDidMount () {
    const host = document.location.origin
    // 也造

    // const str = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx3f3312ce0a356c1a&redirect_uri=https%3a%2f%2fapi.bricks.com%2fapi%2fv1%2fwechat%2fcallback%3fnext%3dhttps%3a%2f%2fbricks.upvi.com%2fapi%2fv1%2fauth%2fwechat_login&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
    const name = `https://api.51bricks.com/api/v1/wechat/callback?next=${host}/api/v1/auth/wechat_login`
    this.obj = new WxLogin({
      self_redirect: false,
      id: 'login_container',
      appid: 'wx3f3312ce0a356c1a',
      scope: 'snsapi_login',
      // redirect_uri: 'https%3a%2f%2fapi.51bricks.com%2fapi%2fv1%2fwechat%2fcallback%3fnext%3dhttps%3a%2f%2fbricks.upvi.com%2fapi%2fv1%2fauth%2fwechat_login', // http%3a%2f%2fbricks.upvi.com%2f%23%2fmain%2fhot
      redirect_uri: encodeURI(name),
      state: 'STATE',
      style: '',
      href: ''
    })
  }
  // 扫描完也造后返回的url如下
  // state 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），
  // 建议第三方带上该参数，可设置为简单的随机数加session进行校验
  render () {
    return (
      <div id='login_container' />
    )
  }
}

Login = reduxForm({ // eslint-disable-line
  form: 'login'
})(Login)

const selector = formValueSelector('login')
export default connect(state => {
  const name = selector(state, 'username')
  return {name}
})(Login)
