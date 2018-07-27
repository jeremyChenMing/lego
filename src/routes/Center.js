import React from 'react';
import cx from 'classnames'
import l from './Center.less'
import UploadFile from '../components/MainLayout/UploadFile'
import MainLayout from '../components/MainLayout/MainLayout'
import { getProfile, uploaderFile, patchProfile } from '../services/common'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { deepClone } from '../utils/common'

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
      info: {},
      urlData: null,
      headData: null,
      file: null,
    }
  }
  getInformation = async() => {
    try{
      const result = await getProfile();
      console.log(result, 'getInformation')
      if (result && !result.code) {
        this.setState({
          info: result,
          headData: result.avatar
        })
      }else{

      }
    }catch(err) {
      console.log(err)
    }
  }
  componentDidMount() {
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


  dataURLtoBlob = (dataurl) => {  
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  blobToDataURL = (blob, callback) => {
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
  }
  okCover = () => {
    const { file } = this.state;
    if (this.cropper) {
      // const urls = this.cropper.getCroppedCanvas({fillColor: '#fff'});
      // console.log(urls)
      // urls.toBlob( (blob) => {
      //   this.blobToDataURL(blob, this.callback.bind(null, blob))
      // }) 

      // 另外一种方法
      const dataUrls = this.cropper.getCroppedCanvas({fillColor: '#fff'}).toDataURL(file.type);
      this.callback(this.dataURLtoBlob(dataUrls) ,dataUrls)
    }
  }
  callback = (blob, result) => {
    uploaderFile({name: 'headPng', file: blob}).then( data => {
      if (data && !data.code) {
        console.log(data)
        this.state.info.avatar = data.url
        this.setState({
          cover: false,
          headData: result
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
    const { info } = this.state;
    console.log(info)
    patchProfile({...info}).then( data => {
      if (data && !data.code) {
        this.setState({
          show: true
        }, this.getInformation)
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
  render() {
    const { location } = this.props;
    const { show, info, cover, urlData, headData } = this.state;
    const renderHead = (data) => {
      return data ? {backgroundImage: `url(${data})`} : {}
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
          <div className={cx(l.tableBox)}>
            <div>
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
                : <TextArea onChange={this.changeValue.bind(null, 'intro')} value={info.intro ? info.intro : undefined} rows={4} style={{width: '80%'}}/>
              }
            </div>
            { !show && <Button onClick={this.save} type="primary">保存</Button>}
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default Center
