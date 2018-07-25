import React from 'react';
import { connect } from 'dva'
import cx from 'classnames';
import l from './Person.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { getUsersOfDetail, getAuthOfProduce } from '../services/common'
import { Model } from '../components/HotWorks'
import { Pagination } from 'antd'
const dutArr = (num) => {
  let temp = [];
  for(let n=0; n < num; n++){
    temp.push(n + 1)
  }
  return temp;
}
class PersonProduce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produce: [],
    }
  }
  getProducts = async(id) => {
    try{
      const result = await getAuthOfProduce(id);
      console.log(result, '个人详情---作品')
      if (result && !result.code) {
        this.setState({
          produce: result
        })
      }else{

      }
    }catch(err) {
      console.log(err)
    }
  }
  componentDidMount() {
    console.log(this.props)
    if (this.props.id) {
      this.getProducts(this.props.id)
    }
  }
  componentWillReceiveProps(nextProps) {
    const { id } = nextProps
    if (nextProps.id !== this.props.id && nextProps.id) {
      this.getProducts(nextProps.id)
    }
  }
  render() {
    const { data } = this.props;
    const { produce } = this.state;
    const source = {};
    return (
      <div>
        <div className={cx(l.hots)}>
          {
            produce.map( (item,index) => {
              return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                <Model keys={index + 1} data={item}/>
              </div>
            })
          }
        </div>
        <div className={cx(l.pageBox, 'pageBox')}>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    );
  }
}


class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      id: undefined,
      mess: {}
    }
  }
  getPersonDetail = async() => {
    const { id } = this.state;
    try{
      const result = await getUsersOfDetail(id);
      console.log(result, '个人详情')
      if (result && !result.code) {
        this.setState({
          mess: result
        })
      }else{

      }
    }catch(err) {
      console.log(err)
    }
  }
  componentDidMount() {
    const { match: {params} } = this.props;
    if (params.id) {
      this.setState({
        id: params.id
      }, this.getPersonDetail)
    }
  }

  handle = (num) => {
    console.log(num)
    this.setState({
      active: num
    })
  }
  render() {
    const { location } = this.props;
    const { active, id } = this.state;
    return (
      <MainLayout location={location}>
        <div className={cx(l.topBox)}>
          <div className={cx(l.avartBox)}>
            <img src="/img/avart1.png" alt=""/>
            <h3>阳思考</h3>
            <div className={cx(l.txt)}>
              <div className={cx(l.l_label)} style={{paddingRight: '5px'}}>创作 87</div>
              <div className={cx(l.line, l.pd)}><i></i></div>
              <div className={cx(l.r_label)} style={{paddingLeft: '5px'}}>粉丝 88</div>
            </div>
          </div>
        </div>
        <div className={cx(l.tabBox)}>
          <span onClick={this.handle.bind(null, 0)} className={cx(l.nav, l[active === 0 ? 'active' : ''])}>个人作品</span>
          <span onClick={this.handle.bind(null, 1)} className={cx(l.nav,l.mr, l[active === 1 ? 'active' : ''])}>喜欢作品</span>
        </div>

        <div className={cx(l.tabContent, 'main_container')}>
          <PersonProduce id={id} data={active === 0 ? 20 : 40}/>
        </div>
      </MainLayout>
    );
  }
}


export default Person;
