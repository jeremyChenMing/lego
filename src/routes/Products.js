import React from 'react';
import cx from 'classnames'
import l from './Products.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { Router, Route, Switch, Redirect } from 'dva/router'

import { Pagination, Icon, Avatar } from 'antd'



class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '热门'},
        {name: '最新'},
        {name: '综合'}
      ],
      active: 0,
      list: [{},{}]
    }
  }

  link = (index, type) => {
    const { produce, active } = this.state
    this.setState({
      active: index,
      order: type,
      page: 1
    })
    // }, this.getList)
  }
  render() {
    const { nav, active, list } = this.state;
    const type = ['hot', 'time', 'auto']
    return (
      <div>
        <div className={cx(l.navs)}>
          {
            nav.map((item, index) => {
              const ese = type[index]
              return <span onClick={this.link.bind(null, index, ese)} className={cx(l.menuItems, l[ active === index ? 'active' : null])} key={index}>{item.name}</span>
            })
          }
        </div>

        <ul className={cx(l.content, 'main_container')}>
          {
            list.map( (item, index) => {
              return(
                <li key={index} className={cx(l.cell)}>
                  <div className={cx(l.left)}></div>
                  <div className={cx(l.right)}>
                    <div className={cx(l.top)}>
                      <h3>2018001 | 维京人战船</h3>
                      <div className={cx(l.peo)}>
                        <span style={{color: '#ccc', paddingRight: '20px'}}>作者：AI、白</span>
                        <Avatar style={{verticalAlign: 'middle'}} size='large' icon='user'/>
                      </div>
                    </div>

                    <div className={cx(l.mid)}>
                      简介：第一次见到书本里的维京战船，就欲罢不能，心想一定要实现出来！超级喜欢船桨和风帆的结构,人偶可以手动滑动，玩家可以选择自己喜欢的图案裁剪风帆，制作非常简单。期待我的战船系列作品！
                    </div>
                    <div className={cx(l.bottom)}>
                      <span>销量：<i>11920</i></span>
                      <span>玩家收益：<i>¥ 9939</i></span>
                    </div>
                  </div>
                  <a href="javascript:;" className={cx(l.check)}>查看详情</a>
                </li>
              )
            })
          }
        </ul>

      </div>
    );
  }
}



class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    return (
      <MainLayout location={location}>
        <Switch>
          <Route path='/product' component={List} />
          <Route path='/product/:id' component={List} />
        </Switch>
      </MainLayout>
    );
  }
}

export default Products;
