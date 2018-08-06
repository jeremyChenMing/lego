import React from 'react';
import cx from 'classnames';
import l from './UploadFile.less'
import { Spin, notification } from 'antd'
import { uploaderFile } from '../../services/common'

class UploadFile extends React.Component {
  static defaultProps = {
    loadFile: () => {},
    refFun: () => {},
    type: 'URL',
    spin: true,
    ajaxBool: true,
  }
  constructor(props) {
    super(props);
    this.state = {
      spinning: false
    }
  }

  load = (file, result) => {
    const { ajaxBool } = this.props;
    if(ajaxBool) {
      uploaderFile({name: file.name, file}).then( data => {
        this.setState({spinning: false})
        if (data && !data.code) {
          this.props.loadFile(file, result, {...data})
        }
      }).catch(err => {
        this.setState({spinning: false})
        notification.error({
          message: '上传文件错误！'
        })
        console.log(err)
      }) 
    }else{
      this.props.loadFile(file, result, {})
    }
  }

  handleFileChange = (e) => {
    const {type, loadFile} = this.props;
    const that = this;
    const file = e.target.files[0];
    // console.log(type, '******', typeof FileReader)
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
              // SRC: this.result,
              // iconType: that.showIconType(file.type),
              // file
            }, () => that.load(file, this.result))
          }else{
            notification.info({
              message: '文件格式不对，请重新上传！'
            })
          }
        }else{
          that.setState({
            // file,
            // iconType: that.showIconType(file.type)
          }, that.load(file, this.result))
        }
      }
      reader.onloadstart = function(){
        that.setState({spinning: true})
        // console.log("开始加载")
        if (that.props.start) {
          that.props.start()
        }
      }
      reader.onloadend= function(){
        // that.setState({spinning: false})
        if (that.props.end) {
          that.props.end()
        }
        // console.log("加载结束")
      }
      reader.onprogress = function(){
        // count++;
        // console.log("加载中"+count)
      }
    }else{
      console.log('浏览器不支持 FileReader')
      // this.setState({
      //   file
      // })
      notification.info({
        message: `当前浏览器版本较低，请升级浏览器，或切换谷歌浏览器！`
      })
    }

  };
  render() {
    // (input) => this.reset=input
    const { spinning } = this.state;
    const { spin, upStyle, wraS } = this.props;
    return (
      <Spin size="large" tip="正在上传..." spinning={spin ? spinning : false}>
      <div className={l.file_upload} style={upStyle ? upStyle : {}}>
        <div className={l.wrapper} style={wraS ? wraS : {}}>
          {this.props.children}
          <form>
            <input type='file'  onChange={this.handleFileChange}/>
            <input type='reset' ref={(input) => this.props.refFun(input)} className={l.reset} />
          </form>
        </div>
      </div>
      </Spin>
    );
  }
}

export default UploadFile
