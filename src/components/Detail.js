import React from 'react';
import { connect } from 'dva'
import MainLayout from './MainLayout/MainLayout';
import moment from 'moment';
import cx from 'classnames';
import l from './Detail.less';
import pathToRegexp from 'path-to-regexp'
import { getProductsOfDetail, givePraise, getUsersOfDetail } from '../services/common'
import { getSearchObj } from '../utils/common'
import { Icon, Button, Input, notification, Carousel } from 'antd';
import { deepClone } from '../utils/common'
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { UnmountClosed} from 'react-collapse';
const { TextArea } = Input;

const width = 140;
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {name: '投票阶段', num: '1000/5000', status: '完成'},
        {name: '众筹阶段', num: '1000/5000', status: '80%'},
        {name: '生产优化', num: '众筹完成一周内', status: '0%'},
        {name: '生产中', num: '优化完成2周内生产完成', status: '0%'},
      ],
      id: undefined,
      detailObj: {},
      commons: [
        {show: false},
        {show: false},
        {show: false},
      ],
      star: true,
      starClass: true,
      vote: true,
      authId: null,
      authMes: {}
    }
  }
  getAuthMes = async() => {
    const { authId } = this.state;
    try{
      const result = await getUsersOfDetail(authId);
      if (result && !result.code) {
        this.setState({
          authMes: result
        })
      }else{

      }
    }catch(err) {
      console.log(err)
    }
  }
  getDetail = async() => {
    const { id } = this.state;
    try{
      const result = await getProductsOfDetail(id);
      if (result && !result.code) {
        this.setState({
          detailObj: result,
          authId: result.author_id
        }, this.getAuthMes)
      }else{
        notification.error({
          message: `获取产品详情失败！`
        })
      }
    }catch(err) {
      console.log(err)
    }
  }
  componentDidMount() {
    const { location } = this.props;
    const query = getSearchObj(location);
    if (query.id) {
      this.setState({
        id: query.id
      }, this.getDetail)
    }
  }




  // 给某个人评论
  showLeaveMes = (type, k, n) => {
    const { commons } = this.state;
    const copyData = deepClone(commons)
    if (type === 'down') {
      copyData[n].show = true
    }else if (type === 'up') {
      copyData[n].show = false
    }
    this.setState({
      commons: copyData
    })
  }


  // 投票
  handleVote = (vote) => {
    const { id } = this.state;
    givePraise(id).then( data => {
      if (data && !data.code) {
        this.state.detailObj.num_votes = this.state.detailObj.num_votes + 1
        this.setState({
          vote: !vote
        })
        // },this.getDetail)


      }else{

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
    let temp = {};
    if (data) {
      temp = {backgroundImage: `url(${data})`}
    }
    return temp;
  }
  render() {
    const { list, detailObj, commons, star, starClass, vote, authMes } = this.state;
    const { location } = this.props;
    return (
      <MainLayout location={location}>
        <div className={cx('main_container')}>
          <div className={cx(l.boxes)}>
            <div style={{padding: `0 ${width / 2}px`}}><div className={cx(l.proBox)}><div style={{width: '35%'}} className={cx(l.progress)}></div></div></div>
            <div className={cx(l.con)}>
              {
                list.map( (item,index) => {
                  return(
                    <div style={{width: width}} className={cx(l.cell, l[index !==0 ? 'mar' : ''])} key={index}>
                        <i className={cx(l.dot, l[item.status === '完成' ? 'complate' : ''])}>
                          {
                            item.status === '完成' ? <Icon type="check" style={{color: '#fff', fontSize: '40px', marginTop: '10px'}} /> : <i>{item.status}</i>
                          }
                        </i>
                        <i className={cx(l.h1)}>{item.name}</i>
                        <i className={cx(l.num)}>{item.num}</i>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className={cx(l.headerBox)}>
            <div className={cx(l.left)}>
            {
              detailObj.images && detailObj.images.length ?
              <Carousel autoplay={true} dots={true} effect="fade">
                {
                  detailObj.images.map( (item,index) => {
                    return <div key={index} style={this.renderBack(item.url)} className={cx(l.bgs)}><h3>1</h3></div>
                  })
                }
              </Carousel>
              : null
            }
            </div>
            <div className={cx(l.right)}>
              <div className={cx(l.top)}>
                <div className={cx(l.imgs)}>
                  <img src={authMes.avatar ? authMes.avatar : "/img/avart1.png"} alt=""/>
                </div>
                
                <h3>{authMes.nickname ? authMes.nickname : ''} <Icon type="star" /></h3>
                <div style={{fontSize: '12px', color: '#585858', margin: '5px 0 10px'}}>简介：{authMes.info ? authMes.info : '暂无'}</div>
                <div style={{fontSize: '12px', color: '#c9c9c9'}}>创作：{authMes.num_products ? authMes.num_products : 0}</div>
                {/*<div className={cx(l.txt)} style={{fontSize: '12px', color: '#585858'}}>
                  <div className={cx(l.l_label)} style={{paddingRight: '10px'}}>上海</div>
                  <div className={cx(l.line, l.pd)}><i style={{backgroundColor: '#585858'}}></i></div>
                  <div className={cx(l.r_label)} style={{paddingLeft: '10px'}}>创库4年</div>
                </div>
                <div className={cx(l.txt)}>
                  <div className={cx(l.l_label)} style={{paddingRight: '30px'}}>创作 87</div>
                  <div className={cx(l.line, l.pd)}><i></i></div>
                  <div className={cx(l.r_label)} style={{paddingLeft: '30px'}}>粉丝 88</div>
                </div>*/}
              </div>
              <div className={cx(l.btm)}>
                <h1>{detailObj.title ? detailObj.title : ''}</h1>
                <div className={cx(l.love)}>
                  <CSSTransition in={vote} timeout={300} classNames="star" onExited={this.onVoteExited}>
                    <Icon type="heart" className={cx(l.red)} />
                  </CSSTransition>
                  
                  &nbsp;{detailObj.num_votes}票
                </div>
                <div>
                  <Button onClick={this.handleVote} className={cx(l.btn)} type="primary" size="large" style={{marginRight: '15px', color: '#000'}}>给他投票</Button>
                  <Button className={cx(l.btn)} disabled type="primary" size="large">众筹产品</Button>
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
              <TextArea placeholder="说点什么..." rows={4} style={{resize: 'none'}}/>
              <Button type="primary" style={{marginTop: '16px', color: '#000'}}>评论</Button>
            </div>

            <h3 className={cx(l.total)}>全部评论： <span style={{color: '#c9c9c9'}}>26</span></h3>
            <ul className={cx(l.commentList)}>
              {
                commons.map( (k,n) => {
                  return(
                    <li className={cx(l.list)} key={n}>
                      <div className={cx(l.avarBox)}>
                        <img src="/img/avart1.png" alt=""/>
                      </div>
                      <div className={cx(l.con)}>
                        <p className={cx(l.name)}>CERAS <span className={cx(l.time)}>16天前</span></p>
                        <p>评论什么呢写啥啊不知道写啥......</p>
                        <div className={cx(l.contain)}>
                          {
                            [''].map( (item,index) => {
                              return(
                                <div className={cx(l.ll)} key={index}>
                                  <h3>CHDGE</h3>
                                  <p>我也不知道改说死额了时间！</p>
                                </div>
                              )
                            })
                          }
                        </div>
                        <div className={cx(l.iconList)}>
                          
                          {
                           k.show ? <Icon onClick={this.showLeaveMes.bind(null, 'up', k, n)} className={cx(l.ii)} type="up-circle" />
                           :
                           <Icon onClick={this.showLeaveMes.bind(null, 'down', k, n)} type="message" className={cx(l.ii)} />
                          }
                          <span className={cx(l.star)}>
                            <CSSTransition in={star} timeout={300} classNames="star" onExited={this.onExited.bind(null, k, n)} unmountOnExit>
                              <Icon type="like-o" className={cx(l.ii)} />
                            </CSSTransition>
                            <Icon onClick={this.handleStar.bind(null, star)} type="like-o" className={cx(l.ii, l[starClass ? 'ce' : null])} />
                          </span>
                          <span style={{padding: '0 0 0 10px'}}>10</span>
                        </div>
                        
                          <UnmountClosed isOpened={k.show}  >
                            <div className={cx(l.leaveMesBox)}>
                              <TextArea rows={3} style={{resize: 'none'}} placeholder="请输入要回复的内容" />
                              <Button type="primary" style={{marginTop: '5px', color: '#000'}}>发表评论</Button>
                            </div> 
                          </UnmountClosed>
                          
                        
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <div className={cx(l.more)}>
              <a  href="javascript:;">加载更多</a>
            </div>
            
          </div>
        </div>
      </MainLayout>
    );
  }
}


export default Detail