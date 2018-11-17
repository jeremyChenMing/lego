import React from 'react'
import Headers from './Header'
import Footers from './Footer'
import l from './MainLayout.less'

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class MainLayout extends React.Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }

  render() {
    const {location, children} = this.props;
    return (
      <div ref={node => this.node = node} className={l.normal}>
        <Headers location={location} />
        <Content>
          {children}
        </Content>
        <Footer style={{padding: '0', backgroundColor: '#fff'}}>
          <Footers />
        </Footer>
      </div>
    );
  }
}
{/*<div className={l.content}>
  <div className={l.main}>
    {children}
  </div>
</div>*/}

export default MainLayout
