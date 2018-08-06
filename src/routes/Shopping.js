import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva'
import cx from 'classnames';
import l from './Shopping.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { Pagination, Icon, Avatar, Button } from 'antd'

const dutArr = (num) => {
  let temp = [];
  for(let n=0; n < num; n++){
    temp.push(n + 1)
  }
  return temp;
}

class Shopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['','','','',''],
      nav: [
        {name: '最新商品'},
        {name: '销量优先'},
        {name: '价格优先'},
      ],
      active: 0,
    }
  }

  link = (index) => {
    this.setState({
      active: index
    })
  }

  render() {
    const { location } = this.props;
    const { list, nav, active } = this.state
    return (
      <MainLayout location={location}>
        <div className={cx(l.imges)}>
          <ul className={cx(l.img, 'main_container')} >
            {
              list.map( (item,index) => {
                return(
                  <li key={index}></li>
                )
              })
            }
          </ul>
          <div className={cx(l.navs)}>
            {
              nav.map( (item,index) => {
                return <span onClick={this.link.bind(null, index)} className={cx(l.menuItems, l[ active === index ? 'active' : null])} key={index}>{item.name}</span> 
              })
            }
          </div>
        </div>
        <div className={cx('main_container')}>
          <div className={cx(l.hots)}>
            {
              dutArr(2).map( (item,index) => {
                return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                  <Model keys={index + 1}/>
                </div>
                
              })
            }
          </div>
          <div className={cx(l['pageBox'])}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </MainLayout>
    );
  }
}

class Model extends React.Component {
  constructor(props) {
    super(props);
  }
  link = (id, type) => {
    // document.location.href = `#/main/detail?id=${id}&type=${type}`
  }
  render() {
    return (
      <div onClick={this.link.bind(null, '888', 'hot')} className={cx(l.modelBox)}>
        <div className={cx(l.imgs)}>
          <a className={cx(l.buys)}>
            <i>69</i>
            <i>9折</i>
          </a>
        </div>
        <div className={cx(l.con)}>
          <h4>设计大师</h4>
          <p>拼装 - 汽车类型</p>
          <div className={cx(l.btnBox)}>
            <Button type="primary" style={{color: '#000'}} size="large" className={cx(l.btns)}>点击购买</Button>
          </div>
        </div>
      </div>
    );
  }
}



class ShoppingExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iFrameHeight: `calc(100vh - 55px)`
    }
  }

  render() {
    const { location } = this.props;
    return (
      <MainLayout location={location}>
        <div  className={cx('main_container', l.box)}>
          <iframe 
            style={{width:'100%', minHeight: this.state.iFrameHeight, overflow:'visible'}}
            id="iframes"
            width="100%" 
            height={this.state.iFrameHeight}
            frameBorder="0"
            src="https://h5.youzan.com/v2/feature/84fz4fxg?ps=760"
            >
          </iframe>
        </div>
      </MainLayout>
    );
  }
}



export default ShoppingExample
