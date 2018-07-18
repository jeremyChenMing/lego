import React from 'react';
import cx from 'classnames';
import l from './HotWorks.less';
import ScrollReveal from 'scrollreveal'
import { Pagination } from 'antd'


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
        {this.props.keys}
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
