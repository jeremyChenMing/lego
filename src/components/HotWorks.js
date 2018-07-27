import React from 'react';
import cx from 'classnames';
import l from './HotWorks.less';
import ScrollReveal from 'scrollreveal'
import { Pagination, Icon, Avatar  } from 'antd'
import { getProducts } from '../services/common'
import moment from 'moment'



export class Model extends React.Component {
  constructor(props) {
    super(props);
  }
  link = (id, type) => {
    document.location.href = `#/main/detail?id=${id}&type=${type}`
  }


  componentDidMount() {
    this.showTime(this.props.data);
  }
  showTime = (data) => {
    let temp = '';
    // const timeArr = data.create_at ? data.create_at.split(' ') : [];
    if (data.create_at) {
      temp = moment().from(data.create_at)
    }
    return temp;
  }
  renderBack = (data) => {
    let temp = {};
    if (data && data.images && data.images[0]) {
      temp = {backgroundImage: `url(${data.images[0].url})`}
    }
    return temp;
  }
  render() {
    const { data } = this.props;
    return (
      <div onClick={this.link.bind(null, data.id, 'hot')} className={cx(l.modelBox)}>
        <div className={cx(l.imgs)} style={this.renderBack(data)}></div>
        <div className={cx(l.con)}>
          <h4>{data.title ? data.title : ''}</h4>
          <p title={data.description ? data.description : ''}>{data.description ? data.description : ''}</p>
          {/*<span><Icon type="eye-o" />&nbsp;1555</span>
          &nbsp;&nbsp;&nbsp;&nbsp;*/}
          <span><Icon type="like-o" />&nbsp;{data.num_votes}</span>
        </div>
        <div className={cx(l.footBox)}>
          <div className={cx(l.left)}>
            <Avatar size="small" icon="user" src={this.props.avatar} />
          </div>
          <div className={cx(l.mid)}>{this.props.name}</div>
          <div className={cx(l.right)}>{this.showTime(data)}</div>
        </div>
      </div>
    );
  }
}






const dutArr = (num) => {
  let temp = [];
  for(let n=0; n < num; n++){
    temp.push(n + 1)
  }
  return temp;
}

class HotWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      page: 1,
      pageSize: 10,
      produce: [],
    }
  }

  componentDidMount() {
    this.getList()
    // window.sr = ScrollReveal({ duration: 600, reset: false });
    // sr.reveal('.vealcell', { 
    //   duration: 1000,
    //   scale: 1,
    //   origin: 'left',
    //   distance: '10px',
    //   rotate: {z: 15} 
    // }, 50);
  }
  getList = async() => {
    const { page, pageSize } = this.state;
    try{
      const result = await getProducts({limit: pageSize, offset: (page - 1) * pageSize});
      if (result && !result.code) {
        this.setState({
          total: result.count,
          produce: result.results
        })
      }else{

      }
    }catch(err) {
      console.log(err)
    }
  }
  changePage = (page, pageSize) => {
    this.setState({
      page: page
    }, this.getList)
  }

  render() {
    const { page, total, pageSize, produce, pagination } = this.state;
    return (
      <div className={cx('main_container')}>
        <div className={cx(l.hots)}>
          { /* produce */
            produce.map( (item,index) => {
              return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                <Model keys={index + 1} data={item} avatar={item.avatar ? item.avatar : "/img/avart1.png"}/>
              </div>
              
            })
          }
        </div>
        <div className={cx(l.pageBox, 'pageBox')}>
          <Pagination current={page} total={total} pageSize={pageSize} onChange={this.changePage}/>
        </div>
      </div>
    );
  }
}

export default HotWorks
