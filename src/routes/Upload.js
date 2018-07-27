import React from 'react';
import { connect } from 'dva'
import cx from 'classnames';
import l from './Upload.less'
import MainLayout from '../components/MainLayout/MainLayout'
import UploadFile from '../components/MainLayout/UploadFile'
import { Card, Button, Input, Row, Col, Icon, Modal, notification, Spin, Avatar, Tooltip } from 'antd'
import { deepClone } from '../utils/common'
import { uploaderFile, creatProduce, uploaderFilePost } from '../services/common'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const ButtonGroup = Button.Group;
const { TextArea } = Input;

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      visible: false,
      spinning: false,
      cover: false,
      mark: {},
      covers: {},
      title: undefined, 
      description: undefined, 
      udbool: true,
      lrbool: true,
      coverUrlData: null
    }
  }


  renderTitle = (str, size) => {
    return <h3 className={cx(l.tle)}>{str} <span>{size}</span></h3>
  }

  loadFile = (file, urlData, data) => {
    let copyData = deepClone(this.state.imgs);
    if (copyData.length > 5) {
      notification.info({
        message: `最多只能上传6张图片！`
      })
    }else{
      copyData.push({...data, urlData, caption: ''})
      this.setState({
        imgs: copyData
      }) 
    }
    
  }
  addRemark = (item, index) => {
    this.setState({
      visible: true,
      mark: {...item, keys: index}
    })
  }
  delImg = (item, index) => {
    let copyData = deepClone(this.state.imgs);
    copyData.splice(index,1);
    this.setState({
      imgs: copyData
    })
  }
  changeMark = (e) => {
    const value = e.target.value;
    let copyData = deepClone(this.state.mark);
    copyData.value = value
    this.setState({
      mark: copyData
    })
  }
  addOk = () => {
    const { mark } = this.state;
    console.log(mark)
    let copyData = deepClone(this.state.imgs);
    copyData[mark.keys].caption = mark.value;
    this.setState({
      visible: false,
      imgs: copyData
    })
  }
  addCancel = () => {
    this.setState({
      visible: false,
      mark: {}
    })
  }











  






  changeName = (type, e) => {
    const value = e.target.value
    const num = type === 'title' ? 20 : 200;
    if (value.length > num) {
      notification.info({
        message: `文字超出范围！`
      })
    }else{
      this.setState({
        [type]: value
      }) 
    }
  }
  save = async() => {
    const { imgs, title, description, covers } = this.state;
    console.log(imgs)
    console.log(covers)
    if (!title) {
      notification.info({
        message: `请填写标题！`
      })
      return
    }else if (!imgs.length) {
      notification.info({
        message: `请至少上传一张作品图！`
      })
      return 
    }else if (!covers.id) {
      notification.info({
        message: `请上传作品封面`
      })
      return
    }
    let arrs = [covers].concat(imgs);
    const para = {
      title, 
      description,
      images: arrs
    }
    console.log(para, 'para')
    try{
      const result = await creatProduce(para)
      if (result && !result.code) {
        notification.success({
          message: `添加成功！`
        })
      }else{
        notification.error({
          message: `添加失败，原因：${result.msg}`
        })
      }
    }catch(err) {
      console.log(err)
    }
  }




  setCropper = () => {
    this.cropper = new Cropper(this.img, {
      viewMode: 1,
      autoCrop: true,
      aspectRatio: 4 / 3,
      preview: ".small",
      autoCropArea: 0.75,
    })
  }
  loadCover = (file, urlData, data) => {
    if (this.cropper) {
      this.cropper.destroy();
    }
    this.setState({
      covers: {...data, name: file.name, urlData, file},
    },() => {
      this.setCropper()
    })
  }
  start = () => {
    this.setState({spinning: true})
  }
  end = () => {
    this.setState({spinning: false})
  }
  showCover = () => {
    this.setState({
      cover: true
    })
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
  okCover = () => { // ---------- ------------  ----------- ------------
    const { covers } = this.state;
    if (this.cropper) {
      // const urls = this.cropper.getCroppedCanvas({fillColor: '#fff'});
      // console.log(urls)
      // urls.toBlob( (blob) => {
      //   this.blobToDataURL(blob, this.callback.bind(null, blob))
      // })


      // 另外一种方法
      console.log(covers.file.type)
      const dataUrls = this.cropper.getCroppedCanvas({fillColor: '#fff'}).toDataURL(covers.file.type)
      this.callback(this.dataURLtoBlob(dataUrls) ,dataUrls)
    }else{
      notification.info({
        message: `请先上传图片！`
      })
    }
    
  }
  callback = (blob, result) => {
    uploaderFile({name: 'coverPng', file: blob}).then( data => {
      if (data && !data.code) {
        console.log(data)
        console.log(this.state.covers)
        this.setState({
          covers: {...this.state.covers, ...data},
          cover: false,
          coverUrlData: result
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

  handleRotate = (type) => {
    console.log(type)
    this.cropper.rotate(type === 'left' ? -45 : 45)
  }
  handlePosition = (bool, type) => {
    console.log(type)
    if (type === 'ud') {
      this.cropper.scaleY(bool ? -1 : 1);
      this.setState({
        udbool: !bool
      })
    }else{
      this.cropper.scaleX(bool ? -1 : 1);
      this.setState({
        lrbool: !bool
      })
    }
  }
  handleZoom = (type) => {
    if (type === 'plus') {
      this.cropper.zoom(0.1)
    }else{
      this.cropper.zoom(-0.1)
    }
  }



  render() {
    const { location } = this.props;
    const { imgs, visible, covers, spinning, title, description, cover, udbool, lrbool, coverUrlData } = this.state;
    return (
      <MainLayout location={location}>
        <div className={cx('main_container')}>
          <h1 className={cx(l.title)}>上传作品</h1>
          <Card title={this.renderTitle("作品信息")}  bordered={false} style={{marginBottom: '20px'}}>
            <Row className={cx(l.rows)}>
              <Col span={1}  className={cx(l.label)}>*</Col>
              <Col span={23}  className={cx(l.con)}>
                <Input value={title} size="large" placeholder="请输入作品名称" onChange={this.changeName.bind(null, 'title')} />
                <span className={cx(l.num)}>{title ? title.length : 0}/20</span>
              </Col>
            </Row>
            <Row className={cx(l.rows)}>
              <Col span={1}  className={cx(l.label)}></Col>
              <Col span={23}  className={cx(l.con)}>
                <TextArea value={description} onChange={this.changeName.bind(null, 'description')}  size="large" placeholder="请输入作品说明" rows={4} style={{resize: 'none'}} />
                <span className={cx(l.num)}>{description ? description.length : 0}/200</span>
              </Col>
            </Row>
          </Card>

          <Card title={this.renderTitle("上传作品", "注：不要在图片上放置广告信息，图片暂定不超过6张")} bordered={false} style={{marginBottom: '20px'}}>
            <Row className={cx(l.rows)}>
              <Col span={1}  className={cx(l.label)}>*</Col>
              <Col span={23} >
                <Row gutter={16} className={cx(l.list)} style={{marginLeft: 0, marginRight: 0}}>
                  <Col span={6} style={{marginBottom: '10px'}}>
                    <UploadFile loadFile={this.loadFile}>
                      <div className={cx(l.cell, l.ups)}>
                        <Icon className={cx(l.icons)} type="plus-circle" />  
                        <h3>点击添加照片</h3> 
                        <p>支持jpg/gif/png格式</p> 
                        <p>RGB模式，不超过1M</p> 
                      </div>
                    </UploadFile>
                  </Col>
                  {
                    imgs.map( (item,index) => {
                      return <Col span={6}  key={index} style={{marginBottom: '10px'}}>
                          <div className={cx(l.cell)} style={{backgroundImage: `url(${item.urlData})`}}>
                            <Icon onClick={this.delImg.bind(null, item, index)} className={cx(l.close)} type="close-circle" />
                            <div onClick={this.addRemark.bind(null, item, index)} className={cx(l.remark)} title={item.caption ? item.caption : '添加注释'}>
                              {
                                item.caption ? item.caption : '添加注释'
                              }
                            </div>
                          </div> 
                      </Col>
                    })
                  }
                </Row>
              </Col>
            </Row>
          </Card>
          <Modal visible={visible} title="添加注释" onOk={this.addOk} onCancel={this.addCancel} maskClosable={false} closable={false}>
            <Row style={{lineHeight: '42px', padding: '20px 40px'}}>
              <Col span={4} style={{textAlign: 'center'}}>注释：</Col>
              <Col span={20}><Input onChange={this.changeMark} placeholder="请添加注释" /></Col>
            </Row>
          </Modal>
          <Card title={this.renderTitle("上传封面", "注：当前剪裁尺寸：800x600，建议尺寸：800x600或以上")} bordered={false} style={{marginBottom: '20px'}}>
            <Row className={cx(l.rows)}>
              <Col span={1}  className={cx(l.label)}>*</Col>
              <Col span={23} >
                <Row gutter={16} className={cx(l.list)} style={{marginLeft: 0, marginRight: 0}}>
                  
                    <Col span={6} style={{marginBottom: '10px'}} onClick={this.showCover}>
                      <div className={cx(l.cell, l.ups)} style={coverUrlData ? {backgroundImage: `url(${coverUrlData})`} : {}}>
                        <Icon className={cx(l.icons)} type="plus-circle" style={{marginTop: '15px'}} />  
                        <h3>点击添加封面</h3> 
                      </div>
                    </Col>
                </Row>
              </Col>
            </Row>
            
          </Card>
          <div className={cx(l.btnBox)}>
            <Button onClick={this.save} type="primary" size="large" style={{width: 100, color: 'rgba(0,0,0,.65)'}}>发布</Button>
            <Button size="large" style={{marginLeft: '25px', width: 100}}>预览</Button>
          </div>
        </div>

        <Modal
          title="上传封面"
          visible={cover}
          onCancel={this.cancelCover}
          onOk={this.okCover}
          width={900}
          maskClosable={false}
          closable={false}
        >
          <div className={cx(l.coverBox, 'cover')}>
            <h3>当前剪裁尺寸：800x600，建议尺寸：800x600或以上</h3>
            <div className={cx(l.content)}>
              <div className={cx(l.left)}>
                <div className={cx(l.imgsBox)}>
                  {
                    covers.urlData ? <img src={covers.urlData} ref={(img) => this.img = img} alt=""/>
                    :
                    <Spin spinning={spinning} tip="正在上传..." size="large">
                      <UploadFile loadFile={this.loadCover} start={this.start} end={this.end} ajaxBool={false}>
                        <div className={cx(l.uploadCell)}>
                          <Icon className={cx(l.icons)} type="plus-circle" />  
                          <h3>点击添加照片</h3> 
                          <p>支持jpg/gif/png格式</p> 
                          <p>RGB模式，不超过1M</p> 
                        </div>
                      </UploadFile>
                    </Spin>
                  }
                </div>
                
                <Row style={{padding: '10px 0',textAlign: 'left'}}>
                  <Col span={8}>
                    <UploadFile loadFile={this.loadCover} spin={false} ajaxBool={false} upStyle={{display: 'inline-block'}}>
                      <Button type="primary" style={{color: 'rgba(0,0,0,.65)'}}>重新上传</Button>
                    </UploadFile>
                  </Col>
                  <Col span={16} style={{textAlign: 'right'}}>

                    <ButtonGroup >
                      <Tooltip title="左转45" placement="bottom"> 
                        <Button onClick={this.handleRotate.bind(null, 'left')} type="primary" icon="reload" className={cx('reload')} style={{color: 'rgba(0,0,0,.65)'}}/>
                      </Tooltip>
                      <Tooltip title="右转45" placement="bottom">
                        <Button onClick={this.handleRotate.bind(null, 'right')} type="primary" icon="reload" style={{color: 'rgba(0,0,0,.65)'}} />
                      </Tooltip>
                    </ButtonGroup>

                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <ButtonGroup >
                      <Tooltip title="上下颠倒" placement="bottom"> 
                        <Button onClick={this.handlePosition.bind(null, udbool, 'ud')} type="primary" icon="swap" className={cx('swap')} style={{color: 'rgba(0,0,0,.65)'}}/>
                      </Tooltip>
                      <Tooltip title="左右颠倒" placement="bottom">
                        <Button onClick={this.handlePosition.bind(null, lrbool, 'lr')} type="primary" icon="swap" style={{color: 'rgba(0,0,0,.65)'}} />
                      </Tooltip>
                    </ButtonGroup>

                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <ButtonGroup >
                      <Tooltip title="放大" placement="bottom"> 
                        <Button onClick={this.handleZoom.bind(null, 'plus')} type="primary" icon="plus-circle-o" style={{color: 'rgba(0,0,0,.65)'}}/>
                      </Tooltip>
                      <Tooltip title="缩小" placement="bottom">
                        <Button onClick={this.handleZoom.bind(null, 'minus')} type="primary" icon="minus-circle-o" style={{color: 'rgba(0,0,0,.65)'}}/>
                      </Tooltip>
                    </ButtonGroup>

                  </Col>
                </Row>
              </div>

              <div>
                <div className={cx(l.rights)}>
                  <div className={cx(l.imgs, 'small')}></div>
                  <div className={cx(l.con)}>
                    <h4>{title}</h4>
                    <p title={description}>{description}</p>
                    <span><Icon type="eye-o" />&nbsp;0</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span><Icon type="like-o" />&nbsp;0</span>
                  </div>
                  <div className={cx(l.footBox)}>
                    <div className={cx(l.left)}>
                      <Avatar size="small" icon="user" />
                    </div>
                    <div className={cx(l.mid)}>name</div>
                    <div className={cx(l.right)}>未发布</div>
                  </div>
                </div> 
                <h3 style={{marginTop: '10px'}}>封面预览</h3>
              </div>
              
            </div>
          </div>
        </Modal>
      </MainLayout>
      
    );
  }
}

export default Upload
