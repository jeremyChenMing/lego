import React from 'react'
import cx from 'classnames'
import l from './HotWorks.less'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { HOST } from '../utils/common'
import { Pagination, Icon, Avatar } from 'antd'
import moment from 'moment'

class Model extends React.Component {
  constructor (props) {
    super(props)
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
      temp = {backgroundImage: `url(${HOST}${data.images[0].url})`}
    }
    return temp
  }
  render () {
    const { data } = this.props
    return (
      <div onClick={this.link.bind(null, data.id, 'hot')} className={cx(l.modelBox)}>
        <div className={cx(l.imgs)} style={this.renderBack(data)} />
        <div className={cx(l.con)}>
          <h4>{data.title ? data.title : ''}</h4>
          <p title={data.description ? data.description : ''}>{data.description ? data.description : ''}</p>
          {/* <span><Icon type="eye-o" />&nbsp;1555</span>
          &nbsp;&nbsp;&nbsp;&nbsp; */}
          <span><Icon type='like-o' />&nbsp;{data.num_votes}</span>
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
