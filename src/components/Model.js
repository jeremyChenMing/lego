import React from 'react'
import cx from 'classnames'
import l from './HotWorks.less'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { HOST } from '../utils/common'
import { Pagination, Icon, Avatar, Button, notification, Modal } from 'antd'
import { deleteProduce } from '../services/common'
import moment from 'moment'
const confirm = Modal.confirm;
class Model extends React.Component {
  constructor (props) {
    super(props)
  }
  static defaultProps = {
    callback: () => {},
    myself: false
  }
  link = (id, type) => {
    const { dispatch } = this.props;
    // document.location.href = `/main/detail?id=${id}`
    dispatch(routerRedux.push(`/main/detail?id=${id}`))
  }

  componentDidMount () {
    const { name, avatar } = this.props
    // console.log(name, avatar, '*&')
  }
  showTime = (data) => {
    let temp = ''
    // const timeArr = data.create_at ? data.create_at.split(' ') : [];
    if (data.create_at) {
      temp = moment().from(data.create_at)
    }
    return temp
  }
  renderBack = (data) => {
    let temp = {}
    if (data && data.images && data.images[0]) {
      // temp = {backgroundImage: `url(${HOST}${data.images[0].url})`}
      temp = {backgroundImage: `url(api/v1/file/thumbnail?size=220x200&origin=${data.images[0].url})`}
    }
    return temp
  }

  delProduce = (event) => {
    event.stopPropagation();
    const { data } = this.props
    const that = this;
    console.log(this.props.callback)
    confirm({
      title: '确认删除该作品吗?',
      // content: '删除的作品将不会',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        return new Promise( (resolve, reject) => {
          deleteProduce(data.id).then( data => {
            resolve()
            if (data && !data.code) {
              if (that.props.callback) {
                that.props.callback()
              }
              notification.success({
                message: '删除作品成功！'
              })
            }else{
              notification.error({
                message: '删除作品失败！'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  }
  render () {
    const { data, myself } = this.props
    return (
      <div onClick={this.link.bind(null, data.id, 'hot')} className={cx(l.modelBox)}>
        <div className={cx(l.imgs)} style={this.renderBack(data)} />
        <div className={cx(l.con)}>
          <h4>{data.title ? data.title : ''}</h4>
          <p title={data.description ? data.description : ''}>{data.description ? data.description : ''}</p>
          {/* <span><Icon type="eye-o" />&nbsp;1555</span>
          &nbsp;&nbsp;&nbsp;&nbsp; */}
          
          
          <div className={cx(l.filBtn)}>
            <div className={cx(l.filL)}><span><Icon type='like-o' />&nbsp;{data.num_votes}</span></div>
            <div className={cx(l.filR)}>{myself && <Button onClick={this.delProduce} type="danger" size="small">删除</Button>}</div>
          </div>
        </div>
        <div className={cx(l.footBox)}>
          <div className={cx(l.left)}>
            <Avatar size='small' icon='user' src={this.props.avatar} />
          </div>
          <div className={cx(l.mid)}>{this.props.name}</div>
          <div className={cx(l.right)}>{this.showTime(data)}</div>
        </div>
      </div>
    )
  }
}

export default connect()(Model)
