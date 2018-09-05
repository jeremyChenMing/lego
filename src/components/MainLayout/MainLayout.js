
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import l from './MainLayout.less'
function MainLayout ({ children, location }) {
  return (
    <div className={l.normal}>
      <Header location={location} />
      <div className={l.content}>
        <div className={l.main}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default MainLayout
