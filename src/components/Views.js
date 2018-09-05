import React from 'react'
import cx from 'classnames'
import l from './HotWorks.less'
import ScrollReveal from 'scrollreveal'
import { Model } from './HotWorks'
import { Pagination, Icon, Avatar } from 'antd'
import MainLayout from './MainLayout/MainLayout'
import { getProducts, getUsersOfDetail } from '../services/common'
import _ from 'lodash'
import { deepClone, HOST } from '../utils/common'
import Models from '../components/Model'


const dutArr = (num) => {
  let temp = []
  for (let n = 0; n < num; n++) {
    temp.push(n + 1)
  }
  return temp
}

class Views extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nav: [
        {name: '热门'},
        {name: '最新'},
        {name: '综合'}
      ],
      active: 0,
      total: 0,
      page: 1,
      pageSize: 20,
      old: [],
      produce: [],
      ids: [],
      authMes: {},
      order: 'hot'
    }
  }
  getMes = async() => {
    const arr = _.uniq(this.state.ids)
    // console.log(arr)
    let mes = {}
    try {
      for (let i = 0; i < arr.length; i++) {
        const data = await getUsersOfDetail(arr[i])
        const key = arr[i].toString()
        mes[key] = data
      }
      this.setState({
        authMes: mes
      })
    } catch (err) {
      console.log(err)
    }
  }
  getList = async() => {
    const { page, pageSize, order } = this.state
    try {
      const result = await getProducts({limit: pageSize, offset: (page - 1) * pageSize, order})
      if (result && !result.code) {
        let ids = result.results.map(item => {
          return item.author_id
        })
        this.setState({
          total: result.count,
          // old: result.results,
          produce: result.results,
          ids
        }, this.getMes)
      } else {

      }
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount () {
    this.getList()
    // window.sr = ScrollReveal({ duration: 600, reset: false });
    // sr.reveal('.vealcell', {
    //   duration: 1000,
    //   scale: 1,
    //   origin: 'left',
    //   distance: '10px',
    //   rotate: {z: 15}
    // }, 50);
  }

  link = (index, type) => {
    const { produce, active } = this.state
    this.setState({
      active: index,
      order: type
    }, this.getList)
  }

  changePage = (page, pageSize) => {
    this.setState({
      page: page
    }, this.getList)
  }

  render () {
    const { location } = this.props
    const { nav, active, page, pageSize, total, produce, authMes } = this.state
    const type = ['hot', 'time', 'auto']
    return (
      <MainLayout location={location}>
        <div className={cx(l.navs)}>
          {
            nav.map((item, index) => {
              const ese = type[index]
              return <span onClick={this.link.bind(null, index, ese)} className={cx(l.menuItems, l[ active === index ? 'active' : null])} key={index}>{item.name}</span>
            })
          }
        </div>
        <div className={cx('main_container')}>
          <div className={cx(l.hots)}>
            {
              produce.map((item, index) => {
                const perMes = authMes[item.author_id] ? authMes[item.author_id] : {}
                return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                  <Models keys={index + 1} data={item} name={perMes.nickname ? perMes.nickname : ''} avatar={perMes.avatar ? `${HOST}${perMes.avatar}` : '/img/touxiang.png'} />
                </div>
              })
            }
          </div>
          <div className={cx(l.pageBox, 'pageBox')}>
            <Pagination current={page} pageSize={pageSize} total={total} onChange={this.changePage} />
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default Views
