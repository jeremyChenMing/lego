import React from 'react';
import { connect } from 'dva'
import cx from 'classnames';
import l from './Upload.less'
import MainLayout from '../components/MainLayout/MainLayout'
import { Card, Button } from 'antd'

class Upload extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    return (
      <MainLayout location={location}>
        <div className={cx('main_container')}>
          <h1 className={cx(l.title)}>上传作品</h1>

          <Card title="作品信息" bordered={false} style={{marginBottom: '20px'}}>
            hahah
          </Card>

          <Card title="上传作品" bordered={false} style={{marginBottom: '20px'}}>
            hahah
          </Card>

          <Card title="上传封面" bordered={false} style={{marginBottom: '20px'}}>
            hahah
          </Card>
          <div className={cx(l.btnBox)}>
            <Button type="primary" size="large" style={{width: 100}}>发布</Button>
            <Button size="large" style={{marginLeft: '25px', width: 100}}>预览</Button>
          </div>
        </div>
      </MainLayout>
      
    );
  }
}

export default Upload
