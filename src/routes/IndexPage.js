import React from 'react'
import { connect } from 'dva'
import cx from 'classnames';
import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { Router, Route, Switch, BrowserRouter, HashRouter, Redirect } from 'dva/router'
import HotWorks from '../components/HotWorks'
import TotalWorks from '../components/TotalWorks'
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { getUsers, getProfile } from '../services/common'
import { Button, Layout, Carousel, Row, Col, Icon, message } from 'antd'
const { Content, Footer } = Layout;


class Cell extends React.Component {
  constructor(props) {
    super(props);
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
    const { dispatch, data } = this.props;
    console.log(data)
    dispatch(routerRedux.replace(`/person/${data.id}`))
  }
  render() {
    const { keys = 1, data } = this.props;
    return (
      <div className={cx(l.cellBox)} style={{backgroundImage: 'url("/img/avart1.png")'}}>
        <img onClick={this.link} className={cx(l.avart)} src="/img/avart1.png" alt="头像"/>
        <p>
          <span className={cx(l.name)}>响亮的名字 <Icon type="star" /></span>
        </p>
        <div className={cx(l.txt)}>
          <div className={cx(l.l_label)}>北京</div>
          <div className={cx(l.line)}><i></i></div>
          <div className={cx(l.r_label)}>创客2年</div>
        </div>
        <div className={cx(l.txt)}>
          <div className={cx(l.l_label)} style={{paddingRight: '30px'}}>创作 87</div>
          <div className={cx(l.line, l.pd)}><i></i></div>
          <div className={cx(l.r_label)} style={{paddingLeft: '30px'}}>粉丝 88</div>
        </div>
        <Button 
          onClick={this.handle.bind(null, this.state.type)} 
          type={this.state.type} 
          className={cx(l.btn, l[this.state.type ? '' : 'grays'])}
        >
          {this.state.type ? '关注ta' : '取消关注'}
        </Button>
      </div>
    );
  }
}



class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    }
  }
  
  profile = async() => {
    try{
      const result = await getProfile();
      console.log(result, 'user/profile')
      if (result && !result.code) {

      }
    }catch(err) {
      console.log(err)
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
    this.users();
  }
  render() {
    const { userList } = this.state;
    const { location, dispatch } = this.props;
    return (
      <MainLayout location={location}>
        <div className={cx(l.head)}>
          <div className="main_container">
            <Carousel autoplay={true}>
              <div className={cx(l.bgs)}><h3>1</h3></div>
              <div className={cx(l.bgs)}><h3>2</h3></div>
              <div className={cx(l.bgs)}><h3>3</h3></div>
              <div className={cx(l.bgs)}><h3>4</h3></div>
            </Carousel>
            <Row className={cx(l.hotBox)}>
              <Col span={12} className={cx(l.l_hot)}>热门作者</Col>
              <Col span={12} className={cx(l.r_hot)}><a href="#/main/author">查看总榜</a></Col>
            </Row>

            <div className={cx(l.gutterBox)}>
              {
                userList.map( (item, index) => {
                  return(
                    <div className={cx(l.gutter_row, l[index !== 4 ? 'mar' : ''])} key={index}>
                      <Cell keys={index + 1} dispatch={dispatch} data={item}/>
                    </div>
                  )
                })
              }
            </div>


            <div className={cx(l.tabLink)}>
              <a href="#/main/hot" className={cx(l[location.pathname === "/main/hot" ? 'ac' : null])}>热门作品</a>
              <a href="#/main/total" className={cx(l[location.pathname === "/main/total" ? 'ac' : null])}>查看总榜</a>
            </div>
          </div>
        </div>
        <div style={{minHeight: '600px'}}>
          <Switch>
            <Route path='/main/hot'  component={HotWorks} list={['']} />
            <Route path='/main/total'  component={TotalWorks} />
          </Switch> 
        </div>
        
      </MainLayout>
    );
  }
}



export default connect()(IndexPage)
