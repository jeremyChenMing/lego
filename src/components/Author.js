import React from 'react';
import cx from 'classnames';
import l from './Author.less';
import { Pagination, Icon, Avatar, Row, Col, Button  } from 'antd'
import MainLayout from './MainLayout/MainLayout'

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '创客设计师'},
        {name: '创客团队'},
      ],
      active: 0
    }
  }

  componentDidMount() {

  }


  link = (index) => {
    this.setState({
      active: index
    })
  }
  render() {
    const { location } = this.props;
    const { nav, active } = this.state;
    return (
      <MainLayout location={location}>
        <div className={cx(l.navs)}>
          {
            nav.map( (item,index) => {
              return <span onClick={this.link.bind(null, index)} className={cx(l.menuItems, l[ active === index ? 'active' : null])} key={index}>{item.name}</span> 
            })
          }
        </div>
        <div className={cx(l.filterBox)}>
          <Row className={cx('main_container')}>
            <Col span={12} className={cx(l.left)}>
              <span>筛选：</span>&nbsp;&nbsp;
              <span className={cx(l.fil)}>推荐创客 {true ? <Icon type="down" /> : <Icon type="up" />}</span>
              <span className={cx(l.fil)}>不限城市 {true ? <Icon type="down" /> : <Icon type="up" />}</span>
            </Col>
            <Col span={12} className={cx(l.right)}>
              <span>排序：</span>&nbsp;&nbsp;
              <span className={cx(l.fil)}>关注人数 {true ? <Icon type="down" /> : <Icon type="up" />}</span>
            </Col>
          </Row>
        </div>
        
        <div className={cx('main_container')}>
          <ul className={cx(l.cellList)}>
            <li><Cell /></li>
            <li><Cell /></li>
            <li><Cell /></li>
            <li><Cell /></li>
            <li><Cell /></li>
          </ul>
          <div className={cx(l.pageBox, 'pageBox')}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </MainLayout>
    );
  }
}
class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const yes = {color: '#000'};
    const no = {color: '#000'};
    return (
      <Row className={cx(l.cellBoxes)}>
        <Col span={8} className={cx(l.left)}>
          <div><img src="/img/avart1.png" alt=""/></div>
          <div className={cx(l.cons)}>
            <h2>KDJEWL <Icon type="star" /></h2>
            <p>背景 | 自由职业</p>
            <p style={{fontSize: '18px', color: '#000'}}>创作 65 &nbsp;&nbsp;|&nbsp;&nbsp; 关注 29937</p>
            <p>这里写的是简介。。。。。</p>
            <Button size="large" className={cx(l.btn)} type="primary" style={true ? yes : no}>关注</Button>
          </div>
        </Col>
        <Col span={16} className={cx(l.right)}>
          {
            ['','','',''].map( (item,index) => {
              return(
                <a href="javascript:;" key={index} className={cx(l.linkImg)}></a>
              )
            })
          }
          <a href="javascript:;" className={cx(l.more)}><i></i></a>
        </Col>
      </Row>
    );
  }
}



export default Author
