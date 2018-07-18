import React from 'react'
import { connect } from 'dva'
import l from './Users.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { Form, Input, Icon, Button, notification, Spin, essage } from 'antd';


class Box extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };
  static defaultProps = {
    name: 'jeremy'
  };
  constructor(props) {
    super(props);
    this.state = {
      num : 1
    }
  }
  handle = () => {
    this.setState((prevState, props) => {
      console.log(prevState, props)
      return {num: prevState.num + 1}
    })
  }
  render() {
    const { num } = this.state;
    return (
      <div>
       {num}{this.props.name}
        <Button onClick={this.handle}>box</Button>
      </div>
    );
  }
}


function widthConnect(WrappedComponent, data) {
  class WithComponent  extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
    }
    componentDidMount() {
      this.setState({
        data: data
      })
    }
    noti = (msg) => {
      notification.error({
        message: `${msg}`
      })
    }

    render() {
      const { data } = this.state
      return <WrappedComponent data={data} error={this.noti} {...this.props}/>
    }
  }
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  WithComponent.displayName = `width_${getDisplayName(WrappedComponent)}`; //displayName 方便调试查找
  return WithComponent
  
}

class Noti extends React.Component {
  constructor(props) {
    super(props);
  }
  handle = () => {
    this.props.error('错误的信息')
  }
  render() {
    return (
      <div>
        <Button onClick={this.handle}>noti</Button>
      </div>
    );
  }
}

Noti = widthConnect(Noti, [1,2,3])




// let count = 0;
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      spinning: false,
      SRC: null,
      iconType: 'file',
    }
  }
  static defaultProps = {
    loadFile: () => {},
    extendDom: <a>支持扩展名：.jpg .png</a>,
    type: "TEXT", 
    spin: true,
  }
  showIconType = (str) => {
    console.log(str)
    let temp = 'file';
    if (str.indexOf('image') !== -1) {
      temp = 'picture'
    }else if (str.indexOf('pdf') !== -1) {
      temp = 'file-pdf'
    }else if (str.indexOf('sheet') !== -1) {
      temp = 'file-excel'
    }
    return temp
  }
  handleFileChange = (e) => {
    const {type, loadFile} = this.props;
    const that = this;
    const file = e.target.files[0];
    if (typeof FileReader !== undefined) {
      const reader = new FileReader();
      if (type && type === 'URL') {
        reader.readAsDataURL(file);//发起异步请求
      }else{
        reader.readAsText(file,"utf-8");//发起异步请求
      }
      reader.onload = function(){
        // console.log("加载成功", file)
        if (type === 'URL') {
          if (file.type.indexOf('image') !== -1) {
            that.setState({
              SRC: this.result,
              iconType: that.showIconType(file.type),
              file
            }, () => loadFile(file))
          }else{
            notification.info({
              message: '文件格式不对，请重新上传！'
            })
          }
        }else{
          that.setState({
            file,
            iconType: that.showIconType(file.type)
          }, () => loadFile(file))
        }
      }
      reader.onloadstart = function(){
        that.setState({spinning: true})
        // console.log("开始加载")
      }
      reader.onloadend= function(){
        that.setState({spinning: false})
        // console.log("加载结束")
      }
      reader.onprogress = function(){
        // count++;
        // console.log("加载中"+count)
      }
    }else{
      console.log('浏览器不支持 FileReader')
      this.setState({
        file
      })
    }

  };
  render() {
    const { file, spinning, SRC, iconType } = this.state
    const { extendDom, type, spin } = this.props;
    return (
      <Spin tip="正在上传..." spinning={spin ? spinning : false}>
        <div className={l.file_upload}>
          {
            file ?
            <div className={l.wrapper}>
              {
                type === 'TEXT' ?
                <div className={l.wrapper_name}>
                  <Icon type={iconType} style={{fontSize: '18px', marginRight: '5px'}}/>
                  {file ? file.name : ''}
                </div>
                :
                <img src={SRC} className={l.wrapper_img} />
              }
              <div className={l.btnBox}>
                  <Button type="primary">重新上传</Button>
                  <form>
                    <input type='file'  onChange={this.handleFileChange.bind(this)}/>
                    <input type='reset' ref={(input) => this.reset=input} className={l.reset} />
                  </form>
              </div>
            </div>
            :
            <div className={l.wrapper}>
              <Icon className={l.wrapper_icons}  type="cloud-upload-o" /> 
              <p>点击或将文件拖拽到这里上传</p>
              {extendDom}
              <form>
                <input type='file'  onChange={this.handleFileChange.bind(this)}/>
                <input type='reset' ref={(input) => this.reset=input} className={l.reset} />
              </form>
            </div>
          }
        </div>
      </Spin>
    );
  }
}




class Users extends React.Component {
  constructor(props) {
    super(props);
  }
  fileChange = (file) => {
    console.log(file, '11111')
  }
  render() {
    const {location} = this.props;
    return (
      <MainLayout location={location}>
        <div>
          <Box name="jeremy"/>
          <Noti {...this.props} />
        </div>

        <FileUpload loadFile={this.fileChange} spin={false}/>
      </MainLayout>
    );
  }
}
const mapState = state => {
  const { example: {page} } = state;
  return {
    page
  }
}

export default connect(mapState)(Users)
