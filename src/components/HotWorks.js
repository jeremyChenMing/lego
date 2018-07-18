import React from 'react';
import cx from 'classnames';
import l from './HotWorks.less';
import ScrollReveal from 'scrollreveal'
import { Pagination, Icon, Avatar  } from 'antd'


export class Model extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cx(l.modelBox)}>
        <div className={cx(l.imgs)}></div>
        <div className={cx(l.con)}>
          <h4>设计大师</h4>
          <p>拼装 - 汽车</p>
          <span><Icon type="eye-o" />1555</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span><Icon type="like-o" />2215</span>
        </div>
        <div className={cx(l.footBox)}>
          <div className={cx(l.left)}>
            <Avatar size="small" icon="user" />
          </div>
          <div className={cx(l.mid)}>name</div>
          <div className={cx(l.right)}>12天前</div>
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
  render() {
    return (
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
    );
  }
}

export default HotWorks
