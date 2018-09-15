import React from 'react'
import { connect } from 'dva'
import cx from 'classnames'
import l from './Center.less'
import UploadFile from '../components/MainLayout/UploadFile'
import MainLayout from '../components/MainLayout/MainLayout'
import { getProfile, uploaderFile, patchProfile, changePassword, outUser } from '../services/common'
import { routerRedux } from 'dva/router'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { deepClone, dataURLtoFile, dataURLtoBlob, blobToDataURL, timeBase, HOST } from '../utils/common'
import { clearUserInfo } from '../actions/example'
import { Input, Radio, Button, Modal, notification, Menu, Card, Form } from 'antd'
const RadioGroup = Radio.Group
const { TextArea } = Input
const FormItem = Form.Item;

const SEX = {
  'M': '男',
  'F': '女'
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

class Center extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true,
      cover: false,
      confirmLoading: false,
      info: {},
      urlData: null,
      headData: null,
      file: null,
      values: {},
      selectedKeys: ['2']
    }
  }
  getInformation = async() => {
    try {
      const result = await getProfile()
      if (result && !result.code) {
        this.setState({
          info: result,
          values: result,
          headData: result.avatar
        })
      } else {
        Modal.confirm({
          title: '登录失效',
          content: '登录凭证过期, 请重新登录！',
          okText: '确认',
          cancelText: '取消',
          onOk: () => { document.location.href = '#/login' },
          onCancel: () => { document.location.href = '#/' }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount () {
    this.getInformation()
  }

  edit = () => {
    this.setState({
      show: false
    })
  }

  // 头像区域
  loadFile = (file, urlData) => {
    if (urlData) {
      this.setState({
        cover: true,
        urlData,
        file
      }, () => {
        this.cropper = new Cropper(this.img, {
          viewMode: 1,
          autoCrop: true,
          aspectRatio: 1 / 1,
          preview: '.small',
          autoCropArea: 0.75
        })
      })
    }
  }
  cancelCover = () => {
    this.setState({
      cover: false
    }, () => {
      if (this.cropper) {
        this.cropper.destroy()
      }
    })
  }

  okCover = () => {
    const { file } = this.state
    if (this.cropper) {
      this.setState({
        confirmLoading: true
      })
      // 另外一种方法
      const dataUrls = this.cropper.getCroppedCanvas({fillColor: '#fff'}).toDataURL(file.type)
      this.callback(dataURLtoFile(dataUrls, `head${timeBase()}.png`), dataUrls)
    }
  }
  callback = (blob, result) => {
    const { dispatch } = this.props
    uploaderFile({name: 'headPng.png', file: blob}).then(data => {
      if (data && !data.code) {
        this.state.info.avatar = data.url
        patchProfile({avatar: `${data.url}`}).then(data => {
          if (data && !data.code) {
            this.setState({
              cover: false
              // headData: result
            }, this.getInformation)
            dispatch({type: 'example/setsMes'})
            dispatch({type: 'example/allAthors'})
          } else {

          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        notification.error({
          message: `上传失败,${data.msg}`
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  changeValue = (type, e) => {
    const copyData = deepClone(this.state.values)
    const value = e.target.value
    copyData[type] = value
    this.setState({
      values: copyData
    })
  }
  save = () => {
    const { dispatch } = this.props
    const { info, values } = this.state
    console.log(values, 'values')
    patchProfile({...values, avatar: `${info.avatar}`}).then(data => {
      if (data && !data.code) {
        this.setState({
          show: true
        }, this.getInformation)
        dispatch({type: 'example/setsMes'})
        dispatch({type: 'example/allAthors'})
        notification.success({
          message: `保存成功`
        })
      } else {
        notification.success({
          message: `保存失败`
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  cancel = () => {
    this.setState({
      show: true,
      values: this.state.info
    })
  }

  upload = () => {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/upload'))
  }



  seleteMenu = (obj) => {
    console.log(obj)
    this.setState({
      selectedKeys: [obj.key]
    })
  }










  handleSubmit = (e) => {
    const that = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (values.again_password !== values.new_password) {
          console.log('buyiyang')
          this.props.form.setFields({
            again_password: {
              value: values.again,
              errors: [new Error('两次输入密码不一致')],
            }
          })
        }else{
          // console.log(values)
          changePassword({old_password: values.old_password, new_password: values.new_password}).then( data => {
            if (data && !data.code) {
              // notification.success({
              //   message: '修改密码成功！'
              // })
              Modal.confirm({
                title: '修改密码成功！',
                content: '是否立即重新登录！',
                okText: '确认',
                cancelText: '取消',
                onOk: that.quiteSys,
                onCancel: () => {}
              })
            }else{
              notification.error({
                message: data.message
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
        
      }
    });
  }
  confirm = () => {
    
  }
  quiteSys = async() => {
    // 走推出登录的一套逻辑
    // 退出登录
    const { dispatch } = this.props
    try {
      const result = await outUser()
      if (result && !result.code) {
        dispatch(clearUserInfo())
        // Storage.clear() `/login?type=register`
        dispatch(routerRedux.replace('/login?type=login'))
      }
    } catch (err) {
      console.log(err)
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const { location } = this.props
    const { show, info, cover, urlData, headData, confirmLoading, values, selectedKeys } = this.state
    const renderHead = (data) => {
      return data ? {backgroundImage: `url(${HOST}${data})`} : {backgroundImage: "url('/img/touxiang.png')"}
    }
    return (
      <MainLayout location={location}>
        <Modal
          title='请选择合适的区域作为头像'
          visible={cover}
          onCancel={this.cancelCover}
          onOk={this.okCover}
          width={600}
          maskClosable={false}
          closable={false}
          confirmLoading={confirmLoading}
        >
          <div className={cx(l.cropperBox)}>
            {urlData && <img src={urlData} ref={(img) => this.img = img} alt='也造头像' />}
          </div>
        </Modal>

        <div className={cx(l.centerBox, 'main_container')}>
          <div className={cx(l.lays)}>
            <div className={cx(l.myMes)}>
              <div className={cx(l.tops)}>
                <div className={cx(l.headBox)} style={renderHead(headData)} />
                <h3>{info.nickname ? info.nickname : ''}</h3>
                <Button onClick={this.upload} type='primary' style={{color: 'rgba(0,0,0,.65)'}}>上传作品</Button>
              </div>
              <div className={cx(l.bottoms, 'btms')}>
                <Menu selectedKeys={selectedKeys} onClick={this.seleteMenu}>
                  <Menu.Item key='0'>
                    <a href={`#/person/${info.id}`}>我的作品</a>
                  </Menu.Item>
                  <Menu.Item key='1'>
                    <a href={`#/person/${info.id}?type=like`}>喜欢作品</a>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key='2'>
                    <a>个人资料</a>
                  </Menu.Item>
                  <Menu.Item key='3'>
                    <a>修改密码</a>
                  </Menu.Item>
                </Menu>
              </div>
            </div>
            <div className={cx(l.laycon)}>
              { 
                selectedKeys[0] === '2' && <Card title='个人资料' bordered={false}>
                <div className={cx(l.head)} style={renderHead(headData)}>
                  <div className={cx(l.btns)}>
                    <UploadFile loadFile={this.loadFile} ajaxBool={false} spin={false} upStyle={{display: 'inline-block', width: '100%'}}>
                      <div className={cx(l.tt)}>上传头像</div>
                    </UploadFile>
                  </div>
                </div>
                <div className={cx(l.headTxt)}>{info.nickname ? info.nickname : ''}</div>
                <div className={cx(l.tableBox)}>
                  <div className={cx(l.editBtn)}>
                    <Button onClick={this.edit} type='primary' icon='edit' />
                  </div>
                  <div className={l.px}>
                    昵称：
                    {
                      show ? `${values.nickname ? values.nickname : ''}`
                      : <Input onChange={this.changeValue.bind(null, 'nickname')} value={values.nickname ? values.nickname : undefined} placeholder='请输入' style={{width: '80%'}} />
                    }
                  </div>
                  <div className={l.px}>
                      性别：
                      {
                        show ? `${values.gender ? SEX[values.gender] : ''}`
                        : <RadioGroup onChange={this.changeValue.bind(null, 'gender')} value={values.gender ? values.gender : undefined} >
                          <Radio value='M'>男</Radio>
                          <Radio value='F'>女</Radio>
                        </RadioGroup>
                      }
                  </div>
                  <div className={l.px}>
                    手机：
                    {
                      show ? `${values.mobile ? values.mobile : ''}`
                      : <Input disabled onChange={this.changeValue.bind(null, 'mobile')} value={values.mobile ? values.mobile : undefined} placeholder='请输入' style={{width: '80%'}} />
                    }
                  </div>
                  <div className={l.px}>
                    <span>简介：</span>
                    {
                      show ? `${values.intro ? values.intro : ''}`
                      : <TextArea onChange={this.changeValue.bind(null, 'intro')} value={values.intro ? values.intro : undefined} rows={4} style={{width: '80%', resize: 'none'}} />
                    }
                  </div>
                  <div className={cx(l.btnBox)}>
                    { !show && <Button onClick={this.cancel} style={{marginRight: '15px'}}>取消</Button>}
                    { !show && <Button onClick={this.save} type='primary'>保存</Button>}
                  </div>
                </div>
                </Card>
              }
              {
                selectedKeys[0] === '3' && <Card title="修改密码" bordered={false}>
                  <div className={cx(l.editPassword)}>
                    <Form onSubmit={this.handleSubmit}>
                      <FormItem {...formItemLayout} label="旧密码" >
                        {getFieldDecorator('old_password', {
                          rules: [{
                            required: true, message: '此项必填项！',
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="新密码">
                        {getFieldDecorator('new_password', {
                          rules: [{
                            required: true, message: '此项必填项！',
                          }],
                        })(
                          <Input type="password" />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="再次输入新密码">
                        {getFieldDecorator('again_password', {
                          rules: [{
                            required: true, message: '此项必填项！',
                          }],
                        })(
                          <Input type="password" />
                        )}
                      </FormItem>
                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>
                      </FormItem>
                    </Form>
                  </div>
                </Card>
              }
            </div>
          </div>

        </div>
      </MainLayout>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create()(Center)

export default connect()(WrappedHorizontalLoginForm)
