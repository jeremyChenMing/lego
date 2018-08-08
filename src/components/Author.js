import React from 'react';
import cx from 'classnames';
import l from './Author.less';
import { Pagination, Icon, Avatar, Row, Col, Button  } from 'antd'
import MainLayout from './MainLayout/MainLayout'
import { getUsers, getAuthOfProduce } from '../services/common'
import { HOST } from '../utils/common'
import _ from 'lodash'
class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '创客设计师'},
        {name: '创客团队'},
      ],
      active: 0,
      oldData: [],
      userList: [],
      total: 0,
      page: 1,
      pageSize: 5,
      filType: 1,
      recom: false, //推荐度  false === '从高到低'， true 与其相反
      follow: false, //关注度 ,
    }
  }
  addNum = (arr = []) => {
    let num = 0;
    arr.map( item => {
      num += item.num_votes
    })
    return num
  }
  dealData = async(arr, count) => {
    for(let i=0; i<arr.length; i++) {
      const result = await getAuthOfProduce(arr[i].id);
      arr[i].products = result;
      arr[i].follow = this.addNum(result)
    }
    this.setState({
      total: count,
      oldData: arr,
    }, this.sort)
  }
  users = async() => {
    const { page, pageSize } = this.state;
    try{
      const result = await getUsers({limit: pageSize, offset: (page - 1) * pageSize});
      if (result && !result.code) {
        this.dealData(result.results, result.count)
      }
    }catch(err) {
      console.log(err)
    }
  }
  sort = () => {
    const { oldData, filType } = this.state;
    let temp = [];
    if (filType === 1) {
      console.log('推荐创客')
      temp = _.orderBy(oldData, ['num_products'], ['desc'])
    }else{
      console.log('关注的人数')
      temp = _.orderBy(oldData, ['follow'], ['desc'])
    }
    this.setState({
      userList: temp
    })
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
    }else if (type === 'recom') {
      this.setState({
        [type]: !this.state[type]
      }) 
    }
  }

  changePage = (page, pageSize) => {
    this.setState({
      page: page
    }, this.users)
  }
  changeFilter = (type) => {
    this.setState({
      filType: type,
      page: 1
    }, this.users)
  }
  render() {
    const { location } = this.props;
    const { nav, active, userList, follow, recom, page, total, pageSize, filType } = this.state;
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

              {/* 自定义的 */}

              <span onClick={this.changeFilter.bind(null, 1)} className={cx(l.filterCell,l[filType === 1 ? 'acFil' : null])}>推荐创客</span>&nbsp;&nbsp;
              <span onClick={this.changeFilter.bind(null, 2)}className={cx(l.filterCell,l[filType === 2 ? 'acFil' : null])}>关注人数</span>

              {/*<span className={cx(l.fil)} onClick={this.filter.bind(null, 'recom')}>
                推荐创客 
                <span className={cx(l.followIcon, l[recom ? 'activeIcon' : null])}>
                  <Icon type="down"  />
                </span>
              </span>
              <span className={cx(l.fil)}>不限城市 {true ? <Icon type="down" /> : <Icon type="up" />}</span>*/}
            </Col>
            {/*<Col span={12} className={cx(l.right)}>
              <span>排序：</span>&nbsp;&nbsp;
              <span onClick={this.filter.bind(null, 'follow')} className={cx(l.fil)}>
                关注人数 
                <span className={cx(l.followIcon, l[follow ? 'activeIcon' : null])}>
                  <Icon type="down"  />
                </span>
              </span>
            </Col>*/}
          </Row>
        </div>
        
        <div className={cx('main_container')}>
          <ul className={cx(l.cellList)}>
          {
            userList.map( (item,index) => {
              return <li key={index} className={cx(l[index !== userList.length - 1 ? 'border' : null])}>
                <Cell list={item} />
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
  }

  linkPerson = (id) => {
    document.location.href = `#/person/${id}`
  }
  render() {
    const { list } = this.props;
    const yes = {color: '#000'};
    const no = {color: '#000'};
    return (
      <div className={cx(l.cellBoxes)}>
        <div span={8} className={cx(l.left)}>
          <div><img onClick={this.linkPerson.bind(null, list.id)} src={list.avatar ? `${HOST}${list.avatar}` : "/img/touxiang.png"} alt=""/></div>
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
            (list.products || []).map( (item,index) => {
              const url = item.images[0] ? {backgroundImage: `url(${HOST}${item.images[0].url})`} : {};
              if (index < 4) {
                return(
                  <a href={`#/main/detail?id=${item.id}`} key={index} style={url} className={cx(l.linkImg)}></a>
                ) 
              }
            })
          }
          {
            list.products.length >= 4 && <a href={`#/person/${list.id}`} className={cx(l.more)}><i></i></a>
          }
        </div>
      </div>
    );
  }
}



export default Author
