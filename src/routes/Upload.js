import React from 'react';
import { connect } from 'dva'
import cx from 'classnames';
import l from './Upload.less'
import MainLayout from '../components/MainLayout/MainLayout'
import UploadFile from '../components/MainLayout/UploadFile'
import { Card, Button, Input, Row, Col, Icon, Modal, notification, Spin } from 'antd'
import { deepClone } from '../utils/common'
import { uploaderFile, creatProduce } from '../services/common'
const { TextArea } = Input;

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      visible: false,
      spinning: false,
      mark: {},
      covers: {},
      title: undefined, 
      description: undefined, 
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











  loadCover = (file, urlData, data) => {
    this.setState({
      covers: {...data, urlData},
    })
  }
  start = () => {
    this.setState({spinning: true})
  }
  end = () => {
    this.setState({spinning: false})
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
    console.log(covers)
    const para = {
      title, 
      description,
      images: imgs
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
  render() {
    const { location } = this.props;
    const { imgs, visible, covers, spinning, title, description } = this.state;
    return (
      <MainLayout location={location}>
        <div className={cx('main_container')}>
          <h1 className={cx(l.title)}>上传作品</h1>
          <Card title={this.renderTitle("作品信息")}  bordered={false} style={{marginBottom: '20px'}}>
            <Row className={cx(l.rows)}>
              <Col span={1}  className={cx(l.label)}>*</Col>
              <Col span={19}  className={cx(l.con)}>
                <Input value={title} size="large" placeholder="请输入作品名称" onChange={this.changeName.bind(null, 'title')} />
                <span className={cx(l.num)}>{title ? title.length : 0}/20</span>
              </Col>
            </Row>
            <Row className={cx(l.rows)}>
              <Col span={1}  className={cx(l.label)}></Col>
              <Col span={19}  className={cx(l.con)}>
                <TextArea value={description} onChange={this.changeName.bind(null, 'description')}  size="large" placeholder="请输入作品说明" rows={4} style={{resize: 'none'}} />
                <span className={cx(l.num)}>{description ? description.length : 0}/200</span>
              </Col>
            </Row>
          </Card>

          <Card title={this.renderTitle("上传作品", "注：不要在图片上放置广告信息，图片暂定不超过6张")} bordered={false} style={{marginBottom: '20px'}}>
            <Row className={cx(l.rows)}>
              <Col span={1}  className={cx(l.label)}>*</Col>
              <Col span={19} >
                <Row gutter={16} className={cx(l.list)} style={{marginLeft: 0, marginRight: 0}}>
                  <Col span={6} style={{marginBottom: '10px'}}>
                    <UploadFile loadFile={this.loadFile}>
                      <div className={cx(l.cell, l.ups)}>
                        <Icon className={cx(l.icons)} type="plus-circle" />  
                        <h3>点击添加照片</h3> 
                        <p>支持jpg/gif/png格式RGB模式，不超过1M</p> 
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
              <Col span={19} >
                <Row gutter={16} className={cx(l.list)} style={{marginLeft: 0, marginRight: 0}}>
                  
                    <Col span={6} style={{marginBottom: '10px'}}>
                      {
                        !covers.url ?
                        <Spin spinning={spinning} tip="正在上传..." size="large">
                        <UploadFile loadFile={this.loadCover} spin={false} start={this.start} end={this.end}>
                          <div className={cx(l.cell, l.ups)}>
                            <Icon className={cx(l.icons)} type="plus-circle" />  
                            <h3>点击添加封面</h3> 
                          </div>
                        </UploadFile>
                        </Spin>
                        :
                        <Spin spinning={spinning} tip="正在上传..." size="large">
                        <div className={cx(l.covers)} style={{backgroundImage: `url(${covers.urlData})`}}>
                          <div  className={cx(l.remark)}>
                            <UploadFile loadFile={this.loadCover} spin={false}>重新上传</UploadFile>
                          </div>
                        </div>
                        </Spin>
                      }
                    </Col>
                  
                </Row>
              </Col>
            </Row>
            
          </Card>
          <div className={cx(l.btnBox)}>
            <Button onClick={this.save} type="primary" size="large" style={{width: 100}}>发布</Button>
            <Button size="large" style={{marginLeft: '25px', width: 100}}>预览</Button>
          </div>
        </div>
      </MainLayout>
      
    );
  }
}

export default Upload
