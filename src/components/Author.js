import React from 'react';
import cx from 'classnames';
import l from './Author.less';
import { Pagination, Icon, Avatar, Row, Col, Button  } from 'antd'
import MainLayout from './MainLayout/MainLayout'
import { getUsers, getAuthOfProduce } from '../services/common'

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '创客设计师'},
        {name: '创客团队'},
      ],
      active: 0,
      userList: [],
      follow: false,
      total: 0,
      page: 1,
      pageSize: 5,
    }
  }
  users = async() => {
    const { page, pageSize } = this.state;
    try{
      const result = await getUsers({limit: pageSize, offset: (page - 1) * pageSize});
      console.log(result)
      if (result && !result.code) {
        this.setState({
          total: result.count,
          userList: result.results
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


  filter = (type) => {
    if (type === 'follow') {
      this.setState({
        follow: !this.state.follow
      })
    }
  }

  changePage = (page, pageSize) => {
    this.setState({
      page: page
    }, this.users)
  }
  render() {
    const { location } = this.props;
    const { nav, active, userList, follow, page, total, pageSize } = this.state;
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
              <span onClick={this.filter.bind(null, 'follow')} className={cx(l.fil)}>
                关注人数 
                <span className={cx(l.followIcon, l[follow ? 'activeIcon' : null])}>
                  <Icon type="down"  />
                </span>
              </span>
            </Col>
          </Row>
        </div>
        
        <div className={cx('main_container')}>
          <ul className={cx(l.cellList)}>
          {/*  */
            userList.map( (item,index) => {
              return <li key={index} className={cx(l[index !== userList.length - 1 ? 'border' : null])}>
                <Cell list={item}/>
              </li>
            })
          }
          </ul>
          <div className={cx(l.pageBox, 'pageBox')}>
            <Pagination current={page} total={total} pageSize={pageSize} onChange={this.changePage}/>
          </div>
        </div>
      </MainLayout>
    );
  }
}
class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produce: []
    }
  }

  getsProduce = async(id) => {
    try{
      const result = await getAuthOfProduce(id);
      if (result && !result.code) {
        this.setState({
          produce: result
        })
      }
    }catch(err) {

    }
  }
  componentDidMount() {
    const { list } = this.props;
    if (list.id) {
      this.getsProduce(list.id)
    }
  }
  render() {
    const { list } = this.props;
    const { produce } = this.state;
    const yes = {color: '#000'};
    const no = {color: '#000'};
    console.log(produce.length)
    return (
      <div className={cx(l.cellBoxes)}>
        <div span={8} className={cx(l.left)}>
          <div><img src={list.avatar ? list.avatar : "/img/avart1.png"} alt=""/></div>
          <div className={cx(l.cons)}>
            <h2>{list.nickname} <Icon type="star" /></h2>
            <p>简介：{list.intro ? list.intro : '暂无'}</p>
            <p style={{fontSize: '16px', color: '#282828', marginBottom: '5px'}}>创作 {list.num_products ? list.num_products : 0} {/*&nbsp;&nbsp;|&nbsp;&nbsp; 关注 29937*/}</p>
            <p style={{marginBottom: '0px'}}>{list.intro ? list.intro : '暂无'}</p>
            {/*<Button size="large" className={cx(l.btn)} type="primary" style={true ? yes : no}>关注</Button>*/}
            <div style={{height: '32px'}}></div>
          </div>
        </div>
        <div span={16} className={cx(l.right)}>
          {
            produce.map( (item,index) => {
              const url = item.images[0] ? {backgroundImage: `url(${item.images[0].url})`} : {};
              if (index < 4) {
                return(
                  <a href={`#/main/detail?id=${item.id}`} key={index} style={url} className={cx(l.linkImg)}></a>
                ) 
              }
            })
          }
          {
            produce.length >= 4 && <a href="javascript:;" className={cx(l.more)}><i></i></a>
          }
        </div>
      </div>
    );
  }
}



export default Author
