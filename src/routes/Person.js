import React from 'react'
import { connect } from 'dva'
import cx from 'classnames'
import l from './Person.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { getUsersOfDetail, getAuthOfProduce } from '../services/common'
import { HOST, getSearchObj } from '../utils/common'
import { Model } from '../components/HotWorks'
import Models from '../components/Model'

import { Pagination } from 'antd'
const dutArr = (num) => {
  let temp = []
  for (let n = 0; n < num; n++) {
    temp.push(n + 1)
  }
  return temp
}
class PersonProduce extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      produce: [],
      total: 0,
      page: 1,
      pageSize: 20
    }
  }
  getProducts = async(id) => {
    const { page, pageSize } = this.state
    try {
      const result = await getAuthOfProduce(id, {limit: pageSize, offset: (page - 1) * pageSize})
      if (result && !result.code) {
        this.setState({
          total: result.count,
          produce: result.results
        })
      } else {

      }
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount () {
    if (this.props.id) {
      this.getProducts(this.props.id)
    }
  }
  componentWillReceiveProps (nextProps) {
    const { id } = nextProps
    if (nextProps.id !== this.props.id && nextProps.id) {
      this.getProducts(nextProps.id)
    }
  }
  changePage = (page, pageSize) => {
    this.setState({
      page: page
    }, this.getProducts)
  }
  render () {
    const { info } = this.props
    const { produce, page, total, pageSize } = this.state
    return (
      <div>
        <div className={cx(l.hots)}>
          {
             produce.map((item, index) => {
               return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                 <Models keys={index + 1} data={item} avatar={info.avatar ? info.avatar : '/img/touxiang.png'} name={info.nickname ? info.nickname : ''} />
               </div>
             })
          }
        </div>
        <div className={cx(l.pageBox, 'pageBox')}>
          <Pagination current={page} total={total} pageSize={pageSize} onChange={this.changePage} />
        </div>
      </div>
    )
  }
}

class Person extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      id: undefined,
      mess: {}
    }
  }
  getPersonDetail = async() => {
    const { id } = this.state
    try {
      const result = await getUsersOfDetail(id)
      if (result && !result.code) {
        this.setState({
          mess: result
        })
      } else {

      }
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount () {
    const { match: {params}, location } = this.props
    const search = getSearchObj(location)
    if (params.id) {
      this.setState({
        id: params.id,
        active: search && search.type === 'like' ? 1 : 0
      }, this.getPersonDetail)
    }
  }
  componentWillReceiveProps (nextProps) {
    const { match: {params} } = this.props
    if (nextProps.match.params && nextProps.match.params.id !== this.props.match.params.id) {
      console.log('wo xuyao gengxin le   -=-=p-=-=-=-')
      this.setState({
        id: nextProps.match.params.id
      }, this.getPersonDetail)
    }
  }

  handle = (num) => {
    console.log(num)
    this.setState({
      active: num
    })
  }
  render () {
    const { location } = this.props
    const { active, id, mess } = this.state
    return (
      <MainLayout location={location}>
        <div className={cx(l.topBox)}>
          <div className={cx(l.avartBox)}>
            <img src={mess.avatar ? `${HOST}${mess.avatar}` : '/img/touxiang.png'} alt='' />
            <h3 style={{height: '42px'}}>{mess.nickname}</h3>
            {/* <div className={cx(l.txt)}>
              <div className={cx(l.l_label)} style={{paddingRight: '5px'}}>创作 87</div>
              <div className={cx(l.line, l.pd)}><i></i></div>
              <div className={cx(l.r_label)} style={{paddingLeft: '5px'}}>粉丝 88</div>
            </div>
            */}
            <div>创作 {mess.num_products ? mess.num_products : 0}</div>
            <div style={{marginTop: '10px'}}>{mess.intro ? mess.intro : ''}</div>
          </div>
        </div>

        <div className={cx(l.tabBox)}>
          <span onClick={this.handle.bind(null, 0)} className={cx(l.nav, l[active === 0 ? 'active' : ''])}>个人作品</span>
          <span onClick={this.handle.bind(null, 1)} className={cx(l.nav, l.mr, l[active === 1 ? 'active' : ''])}>喜欢作品</span>
        </div>
        <div className={cx(l.tabContent, 'main_container')}>
          <PersonProduce id={id} info={{avatar: `${HOST}${mess.avatar}`, nickname: mess.nickname}} />
        </div>
      </MainLayout>
    )
  }
}

export default Person
