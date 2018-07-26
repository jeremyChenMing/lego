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
  render() {
    const { data } = this.props;
    return (
      <div onClick={this.link.bind(null, data.id, 'hot')} className={cx(l.modelBox)}>
        <div className={cx(l.imgs)}></div>
        <div className={cx(l.con)}>
          <h4>{data.title ? data.title : ''}</h4>
          <p title={data.description ? data.description : ''}>{data.description ? data.description : ''}</p>
          <span><Icon type="eye-o" />&nbsp;1555</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span><Icon type="like-o" />&nbsp;{data.num_votes}</span>
        </div>
        <div className={cx(l.footBox)}>
          <div className={cx(l.left)}>
            <Avatar size="small" icon="user" />
          </div>
          <div className={cx(l.mid)}>name</div>
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
      pagination:{
        limit: 10,
        offset: 0,
        total: 0,
        current: 1,
      },
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
    const { pagination: {limit, offset} } = this.state;
    try{
      const result = await getProducts({limit, offset});
      console.log(result, '**')
      if (result && !result.code) {
        this.state.pagination.total = result.count;
        this.setState({
          produce: result.results
        })
      }else{

      }
    }catch(err) {
      console.log(err)
    }
  }

  render() {
    const { pagination: {current, total}, produce } = this.state;
    return (
      <div className={cx('main_container')}>
        <div className={cx(l.hots)}>
          { /* produce */
            produce.map( (item,index) => {
              return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                <Model keys={index + 1} data={item}/>
              </div>
              
            })
          }
        </div>
        <div className={cx(l.pageBox, 'pageBox')}>
          <Pagination defaultCurrent={current} total={total} />
        </div>
      </div>
    );
  }
}

export default HotWorks
