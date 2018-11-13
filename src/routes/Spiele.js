import React from 'react';
import l from './Spiele.less'
import cx from 'classnames'
import MainLayout from '../components/MainLayout/MainLayout'
import _ from 'lodash'
import { HOST } from '../utils/common'
import { getProducts, getUsersOfDetail } from '../services/common'
import Models from '../components/Model'
import { Router, Route, Switch, Redirect } from 'dva/router'

import { Pagination, Icon, Avatar, Row, Col, Button } from 'antd'

const imgs = {"id":102,"title":"蝙蝠车","description":"用乐高颗粒做出的蝙蝠车，带有展示性支架，希望大家喜欢。","images":[{"url":"/public/uploads/321/2018-09/cover2117.png","caption":""},{"url":"/public/uploads/321/2018-09/B52DC5F4-55B0-406C-B76D-3B3A17CFFC85.jpeg","caption":""},{"url":"/public/uploads/321/2018-09/725991F5-456D-4D08-A61B-673FAD5831AB.jpeg","caption":""},{"url":"/public/uploads/321/2018-09/BB24C6BA-FD7E-49B7-A9E0-0252FF8F85DE.jpeg","caption":""},{"url":"/public/uploads/321/2018-09/09A3BF86-8E1E-44E1-A467-0504090607A9.jpeg","caption":""},{"url":"/public/uploads/321/2018-09/745104D1-E949-4CBC-9581-307355D73AA1.jpeg","caption":""},{"url":"/public/uploads/321/2018-09/8CF2DBD8-E6E9-47A2-B66A-101677E0C650.jpeg","caption":""}],"num_votes":905,"create_at":"2018-09-18 06:28:33","update_at":"2018-10-16 10:54:59","author_id":311}


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '热门'},
        {name: '最新'},
        {name: '综合'}
      ],
      active: 0,

      total: 0,
      page: 1,
      pageSize: 10,
      produce: [],
      ids: [],
      authMes: {},
      order: 'hot'
    }
  }
  initSwiper = () => {
    this.mySwiper = new Swiper(this.refs.lun, {
      autoplay: {
        delay: 5000,
      },
      loop: true,
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        // nextEl: '<div>123</div>',
        prevEl: '.swiper-button-prev',
      },
    })

    this.mySwiper.on('click', function (e) {
      if (e.target.id) {
        // 可以请求下载
        // oDownload('https://api.51bricks.com/public/uploads/27/2018-09/cover1137.png')
        // oDownload('/img/50.png')
      }
    });
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
          // produce: _.sortBy(result.results, function (o) { return -o.num_votes }),
          produce: result.results,
          ids
        }, this.getMes)
      } else {

      }
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.initSwiper();



    this.getList()
  }
  changePage = (page, pageSize) => {
    this.setState({
      page: page
    }, this.getList)
  }


  renderBack = (data) => {
    let temp = {}
    if (data) {
      temp = {backgroundImage: `url(api/v1/file/thumbnail?size=500x400&origin=${data})`}
    }
    return temp
  }


  link = (index, type) => {
    const { produce, active } = this.state
    this.setState({
      active: index,
      order: type,
      page: 1
    }, this.getList)
  }
  render() {
    const { active, nav } = this.state;
    const { page, total, pageSize, produce, pagination, authMes } = this.state
    const type = ['hot', 'time', 'auto']
    return (
      <div style={{paddingTop: '20px'}}>
        
        <div className={cx(l.detaiBox)}>
          <div className={cx('main_container')}>
            <div className={cx(l.left)}>
              <div className={cx(l.newSlider, 'detail')}>
                <div className="swiper-container" ref="lun">
                  <div className="swiper-wrapper">
                      {
                        imgs.images.map( (item,index) => {
                          return<div key={index} className={cx("swiper-slide", l.bgs)} id={item.url} style={this.renderBack(item.url)}></div>
                        })
                      }
                  </div>
                  <div className="swiper-pagination"></div>
                  <div className={cx("swiper-button-prev", 'myself-icon', l.prev)}>&#xe636;</div>
                  <div className={cx("swiper-button-next", 'myself-icon', l.next)}>&#xe6dc;</div>
                </div>
              </div>
            </div>
            <div className={cx(l.right)}>
              <h2>网易×也造 | 网易漫画鹿娘设计大赛</h2>
              <div className={cx(l.text)}>
                赛事简介：赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！
              </div>

              <Row>
                <Col span={16}>
                  <span style={{marginRight: '20px'}}>参与人数：<i>2828</i></span>
                  <span>作品数：<i>333</i></span>
                </Col>
                <Col span={8} style={{textAlign: 'right'}}>
                  <Button type="primary" style={{color: '#282828', fontSize: '12px'}}>参与比赛</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className={cx(l.navs)}>
          {
            nav.map((item, index) => {
              const ese = type[index]
              return <span onClick={this.link.bind(null, index, ese)} className={cx(l.menuItems, l[ active === index ? 'active' : null])} key={index}>{item.name}</span>
            })
          }
        </div>

        <div className={cx('main_container', l.hots)}>
          { /* produce */
            produce.map((item, index) => {
              const perMes = authMes[item.author_id] ? authMes[item.author_id] : {}
              return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                <Models keys={index + 1} data={item} name={perMes.nickname ? perMes.nickname : ''} avatar={perMes.avatar ? `${HOST}${perMes.avatar}` : '/img/touxiang.png'} />
              </div>
            })
          }
        </div>
        <div className={cx(l.pageBox, 'pageBox')}>
          <Pagination current={page} total={total} pageSize={pageSize} onChange={this.changePage} />
        </div>
      </div>
    );
  }
}




