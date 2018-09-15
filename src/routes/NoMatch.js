import React from 'react';
import l from './NoMatch.less';
import cx from 'classnames';
import { Button, Row, Col } from 'antd'

class NoMatch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cx(l.noBox)}>
        <Row>
          <Col span={12} className={cx(l.left)}>
            <img src="/img/logo.png" alt="也造官网LOGO"/>
          </Col>
          <Col span={12} className={cx(l.right)}>
            <span className={cx(l.no)}>404</span>
            <div className={cx(l.text)}>
              <p>您访问的页面不存在</p>
              <Button type="primary"><a href="#/">返回首页</a></Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NoMatch
