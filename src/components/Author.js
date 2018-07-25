import React from 'react';
import cx from 'classnames';
import l from './Author.less';
import { Pagination, Icon, Avatar, Row, Col, Button  } from 'antd'
import MainLayout from './MainLayout/MainLayout'
import { getUsers } from '../services/common'

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '创客设计师'},
        {name: '创客团队'},
      ],
      active: 0,
      userList: []
    }
  }
  users = async() => {
    try{
      const result = await getUsers();
      console.log(result)
      if (result && !result.code) {
        this.setState({
          userList: result
        })
      }
    }catch(err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.users()
  }


  link = (index) => {
    this.setState({
      active: index
    })
  }
  render() {
    const { location } = this.props;
    const { nav, active, userList } = this.state;
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
          {/*  */
            userList.map( (item,index) => {
              return <li key={index} className={cx(l[index !== userList.length - 1 ? 'border' : null])}>
                <Cell />
              </li>
            })
          }
          </ul>
          <div className={cx(l.pageBox, 'pageBox')}>
            <Pagination defaultCurrent={1} total={1} />
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
    const { data = ['','','',''] } = this.props;
    const yes = {color: '#000'};
    const no = {color: '#000'};
    return (
      <div className={cx(l.cellBoxes)}>
        <div span={8} className={cx(l.left)}>
          <div><img src="/img/avart1.png" alt=""/></div>
          <div className={cx(l.cons)}>
            <h2>KDJEWL <Icon type="star" /></h2>
            <p>背景 | 自由职业</p>
            <p style={{fontSize: '16px', color: '#282828', marginBottom: '5px'}}>创作 65 &nbsp;&nbsp;|&nbsp;&nbsp; 关注 29937</p>
            <p style={{marginBottom: '0px'}}>这里写的是简介。。。。。</p>
            <Button size="large" className={cx(l.btn)} type="primary" style={true ? yes : no}>关注</Button>
          </div>
        </div>
        <div span={16} className={cx(l.right)}>
          {
            data.map( (item,index) => {
              return(
                <a href="javascript:;" key={index} className={cx(l.linkImg)}></a>
              )
            })
          }
          {
            data.length >= 4 && <a href="javascript:;" className={cx(l.more)}><i></i></a>
          }
        </div>
      </div>
    );
  }
}



export default Author
