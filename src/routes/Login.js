import React from 'react';
import cx from 'classnames'
import l from './Login.less'
import { connect } from 'dva'
import InputField from '../components/MainLayout/InputField'
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { registerUser, loginUser, getUserToken } from '../services/common'
import { saveUserInfo } from '../actions/example'
import { routerRedux } from 'dva/router'

const FormItem = Form.Item;
const required = (value) => {
  return typeof (value) === 'number' || value ? undefined : '此项是必填项'
}



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      countTime: 60,
      runCount: false,
      checked: true,
      show: 'login',
      submitting: false,
    }
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    } 
  }
  handlNav = (index) => {
    const { dispatch, reset, change } = this.props;
    // reset('password');
    // dispatch(reset('password'))
    // dispatch(change('code', ''))
    this.setState({
      active: index
    })
  }
  handleSubmit = (values) => {
    const { dispatch } = this.props;
    console.log(values)
    this.setState({submitting: true})
    return new Promise( (resolve, reject) => {
      loginUser(values).then( result => {
        if (result && !result.code) {
          getUserToken(values).then( token => {
            this.setState({submitting: false})
            if (token && !token.code) {
              dispatch(saveUserInfo({...token, ...values}))
              dispatch(routerRedux.replace('/main/hot'))
            }else{
              reject(new SubmissionError({_error: '123123', password: result.message}))
            }
          })
        }else{
          this.setState({submitting: false})
          reject(new SubmissionError({_error: '123123', password: result.message}))
        }
      }) 
    })
  }

  count = () => {
    this.setState({
      runCount: true
    },() => {
      this.timer = setInterval(this.sets, 1000)
    })
  }
  sets = () => {
    const { countTime, runCount } = this.state;
    if (runCount &&  countTime > 0) {
      this.setState({
        countTime: this.state.countTime - 1
      })
    }else{
      this.setState({
        runCount: false,
        countTime: 60
      })
      clearInterval(this.timer)
    }
    
  }
  renderInput = (active) => {
    const { runCount, countTime, checked } = this.state;
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
    }else{
      return  <InputField inputStyle={{width: '100%', height: '42px', lineHeight: '42px'}}// onKeyUp={this.handleSubmit}
                placeholder='密码'
                name='password'
                type='password'
                validate={[required]} />
    }
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








  register = async() => {
    try{
      const result = await registerUser({username: 'jeremy', password: 123456});
      console.log(result, '******')
      if (result && !result.code) {

      }else{

      }
    }catch(err) {
      console.log(err)
    }
  }
  render() {
    const { handleSubmit } = this.props;
    const { active, checked, show, submitting } = this.state;
    console.log(this.props)
    return (
      <div className={cx(l.loginBox)}>
        <span className={cx(l.logo)}>筑乐</span>
        <p>登陆筑乐与10万+积木爱好者一起交流设计 分享快乐吧！</p>
        {
          show === 'login' ?
          <div className={cx(l.login)}>
            <div className={cx(l.qrBox)} onClick={this.changeTab.bind(null, 'qr')}></div>
            <div className={cx(l.nav)}>
              {
                ['密码登录','短信登录'].map( (item,index) => {
                  return(
                    <span onClick={this.handlNav.bind(null, index)} className={cx(l.menuItems, l[ active === index ? 'active' : null])} key={index}>{item}</span>
                  )
                })
              }
            </div>
            {/*密码登录和短信登录*/}
            <div>
              <div className={cx(l.login_form)}>
                <InputField
                  name='username'
                  placeholder='用户名'
                  inputStyle={{width: '100%', height: '42px', lineHeight: '42px'}}
                  validate={[required]}
                  size='large'
                  // onPressEnter={handleSubmit(this.handleSubmit.bind(this))} 
                />
                {this.renderInput(active)}
                <Button
                  type='primary'
                  loading={submitting}
                  disabled={submitting}
                  style={{width: '100%', color: '#000', height: '42px', lineHeight: '42px', marginBottom: '10px'}}
                  size="large"
                  onClick={handleSubmit(this.handleSubmit.bind(this))}>登录</Button>
              </div>
              <Row>
                <Col span={12} style={{textAlign: 'left'}}>
                  <Checkbox onChange={this.changeCheck} checked={checked}>下次自动登录</Checkbox>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                  <a>忘记密码</a> | <a onClick={this.register}>注册</a>
                </Col>
              </Row>

              <h3>第三方账号登录</h3>
              <div className={cx(l.log)}>
                <span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span></span>
              </div>
            </div>
          </div>
          :
          <div className={cx(l.login)}>
            <div className={cx(l.pcBox)} onClick={this.changeTab.bind(null, 'login')}></div>
            <h2>微信二维码登录</h2>
            <div className={cx(l.qr)}>
              <div className={cx(l.qrImg)}></div>
              <p>请使用微信扫描二维码登陆“筑乐”</p>
            </div>
            <div className={cx(l.txt)}>
              <a>密码登录</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a>注册新的账号</a>
            </div>
          </div>
        }
      </div>
    );
  }
}

Login = reduxForm({ // eslint-disable-line
  form: 'login'
})(Login)

const selector = formValueSelector('login')
export default connect(state => {
  const name = selector(state, 'name')
  return {name}
})(Login)










