import React from 'react'
import { connect } from 'dva'
import cx from 'classnames'
import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { Router, Route, Switch, BrowserRouter, HashRouter, Redirect, Link } from 'dva/router'
import HotWorks from '../components/HotWorks'
import TotalWorks from '../components/TotalWorks'
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { getUsers, getProfile, getRefreshToken, pictures } from '../services/common'
import { HOST, getSearchObj } from '../utils/common'
import { saveUserInfo } from '../actions/example'

import { Button, Layout, Carousel, Row, Col, Icon, message } from 'antd'
const { Content, Footer } = Layout

class Cell extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'primary'
    }
  }
  handle = (type) => {
    console.log(type)
    this.setState({
      type: type ? '' : 'primary'
    })
    message.info(`${type ? '关注成功！' : '取消关注成功！'}`)
  }

  link = () => {
    const { dispatch, data } = this.props
    dispatch(routerRedux.replace(`/person/${data.id}`))
  }
  render () {
    const { keys = 1, data } = this.props
    const renderBack = (data) => {
      return data.avatar ? {backgroundImage: `url(${HOST}${data.avatar})`} : {backgroundImage: `url(/img/touxiang.png)`}
    }
    return (
      <div className={cx(l.cellBox)} style={renderBack(data)}>
        <div className={cx(l.shadow)} />
        <div onClick={this.link} className={cx(l.cons)}>
          <img className={cx(l.avart)} src={data.avatar ? `${HOST}${data.avatar}` : '/img/touxiang.png'} alt='也造头像' />
          <p>
            <span className={cx(l.name)}>{data.nickname ? data.nickname : ' '} <Icon type='star' /></span>
          </p>
          {/* <div className={cx(l.txt)}>
            <div className={cx(l.l_label)}>北京</div>
            <div className={cx(l.line)}><i></i></div>
            <div className={cx(l.r_label)}>创客2年</div>
          </div>
          <div className={cx(l.txt)}>
            <div className={cx(l.l_label)} style={{paddingRight: '30px'}}>创作 {data.num_products ? data.num_products : 0}</div>
            <div className={cx(l.line, l.pd)}><i></i></div>
            <div className={cx(l.r_label)} style={{paddingLeft: '30px'}}>粉丝 88</div>
          </div> */}
          <div className={cx(l.word)} style={{fontSize: '12px', color: 'rgba(255, 255, 255, .7)', margin: '10px 0', height: '18px'}}>{data.intro ? `${data.intro}` : '暂无简介'}</div>
          <div style={{fontSize: '12px', color: 'rgba(255, 255, 255, .7)'}}>创作 {data.num_products ? data.num_products : 0}</div>
          {/* <Button
            onClick={this.handle.bind(null, this.state.type)}
            type={this.state.type}
            className={cx(l.btn, l[this.state.type ? '' : 'grays'])}
          >
            {this.state.type ? '关注ta' : '取消关注'}
          </Button> */}
        </div>

      </div>
    )
  }
}

class IndexPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userList: [],
      picturesList: []
    }
  }

  profile = async() => {
    try {
      const result = await getProfile()
      console.log(result, 'user/profile')
      if (result && !result.code) {

      }
    } catch (err) {
      console.log(err)
    }
  }
  users = async() => {
    try {
      const result = await getUsers({limit: 5, offset: 0})
      console.log(result)
      if (result && !result.code) {
        this.setState({
          userList: result.results
        })
      }
    } catch (err) {
      console.log(err)
    }
  }


  getPictures = async() => {
    try {
      const result = await pictures()
      console.log(result, 'user/pictures')
      if (result && !result.code) {
        this.setState({
          picturesList: result
        }, this.swiperFun)
      }
    } catch (err) {
      console.log(err)
    }
  }

  swiperFun = () => {
    this.mySwiper = new Swiper(this.refs.lun, {
      // slidesPerView : 3,
      // spaceBetween : 20,
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
    // this.mySwiper.on('click', function (e) {
    //   if (e.target.id) {
    //     console.log('点击链接')
    //     switch(e.target.id){
    //       case '1':
    //         that.link()
    //       break;
    //       case '3':
    //         const w = window.open('about:blank');
    //         w.location.href = 'https://mp.weixin.qq.com/s/P-CbTANh5IFCWd2soRoN3g';
    //       break;
    //       case '4':
    //         const s = window.open('about:blank');
    //         s.location.href = 'https://mp.weixin.qq.com/s/0N65ro-bhrjiG4CgcDOSVQ';
    //       break;
    //     }
    //   }
    // });
  }
  componentDidMount () {
    const that = this;
    this.users();
    




    // 查看微信登录接口
    const { location, params } = this.props;
    if (location.search) {
      this.wxlogin(getSearchObj(location))
    }
    this.getPictures();
  }

  // wxlogin function
  wxlogin = (params) => {
    const { dispatch } = this.props;
    getRefreshToken({refresh_token: params.token}).then( token => {
      console.log(token, '*****')
      if (token && !token.code) {
        dispatch(saveUserInfo(token))
        getProfile().then(data => {
          if (data && !data.code) {
            dispatch(routerRedux.replace('/main/hot'))
            dispatch({type: 'example/sets', payload: {...data}})
          } else {
            dispatch(routerRedux.replace('/main/hot'))
          }
        })

      }else{
        dispatch(routerRedux.replace('/main/hot'))
      }
    }).catch(err => {
      console.log(err)
    }) 
  }

  componentWillUnmount() {
    if (this.mySwiper) {
      this.mySwiper.destroy()
    }
  }
  link = () => {

    const { example: {id}, dispatch } = this.props
    if (id) {
      dispatch(routerRedux.push('/upload'))
    } else {
      dispatch(routerRedux.push('/login'))
    }
  }
  handleImage = (item) => {
    console.log(item)
    const w = window.open('about:blank');
    w.location.href = item.link;
  }
  render () {
    const { userList, picturesList } = this.state
    const { location, dispatch } = this.props
    return (
      <MainLayout location={location}>
        <div className={cx(l.head)}>
          <div className='main_container lun'>
           {/* <Carousel autoplay autoplaySpeed={8000} speed={1000}>
              <div className={cx(l.bgs, l.lun1)}><a onClick={this.link}>1</a></div>
              <div className={cx(l.bgs, l.lun2)}><a>2</a></div>
              <div className={cx(l.bgs, l.lun3)}><a target="blank" href="https://mp.weixin.qq.com/s/P-CbTANh5IFCWd2soRoN3g">3</a></div>
            </Carousel>
          */}
          {/*<div className={cx("swiper-slide", l.lun4)} id='4'></div>
            <div className={cx("swiper-slide", l.lun1)} id='1'></div>
            <div className={cx("swiper-slide", l.lun2)} id='2'></div>
            <div className={cx("swiper-slide", l.lun3)} id='3'></div>*/}
            <div className={cx(l.newSlider)}>
             
                <div className="swiper-container" ref="lun">
                  { picturesList.length > 0 ? <div className="swiper-wrapper">
                      {
                        picturesList.map( (item, index) => {
                          return <div key={index} className={cx("swiper-slide")} style={{backgroundImage: `url(${item.image})`}} id={`${index}`}>
                            
                            <div onClick={this.handleImage.bind(null, item)} className={cx(l.swiperShadow)}>
                              <h2>{item.title}</h2>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        })
                      }
                  </div> : null
                  }
                  { picturesList.length > 0 ? <div className="swiper-pagination"></div> : null }
                  { picturesList.length > 0 ? <div className={cx("swiper-button-prev", 'myself-icon', l.prev)}>&#xe636;</div> : null }
                  { picturesList.length > 0 ? <div className={cx("swiper-button-next", 'myself-icon', l.next)}>&#xe6dc;</div> : null }
                </div>
               
            </div>
            <Row className={cx(l.hotBox)}>
              <Col span={12} className={cx(l.l_hot)}>热门作者</Col>
              <Col span={12} className={cx(l.r_hot)}><Link to='/main/author'>查看总榜</Link></Col>
            </Row>
            <div className={cx(l.gutterBox)}>
              {
                userList.map((item, index) => {
                  return (
                    <div className={cx(l.gutter_row, l[index !== 4 ? 'mar' : ''])} key={index}>
                      <Cell keys={index + 1} dispatch={dispatch} data={item} />
                    </div>
                  )
                })
              }
            </div>
            <div className={cx(l.tabLink)}>
              <Link to='/main/hot' className={cx(l[location.pathname === '/main/hot' ? 'ac' : null])}>热门作品</Link>
              <Link to='/main/view' className={cx(l[location.pathname === '/main/total' ? 'ac' : null])}>查看总榜</Link>
              {/*<a href='#/' className={cx(l[location.pathname === '/' ? 'ac' : null])}>热门作品</a>
              <a href='#/main/view' className={cx(l[location.pathname === '/main/total' ? 'ac' : null])}>查看总榜</a>*/}
            </div>
          </div>
        </div>
        <div style={{minHeight: '600px'}}>
          <Switch>
            <Route path='/main/hot' component={HotWorks} />
            <Route path='/main/total' component={TotalWorks} />
           {/* <Route path='/' component={HotWorks} />*/}
          </Switch>
        </div>

      </MainLayout>
    )
  }
}

const mapState = state => {
  const { example } = state
  return {
    example
  }
}
export default connect(mapState)(IndexPage)