class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{}, {}]
    }
  }
  initSwiper = () => {
    this.mySwiper = new Swiper(this.refs.lun, {
      autoplay: {
        delay: 5000,
      },
      loop: true,
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        // nextEl: '<div>123</div>',
        prevEl: '.swiper-button-prev',
      },
    })

    this.mySwiper.on('click', function (e) {
      if (e.target.id) {
        // 可以请求下载
        console.log('123123')
        // oDownload('https://api.51bricks.com/public/uploads/27/2018-09/cover1137.png')
        // oDownload('/img/50.png')
        document.location.href = '#/spiele/123'
      }
    });
  }
  componentDidMount() {
    this.initSwiper()
  }
  renderBack = (data) => {
    let temp = {}
    if (data) {
      // temp = {backgroundImage: `url(${HOST}${data})`}
      temp = {backgroundImage: `url(api/v1/file/thumbnail?size=500x400&origin=${data})`}
    }
    return temp
  }



  creatSpiele = (item) => {
    document.location.href = `#/spiele/${'id'}`
  }
  render() {
    const { list } = this.state;
    return (
      <div className={cx('main_container')}>
        <ul className={cx(l.con)}>
          {
            list.map( (item, index) => {
              return(
                <li key={index}>
                  <div className={cx(l.newSlider, 'spiele')}>
                    <div className="swiper-container" ref="lun">
                      <div className="swiper-wrapper">
                          {
                            imgs.images.map( (item,index) => {
                              return<div key={index} className={cx("swiper-slide", l.bgs)} id={item.url} style={this.renderBack(item.url)}></div>
                            })
                          }
                      </div>
                      <div className="swiper-pagination"></div>
                      <div className={cx("swiper-button-prev", 'myself-icon', l.prev)}>&#xe636;</div>
                      <div className={cx("swiper-button-next", 'myself-icon', l.next)}>&#xe6dc;</div>
                    </div>
                  </div>
                  <div className={cx(l.bottom)}>
                    <p>赛事简介：赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！赛事开始了！</p>
                    <Row>
                      <Col span={12} className={cx(l.ll)}>
                        <span>参与人数：<i>2828</i></span>
                        <span>作品数：<i>333</i></span>
                      </Col>
                      <Col span={12} className={cx(l.rr)}>
                        <Button onClick={this.creatSpiele.bind(null, item)} type="primary" style={{color: '#282828', fontSize: '12px'}}>赛事详情</Button>
                      </Col>
                    </Row>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className={cx(l.pageBox)}>
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    );
  }
}

class Spiele extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    return (
      <MainLayout location={location}>
        <Switch>
          <Route exact path='/spiele' component={List} />
          <Route exact path='/spiele/:id' component={Detail} />
        </Switch>
      </MainLayout>
    );
  }
}

export default Spiele
