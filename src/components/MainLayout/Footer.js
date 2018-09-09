import React from 'react';
import cx from 'classnames';
import l from './Footer.less'
import { Row, Col } from 'antd'

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cx(l.bg)}>
        <Row className="main_container">
          <Col span={14}>
            <Row className={cx(l.ltBox)}>
              <Col span={8}><span className={cx('myself-icon')}>&#xe624; </span>客户热线</Col>
              <Col span={8}><span className={cx('myself-icon')} style={{fontSize: '19px'}}>&#xe604; </span>商务合作</Col>
              <Col span={8}><span className={cx('myself-icon')}>&#xe657; </span>媒体合作</Col>
            </Row>

            <Row style={{marginTop: '20px'}}>
              <Col span={8}>
                <div className={cx(l.con)}>
                  <p><span className={cx(l.labels, l.mb)}>联系电话：</span>15710095799</p>
                  <p><span className={cx(l.labels, l.mb)}>在线客服：</span>13127500913</p>
                  <p><span className={cx(l.labels)}>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>service@ye-zao.com</p>
                  <div className={cx(l.line, l.rg)}></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={cx(l.con)}>
                  <p><span className={cx(l.labels, l.mb)}>联系人：</span>Steven</p>
                  <p><span className={cx(l.labels, l.mb)}>微&nbsp;&nbsp;&nbsp;信：</span>stevenzhangsheng</p>
                  <p><span className={cx(l.labels)}>邮&nbsp;&nbsp;&nbsp;箱：</span>business@ye-zao.com</p>
                  <div className={cx(l.line, l.rg)}></div>
                </div>
              </Col>
              <Col span={8}>
                <div className={cx(l.con)}>
                  <p><span className={cx(l.labels, l.mb)}>联系人：</span>俊怡</p>
                  <p><span className={cx(l.labels, l.mb)}>微&nbsp;&nbsp;&nbsp;信：</span>linmo1991fan</p>
                  <p><span className={cx(l.labels)}>邮&nbsp;&nbsp;&nbsp;箱：</span>communication@ye-zao.com</p>
                  <div className={cx(l.line)}></div>
                </div>
              </Col>
            </Row>

          </Col>
          <Col span={10} className={cx(l.eqs)}>
            <div className={cx(l.cell)}>
              <div className={cx(l.imgs, l.gong)}></div>
              <p className={cx(l.text)}><span className={cx('myself-icon', l.icon)}>&#xe65b; </span><span>官方微信</span></p>
            </div>
            <div className={cx(l.cell)}>
              <div className={cx(l.imgs, l.zan)}></div>
              <p className={cx(l.text)}><span className={cx('myself-icon', l.icon)}>&#xe672; </span><span>有赞商城</span></p>
            </div>
            {/*<div className={cx(l.cell)}>
              <div className={cx(l.imgs)}></div>
              <p className={cx(l.text)}><span className={cx('myself-icon', l.icon)}>&#xe652; </span><span>官方App</span></p>
            </div>*/}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer
