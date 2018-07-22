import React from 'react';
import { connect } from 'dva'
import MainLayout from './MainLayout/MainLayout';
import moment from 'moment';
import cx from 'classnames';
import l from './Detail.less';
import pathToRegexp from 'path-to-regexp'
import { getProductsOfDetail } from '../services/common'
import { getSearchObj } from '../utils/common'
import { Icon, Button, Input } from 'antd';
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
      id: undefined
    }
  }
  getDetail = async() => {
    const { id } = this.state;
    try{
      const result = await getProductsOfDetail(id);
      console.log(result, '详情')
      if (result && !result.code) {

      }else{

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
  render() {
    const { list } = this.state;
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
              <img src="/img/produce.png" alt=""/>
            </div>
            <div className={cx(l.right)}>
              <div className={cx(l.top)}>
                <img src="/img/avart1.png" alt=""/>
                <h3>SX-DHUQ <Icon type="star" /></h3>
                <div className={cx(l.txt)} style={{fontSize: '12px', color: '#585858'}}>
                  <div className={cx(l.l_label)} style={{paddingRight: '10px'}}>上海</div>
                  <div className={cx(l.line, l.pd)}><i></i></div>
                  <div className={cx(l.r_label)} style={{paddingLeft: '10px'}}>创库4年</div>
                </div>
                <div className={cx(l.txt)}>
                  <div className={cx(l.l_label)} style={{paddingRight: '30px'}}>创作 87</div>
                  <div className={cx(l.line, l.pd)}><i></i></div>
                  <div className={cx(l.r_label)} style={{paddingLeft: '30px'}}>粉丝 88</div>
                </div>
              </div>
              <div className={cx(l.btm)}>
                <h1>FERRARI 250gto</h1>
                <div className={cx(l.love)}><Icon type="heart" className={cx(l.red)} />&nbsp;+2483票</div>
                <div>
                  <Button className={cx(l.btn)} type="primary" size="large" style={{marginRight: '15px', color: '#000'}}>给他投票</Button>
                  <Button className={cx(l.btn)} disabled type="primary" size="large">众筹产品</Button>
                </div>
              </div>
            </div>
          </div>

          <div className={cx(l.commentBox)}>
            <div className={l.ttxt}>
              <p>第一次见到书本里的维京战船，就欲罢不能，心想一定要实现出来！超级喜欢船桨和风帆的结构,人偶可以手动滑动，玩家可以选择自
己喜欢的图案裁剪风帆，制作非常简单。期待我的战船系列作品！</p>
              <p style={{textAlign: 'right', color: '#c9c9c9'}}>作品上传：{moment().format('YYYY/MM/DD')}</p>
            </div>
            <div className={cx(l.cons)}>
              <TextArea placeholder="说点什么..." rows={6} style={{resize: 'none'}}/>
              <Button type="primary" style={{marginTop: '10px', color: '#000'}}>评论</Button>
            </div>

            <h3 className={cx(l.total)}>全部评论： <span style={{color: '#c9c9c9'}}>26</span></h3>
            <ul className={cx(l.commentList)}>
              {
                ['',''].map( (k,n) => {
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
                          <Icon type="message" className={cx(l.ii)} />
                          <Icon type="like-o" className={cx(l.ii)} /> 10
                        </div>
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