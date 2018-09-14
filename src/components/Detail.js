import React from 'react'
import { connect } from 'dva'
import MainLayout from './MainLayout/MainLayout'
import moment from 'moment'
import cx from 'classnames'
import l from './Detail.less'
import pathToRegexp from 'path-to-regexp'
import { getProductsOfDetail, givePraise, getUsersOfDetail,
getCommentsList,
addFirComments, // 添加评论
addSonComments, // 获取子评论
getSonComments // add子评论
} from '../services/common'
import { getSearchObj, HOST } from '../utils/common'
import { Icon, Button, Input, notification, Carousel, Modal } from 'antd'
import { deepClone } from '../utils/common'
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group'
import { UnmountClosed} from 'react-collapse'
const { TextArea } = Input

const width = 140
class Detail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {name: '投票阶段', num: '1000/5000', status: '完成'},
        {name: 'mou'},
        {name: '众筹阶段', num: '1000/5000', status: '80%'},
        {name: 'mou'},
        {name: '生产优化', num: '众筹完成一周内', status: '0%'},
        {name: 'mou'},
        {name: '生产中', num: '优化完成2周内生产完成', status: '0%'}
      ],
      id: undefined,
      commentsValue: undefined,
      sonsValue: undefined,
      detailObj: {},
      comments: [],
      star: true,
      starClass: true,
      vote: true,
      more: false,
      authId: null,
      authMes: {},
      authors: {},

      comments: [],
      commentsId: {},
      commentsCount: 0,
      limit: 5
    }
  }
  getAuthMes = async() => {
    const { authId } = this.state
    try {
      const result = await getUsersOfDetail(authId)
      if (result && !result.code) {
        this.setState({
          authMes: result
        })
      } else {
      }
    } catch (err) {
      console.log(err)
    }
  }
  getDetail = async() => {
    const { authors } = this.props
    const { id } = this.state
    try {
      const result = await getProductsOfDetail(id)
      if (result && !result.code) {
        this.setState({
          detailObj: result,
          authId: result.author_id,
        }, () => {
          this.getComments()
          this.getAuthMes()
          this.initSwiper()
        })
      } else {
        notification.error({
          message: `获取产品详情失败！`
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  getComments = async() => {
    const { id, limit } = this.state
    const that = this
    try {
      const result = await getCommentsList(id, {limit, offset: 0})
      // setTimeout(function () {
      if (result && !result.code) {
        let arr = [];
        let commentsId = {};
        result.results.map(item => {
          item.show = false
          arr.push(item)
          commentsId[item.author_id] = 'ids'
        })
        that.setState({
          comments: arr,
          commentsCount: result.count,
          more: false,
        })
        //   commentsId
        // }, this.getCommentIdMes)
      } else {
        that.setState({
          more: false
        })
      }
      // },2000)
    } catch (err) {
      console.log(err)
    }
  }
  getCommentIdMes = async() => {
    const { commentsId, authors } = this.state;
    const copyData = deepClone(authors);
    const arr = Object.keys(commentsId);
    try{
      for(let i = 0; i< arr.length; i++) {
        const result = await getUsersOfDetail(arr[i]);
        if (!result.code) {
          copyData[result.id] = result
        }
      }
      this.setState({
        authors: copyData
      })
    }catch(err) {
      console.log(err)
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
  }
  componentDidMount () {
    const { location } = this.props
    const query = getSearchObj(location)
    if (query.id) {
      this.setState({
        id: query.id
      }, this.getDetail)
    }
  }

  // 给某个人评论
  showLeaveMes = (type, k, n) => {
    const { comments } = this.state
    const copyData = deepClone(comments)
    if (type === 'down') {
      copyData[n].show = true
    } else if (type === 'up') {
      copyData[n].show = false
    }
    this.setState({
      comments: copyData
    })
  }

  // 投票
  handleVote = (vote) => {
    const { id } = this.state
    givePraise(id).then(data => {
      if (data && !data.code) {
        this.state.detailObj.num_votes = this.state.detailObj.num_votes + 1
        this.setState({
          vote: !vote
        })
        // },this.getDetail)
      } else {
        notification.error({
          message: `${data.message}`
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  onVoteExited = () => {
    this.setState({
      vote: true
    })
  }

  // 点赞
  handleStar = (star) => {
    if (this.state.starClass) {
      this.setState({
        star: !star
      })
    }
  }
  onExited = () => {
    this.setState({
      starClass: false
    })
  }

  renderBack = (data) => {
    let temp = {}
    if (data) {
      // temp = {backgroundImage: `url(${HOST}${data})`}
      temp = {backgroundImage: `url(api/v1/file/thumbnail?size=500x400&origin=${data})`}
    }
    return temp
  }

  changeComments = (e) => {
    this.setState({
      commentsValue: e.target.value
    })
  }

  takeComment = async() => {
      // 检测是否登录了
    const { commentsValue, id } = this.state
    try {
      const result = addFirComments(id, {content: commentsValue})
      if (result && !result.code) {
        this.setState({
          commentsValue: undefined
        }, this.getComments)
      } else {

      }
    } catch (err) {
      console.log(err)
    }
  }
  showModal = () => {
    Modal.confirm({
      title: '请先登录在评论！',
      content: '是否前往登录页面？',
      okText: '是',
      cancelText: '否',
      onOk: function () {
        document.location.href = '#/login'
      }
    })
  }
  showTime = (data) => {
    let temp = ''
    if (data.create_at) {
      temp = moment().from(data.create_at)
    }
    return temp
  }

  getSons = async(id) => {
    try {
      const sons = getSonComments(id)
    } catch (err) {
      console.log(err)
    }
  }

  changeSons = (e) => {
    const value = e.target.value
    this.setState({
      sonsValue: value
    })
  }
  addSons = (k, n) => {
    const { sonsValue, id } = this.state
    addFirComments(id, {content: sonsValue, ref_id: k.id}).then(data => {
      console.log(data)
      if (data && !data.code) {
        this.setState({
          sonsValue: undefined
        }, () => {
          // this.showLeaveMes('up', k, n);
          this.getComments()
        })
      } else {

      }
    }).catch(err => {
      console.log(err)
    })
  }

  loadMore = () => {
    this.setState({
      limit: 20,
      more: true
    }, this.getComments)
  }
  render () {
    const { list, detailObj, comments, star, starClass, vote, authMes, commentsCount, commentsValue, sonsValue, limit, more, authors } = this.state
    const { location, access_token } = this.props
    const color = commentsValue ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,.5)'
    const colorSon = sonsValue ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,.5)'
    return (
      <MainLayout location={location}>
        <div className={cx('main_container')}>
          <div className={cx(l.boxes)}>
            <div style={{padding: '0 70px'}}>
              <div className={cx(l.proBox)}>
                <div style={{width: '32%'}} className={cx(l.progress)} />
              </div>
            </div>
            <div className={cx(l.con)}>
              {
                list.map((item, index) => {
                  if (item.name === 'mou') {
                    return <div key={index} className={cx(l.mou)} />
                  } else {
                    return (
                      <div style={{width: width}} className={cx(l.cell)} key={index}>
                        <i className={cx(l.dot, l[item.status === '完成' ? 'complate' : ''])}>
                          {
                            item.status === '完成' ? <Icon type='check' style={{color: '#fff', fontSize: '40px', marginTop: '10px'}} /> : <i>{item.status}</i>
                          }
                        </i>
                        <i className={cx(l.h1)}>{item.name}</i>
                        <i className={cx(l.num)}>{item.num}</i>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
          <div className={cx(l.headerBox)}>
            <div className={cx(l.left)}>
            {
              detailObj.images && detailObj.images.length && false
              ? <Carousel autoplay dots effect='fade'>
                {
                  detailObj.images.map((item, index) => {
                    return <div key={index} style={this.renderBack(item.url)} className={cx(l.bgs)}><h3>1</h3></div>
                  })
                }
              </Carousel>
              : true ? 

              <div className={cx(l.newSlider)}>
                <div className="swiper-container" ref="lun">

                  <div className="swiper-wrapper">
                      {
                        detailObj.images && detailObj.images.map( (item,index) => {
                          return(<div key={index} className={cx("swiper-slide", l.bgs)} style={this.renderBack(item.url)} id='1'>
                             <div className={cx(l.mark)}>{item.caption ? item.caption : '暂无注释'}</div>
                            </div>)
                        })
                      }
                  </div>
                  <div className="swiper-pagination"></div>

                  <div className={cx("swiper-button-prev", 'myself-icon', l.prev)}>&#xe636;</div>
                  <div className={cx("swiper-button-next", 'myself-icon', l.next)}>&#xe6dc;</div>
                </div>
              </div>
              : null
            }
            </div>
            <div className={cx(l.right)}>
              <div className={cx(l.top)}>
                <div className={cx(l.imgs)}>
                  <img src={authMes.avatar ? `${HOST}${authMes.avatar}` : '/img/touxiang.png'} alt='' />
                </div>

                <h3>{authMes.nickname ? authMes.nickname : ''} <Icon type='star' /></h3>
                <div style={{fontSize: '12px', color: '#585858', margin: '5px 0 10px'}}>简介：{authMes.info ? authMes.info : '暂无'}</div>
                <div style={{fontSize: '12px', color: '#c9c9c9'}}>创作：{authMes.num_products ? authMes.num_products : 0}</div>
                {/* <div className={cx(l.txt)} style={{fontSize: '12px', color: '#585858'}}>
                  <div className={cx(l.l_label)} style={{paddingRight: '10px'}}>上海</div>
                  <div className={cx(l.line, l.pd)}><i style={{backgroundColor: '#585858'}}></i></div>
                  <div className={cx(l.r_label)} style={{paddingLeft: '10px'}}>创库4年</div>
                </div>
                <div className={cx(l.txt)}>
                  <div className={cx(l.l_label)} style={{paddingRight: '30px'}}>创作 87</div>
                  <div className={cx(l.line, l.pd)}><i></i></div>
                  <div className={cx(l.r_label)} style={{paddingLeft: '30px'}}>粉丝 88</div>
                </div> */}
              </div>
              <div className={cx(l.btm)}>
                <h1 title={detailObj.title}>{detailObj.title ? detailObj.title : ''}</h1>
                <div className={cx(l.love)}>
                  <CSSTransition in={vote} timeout={300} classNames='star' onExited={this.onVoteExited}>
                    <Icon type='heart' className={cx(l.red)} />
                  </CSSTransition>
                  &nbsp;{detailObj.num_votes}票
                </div>
                <div>
                  <Button onClick={this.handleVote} className={cx(l.btn)} type='primary' size='large' style={{marginRight: '15px', color: '#000'}}>给他投票</Button>
                  <Button className={cx(l.btn)} disabled type='primary' size='large'>众筹产品</Button>
                </div>
              </div>
            </div>
          </div>

          <div className={cx(l.commentBox)}>
            <div className={l.ttxt}>
              <p>{detailObj.description ? detailObj.description : ''}</p>
              <p style={{textAlign: 'right', color: '#c9c9c9'}}>作品上传：{detailObj ? moment(detailObj.create_at).format('YYYY/MM/DD') : ''}</p>
            </div>
            <div className={cx(l.cons)}>
              <TextArea value={commentsValue} onChange={this.changeComments} placeholder='说点什么...' rows={4} style={{resize: 'none'}} />
              <Button disabled={!commentsValue} onClick={access_token ? this.takeComment : this.showModal} type='primary' style={{marginTop: '16px', color: color}}>评论</Button>
            </div>

            <h3 className={cx(l.total)}>全部评论： <span style={{color: '#c9c9c9'}}>{commentsCount}</span></h3>
            <ul className={cx(l.commentList)}>
              {
                comments.map((k, n) => {
                  return (
                    <li className={cx(l.list)} key={n}>
                      <div className={cx(l.avarBox)}>
                        <img src={(k.author && k.author.avatar) ? `${HOST}${k.author.avatar}` : '/img/touxiang.png'} alt='' />
                      </div>
                      <div className={cx(l.con)}>
                        <p className={cx(l.name)}>{(k.author && k.author.nickname) ? k.author.nickname : ' '} <span className={cx(l.time)}>{this.showTime(k)}</span></p>
                        <p>{k.content}</p>
                        {/* <div className={cx(l.contain)}>
                          {
                            [].map( (item,index) => {
                              return(
                                <div className={cx(l.ll)} key={index}>
                                  <h3>CHDGE</h3>
                                  <p>我也不知道改说死额了时间！</p>
                                </div>
                              )
                            })
                          }
                        </div> */}
                        <div className={cx(l.iconList)}>
                          {
                           k.show ? <Icon onClick={this.showLeaveMes.bind(null, 'up', k, n)} className={cx(l.ii)} type='up-circle' />
                           : <Icon onClick={this.showLeaveMes.bind(null, 'down', k, n)} type='message' className={cx(l.ii)} />
                          }
                          {/* <span className={cx(l.star)}>
                            <CSSTransition in={star} timeout={300} classNames="star" onExited={this.onExited.bind(null, k, n)} unmountOnExit>
                              <Icon type="like-o" className={cx(l.ii)} />
                            </CSSTransition>
                            <Icon onClick={this.handleStar.bind(null, star)} type="like-o" className={cx(l.ii, l[starClass ? 'ce' : null])} />
                          </span>
                          <span style={{padding: '0 0 0 10px'}}>10</span> */}
                        </div>

                        <UnmountClosed isOpened={k.show} >
                          <div className={cx(l.leaveMesBox)}>
                            <TextArea value={sonsValue} onChange={this.changeSons} rows={3} style={{resize: 'none'}} placeholder='请输入要回复的内容' />
                            <Button disabled={!sonsValue} onClick={this.addSons.bind(null, k, n)} type='primary' style={{marginTop: '5px', color: colorSon}}>发表评论</Button>
                          </div>
                        </UnmountClosed>
                      </div>
                    </li>
                  )
                })
              }
            </ul>

            <div className={cx(l.more)}>
              {
                comments.length < commentsCount && <a onClick={this.loadMore} href='javascript:;'>
                  { more && <Icon type='loading' />}
                  加载更多...
                </a>
              }
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }
}
const mapState = state => {
  const { example: { access_token} } = state
  // const { env: {authors} } = state
  return {
    access_token
  }
}

export default connect(mapState)(Detail)
