import React from 'react'
import { connect } from 'dva'
import cx from 'classnames'
import l from './Person.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { getUsersOfDetail, getAuthOfProduce, getMyVotesProducts } from '../services/common'
import { HOST, getSearchObj } from '../utils/common'
import { Model } from '../components/HotWorks'
import Models from '../components/Model'
import _ from 'lodash'
import { Pagination } from 'antd'

class PersonProduce extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  static defaultProps = {
    callback: () => {}
  }
  componentDidMount () {
  }
  componentWillReceiveProps (nextProps) {

  }
  render () {
    const { info, produce = [], mess, myself } = this.props
    return (
      <div>
        <div className={cx(l.hots)}>
          {
             produce.map((item, index) => {
               return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                 <Models myself={myself} callback={this.props.callback} keys={index + 1} data={item} avatar={mess[item.author_id] ? mess[item.author_id].avatar : '/img/touxiang.png'} name={mess[item.author_id] ? mess[item.author_id].nickname : ''} />
               </div>
             })
          }
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
      mess: {},
      myself: false,
      total: 0,
      page: 1,
      pageSize: 20,
      produce: [],
      ids: [],
      authMes: {}
    }
  }
  getAuthMes = async() => {
    const { id } = this.state;
    try{
      const result = await getUsersOfDetail(id);
      if (result && !result.code) {
        this.setState({
          authMes: result
        })
      }
    }catch(err) {

    }
  }
  getMes = async() => {
    const arr = _.uniq(this.state.ids)
    let mes = {}
    try {
      for (let i = 0; i < arr.length; i++) {
        const data = await getUsersOfDetail(arr[i])
        const key = arr[i].toString()
        mes[key] = data
      }
      this.setState({
        mess: mes
      })
    } catch (err) {
      console.log(err)
    }
  }

  getProducts = async() => {
    const { page, pageSize, id } = this.state
    try {
      const result = await getAuthOfProduce(id, {limit: pageSize, offset: (page - 1) * pageSize})
      if (result && !result.code) {
        this.setState({
          total: result.count,
          produce: result.results,
        }, this.getAuthMes)
      } else {

      }
    } catch (err) {
      console.log(err)
    }
  }
  getVotesProducts = async() => {
    const { page, pageSize, id } = this.state
    try {
      const result = await getMyVotesProducts({limit: pageSize, offset: (page - 1) * pageSize})
      if (result && !result.code) {
        const ids = result.results.map( item => {
          return item.author_id
        })
        this.setState({
          total: result.count,
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
    const { match: {params}, location, example } = this.props
    const search = getSearchObj(location)
    if (params.id) {
      this.setState({
        id: params.id,
        myself: params.id == example.id ? true : false,
        active: search && search.type === 'like' ? 1 : 0
      }, () => {
        this.getProducts()
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    // const { match: {params} } = this.props
    if (nextProps.match.params && nextProps.match.params.id !== this.props.match.params.id) {
      console.log('wo xuyao gengxin le   -=-=p-=-=-=-')
      this.setState({
        id: nextProps.match.params.id,
        active: 0,
        myself: nextProps.match.params.id == this.props.example.id ? true : false,
      }, this.getProducts)
    }
  }

  handle = (num) => {
    const { myself } = this.state;
    console.log(num, myself)
    if (myself) {
      
      if (num) {
        this.setState({
          page: 1,
          active: num,
        }, this.getVotesProducts)  
      }else{
        this.setState({
          active: num
        }, this.getProducts)
      }

    }else{
      if (num) {
        this.setState({
          active: num,
          produce: [],
          page: 1,
          total: 0
        }) 
      }else{
        this.setState({
          active: num
        }, this.getProducts) 
      }
      
    }
  }
  changePage = (page, pageSize) => {
    const { active } = this.state;
    if (active) {
      this.setState({
        page: page
      }, this.getProducts)
    }else{
      this.setState({
        page: page,
      }, this.getVotesProducts) 
    }
    
  }

  refreshData = () => {
    this.getProducts()
  }
  render () {
    const { location } = this.props
    const { active, id, mess, produce, myself, page, total, pageSize, ids, authMes } = this.state
    console.log(myself, active, '是不是自己')
    return (
      <MainLayout location={location}>
        <div className={cx(l.topBox)}>
          <div className={cx(l.avartBox)}>
            <img src={authMes.avatar ? `${authMes.avatar}` : '/img/touxiang.png'} alt='也造头像' />
            <h3 style={{height: '42px'}}>{authMes.nickname}</h3>
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
          <PersonProduce myself={(!active && myself) ? true : false} callback={this.refreshData} produce={produce} mess={active ? mess : {[authMes.id ? authMes.id : '-1']: authMes}} info={{avatar: `${HOST}${mess.avatar}`, nickname: mess.nickname}} />
        </div>
        {
          total &&
          <div className={cx(l.pageBox, 'pageBox')}>
            <Pagination current={page} total={total} pageSize={pageSize} onChange={this.changePage} />
          </div>
        }
      </MainLayout>
    )
  }
}


const mapState = state => {
  const { example } = state;
  return {example}
}

export default connect(mapState)(Person)
