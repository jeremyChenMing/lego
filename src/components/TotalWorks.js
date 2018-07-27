import React from 'react';
import cx from 'classnames';
import l from './HotWorks.less';
import ScrollReveal from 'scrollreveal'
import { Model } from './HotWorks'
import { Pagination } from 'antd'
import { getProducts } from '../services/common'


const dutArr = (num) => {
  let temp = [];
  for(let n=0; n < num; n++){
    temp.push(n + 1)
  }
  return temp;
}

class TotalWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      page: 1,
      pageSize: 10,
      produce: [],
    }
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
  componentDidMount() {
    this.getList();
    // window.sr = ScrollReveal({ duration: 600, reset: false });
    // sr.reveal('.vealcell', { 
    //   duration: 1000,
    //   scale: 1,
    //   origin: 'left',
    //   distance: '10px',
    //   rotate: {z: 15} 
    // }, 50);
  }
  changePage = (page, pageSize) => {
    this.setState({
      page: page
    }, this.getList)
  }
  render() {
    const { page, pageSize,total, produce } = this.state;
    return (
      <div className={cx('main_container')}>
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
          <Pagination current={page} pageSize={pageSize} total={total} onChange={this.changePage}/>
        </div>
      </div>
    );
  }
}

export default TotalWorks
