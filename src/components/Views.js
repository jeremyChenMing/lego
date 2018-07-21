import React from 'react';
import cx from 'classnames';
import l from './HotWorks.less';
import ScrollReveal from 'scrollreveal'
import { Model } from './HotWorks'
import { Pagination, Icon, Avatar  } from 'antd'
import MainLayout from './MainLayout/MainLayout'

const dutArr = (num) => {
  let temp = [];
  for(let n=0; n < num; n++){
    temp.push(n + 1)
  }
  return temp;
}

class Views extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {name: '热度排序'},
        {name: '时间排序'},
        {name: '只能排序'},
      ],
      active: 0
    }
  }

  componentDidMount() {

    window.sr = ScrollReveal({ duration: 600, reset: false });
    sr.reveal('.vealcell', { 
      duration: 1000,
      scale: 1,
      origin: 'left',
      distance: '10px',
      rotate: {z: 15} 
    }, 50);
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
        <div className={cx('main_container')}>
          <div className={cx(l.hots)}>
            {
              dutArr(40).map( (item,index) => {
                return <div className={cx(l.mark, 'vealcell', l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                  <Model keys={index + 1}/>
                </div>
                
              })
            }
          </div>
          <div className={cx(l.pageBox, 'pageBox')}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default Views
