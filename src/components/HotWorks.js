import React from 'react';
import cx from 'classnames';
import l from './HotWorks.less';


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

  render() {
    return (
      <div className={cx('main_container')}>
        <div className={cx(l.hots)}>
          {
            dutArr(20).map( (item,index) => {
              return <div className={cx(l.mark, l[(index + 1) % 5 !== 0 ? 'mar' : ''])} key={index}>
                <Model keys={index + 1}/>
              </div>
              
            })
          }
        </div>
      </div>
    );
  }
}

export default HotWorks
