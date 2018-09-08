import React from 'react'
import Header from './Header'
import Footer from './Footer'
import l from './MainLayout.less'

class MainLayout extends React.Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }

  render() {
    const {location, children} = this.props;
    return (
      <div ref={node => this.node = node} className={l.normal}>
        <Header location={location} />
        <div className={l.content}>
          <div className={l.main}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


export default MainLayout
