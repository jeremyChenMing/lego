import React from 'react';
import { connect } from 'dva'
import cx from 'classnames'
import l from './Center.less'
import UploadFile from '../components/MainLayout/UploadFile'
import MainLayout from '../components/MainLayout/MainLayout'
import { getProfile, uploaderFile, patchProfile } from '../services/common'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { deepClone, dataURLtoFile, dataURLtoBlob, blobToDataURL, timeBase, HOST } from '../utils/common'

import { Input, Radio, Button, Modal, notification } from 'antd'
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const SEX = {
  "M": "男",
  "F": "女",
}

class Center extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      cover: false,
      confirmLoading: false,
      info: {},
      urlData: null,
      headData: null,
      file: null,
    }
  }
  getInformation = async() => {
    try{
      const result = await getProfile();
      if (result && !result.code) {
        this.setState({
          info: result,
          headData: result.avatar
        })
      }else{
        Modal.confirm({
          title: '登录失效',
          content: '登录凭证过期, 请重新登录！',
          okText: '确认',
          cancelText: '取消',
          onOk: () => { document.location.href = '#/login'},
          onCancel: () => {document.location.href = '#/'}
        });
      }
    }catch(err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getInformation();
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
        file,
      }, () => {
        this.cropper = new Cropper(this.img, {
          viewMode: 1,
          autoCrop: true,
          aspectRatio: 1 / 1,
          preview: ".small",
          autoCropArea: 0.75,
        })
      })
    }
  }
  cancelCover = () => {
    this.setState({
      cover: false
    }, () => {
      if (this.cropper) {
        this.cropper.destroy();
      }
    })
  }


  okCover = () => {
    const { file } = this.state;
    if (this.cropper) {
      this.setState({
        confirmLoading: true
      })
      // 另外一种方法
      const dataUrls = this.cropper.getCroppedCanvas({fillColor: '#fff'}).toDataURL(file.type);
      this.callback(dataURLtoFile(dataUrls, `head${timeBase()}.png`) ,dataUrls)
    }
  }
  callback = (blob, result) => {
    const { dispatch } = this.props;
    uploaderFile({name: 'headPng.png', file: blob}).then( data => {
      if (data && !data.code) {
        this.state.info.avatar = data.url
        patchProfile({avatar: `${data.url}`}).then( data => {
          if (data && !data.code) {
            this.setState({
              cover: false,
              headData: result
            })
            dispatch({type: 'example/setsMes'})
            dispatch({type: 'example/allAthors'})
          }else{

          }
        }).catch(err => {
          console.log(err)
        })
        
      }else{
        notification.error({
          message: `上传失败,${data.msg}`
        })
      }
    }).catch(err => {
      console.log(err)
    })
    
  }





  changeValue = (type, e) => {
    const copyData = deepClone(this.state.info)
    const value = e.target.value;
    copyData[type] = value
    this.setState({
      info: copyData
    })
  }
  save = () => {
    const { dispatch } = this.props;
    const { info } = this.state;
    console.log(info)
    patchProfile({...info, avatar: `${HOST}${info.avatar}`}).then( data => {
      if (data && !data.code) {
        this.setState({
          show: true
        }, this.getInformation)
        dispatch({type: 'example/setsMes'})
        dispatch({type: 'example/allAthors'})
        notification.success({
          message: `保存成功`
        })
      }else{
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
      show: true
    })
  }
  render() {
    const { location } = this.props;
    const { show, info, cover, urlData, headData, confirmLoading } = this.state;
    const renderHead = (data) => {
      return data ? {backgroundImage: `url(${HOST}${data})`} : {backgroundImage: "url('/img/touxiang.png')"}
    }
    return (
      <MainLayout location={location}>
        <Modal
          title="请选择合适的区域作为头像"
          visible={cover}
          onCancel={this.cancelCover}
          onOk={this.okCover}
          width={600}
          maskClosable={false}
          closable={false}
          confirmLoading={confirmLoading}
        >
          <div className={cx(l.cropperBox)}>
            {urlData && <img src={urlData} ref={(img) => this.img = img} alt=""/>} 
          </div>
        </Modal>
        <div className={cx(l.centerBox, 'main_container')}>
          <div className={cx(l.head)} style={renderHead(headData)}>
            <div className={cx(l.btns)}>
              <UploadFile loadFile={this.loadFile} ajaxBool={false} spin={false} upStyle={{display: 'inline-block', width: '100%'}}>
                <div className={cx(l.tt)}>上传头像</div>
              </UploadFile>
            </div>
          </div>
          <div className={cx(l.headTxt)}>头像</div>
          <div className={cx(l.tableBox)}>
            <div className={cx(l.editBtn)}>
              <Button onClick={this.edit} type="primary" icon="edit"></Button>
            </div>
            <div className={l.px}>
              昵称：
              {
                show ? `${info.nickname ? info.nickname : ''}` 
                : <Input onChange={this.changeValue.bind(null, 'nickname')} value={info.nickname ? info.nickname : undefined} placeholder="请输入" style={{width: '80%'}} />
              }
            </div>
            <div className={l.px}>
                性别：
                {
                  show ? `${info.gender ? SEX[info.gender] : ""}`
                  : <RadioGroup onChange={this.changeValue.bind(null, 'gender')}  value={info.gender ? info.gender : undefined} >
                    <Radio value="M">男</Radio>
                    <Radio value="F">女</Radio>
                  </RadioGroup>
                }
            </div>
            <div className={l.px}>
              <span>简介：</span>
              {
                show ? `${info.intro ? info.intro : ''}`
                : <TextArea onChange={this.changeValue.bind(null, 'intro')} value={info.intro ? info.intro : undefined} rows={4} style={{width: '80%', resize: 'none'}}/>
              }
            </div>
            <div className={cx(l.btnBox)}>
              { !show && <Button onClick={this.cancel} style={{marginRight: '15px'}}>取消</Button>}
              { !show && <Button onClick={this.save} type="primary">保存</Button>}
            </div>
            
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default connect()(Center)
