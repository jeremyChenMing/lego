import React from 'react'
import l from './Users.less'
import cx from 'classnames'
import MainLayout from '../components/MainLayout/MainLayout'
import ScrollReveal from 'scrollreveal'
// import { Form, Input, Icon, Button, notification } from 'antd'

class Users extends React.Component {
  componentDidMount () {
    // window.scrollTop()
    window.sr = ScrollReveal({ duration: 1200, reset: false })
    sr.reveal('.fooRevealF', {
      duration: 1200,
      origin: 'right',
      distance: '600px',
      delay: 0
    })
    sr.reveal('.fooRevealS', {
      duration: 1200,
      origin: 'right',
      distance: '600px'
      // delay: 500,
    })
    sr.reveal('.fooRevealT', {
      duration: 1200,
      origin: 'right',
      distance: '600px'
      // delay: 1500,
    })
    sr.reveal('.fooRevealFout', {
      duration: 1200,
      origin: 'right',
      distance: '600px'
      // delay: 2000,
    })
    sr.reveal('.fooRevealFive', {
      duration: 1200,
      origin: 'right',
      distance: '600px'
      // delay: 2500,
    })
  }
  render () {
    const {location} = this.props
    return (
      <MainLayout location={location} >
        <div className={cx(l.historyClass, 'main_container')}>
          <div className={cx(l.cons)}>
            <div className='fooRevealF'>
              <h1>品牌故事</h1>
              <h4>造一个世界，有你也有我</h4>
              <p>积木大概是每个孩子童年最难忘的玩具，在积木搭就的世界里，我们是“造物主”，而在这里，有着无限可能。</p>
            </div>
            <div className='fooRevealS' style={{marginBottom: '20px'}}>
              <h3>【积木，也可以一起玩】</h3>
              <p>我和积木的缘分始于3岁那年的夏天，母亲给我带回一份乐高式积木做礼物。意外遗失了说明书，反而让我打开了积木原创拼搭的大门。</p>
              <p>起初，积木带给我的是学习和工作之余的另一方天地，我在脑海中构建了一个神奇的世界，通过积木让它有了具体的模样；后来，我认识了许多兴趣相同的朋友，积木在他们的手中拥有不同的生命力，种种精妙拼搭背后是无数次尝试，而他们乐此不疲。</p>
              <p >和积木的故事越来越多，我有了两个日渐坚定的想法：第一，分享会让乐趣翻倍，我想让更多人也感受到这份乐趣；第二，我想守护这些创意的火花，让创造更有价值。</p>
            </div>
            <div className='fooRevealT' style={{marginBottom: '20px'}}>
              <h3>【来，一起创造一个世界！】</h3>
              <p>积木市场越来越大，但遗憾的是，积木更多被赋予“玩乐”的涵义，而缺失了“创造”的属性。市场上的众多积木品牌，在售卖玩具的同时配套拼搭说明书，孩子们打开盒子后，往往就是按照步骤拼插，他们常常pk谁拼的最快，却少了打破思维定式、创造自己独特作品的过程。</p>
              <p>另一方面，积木原创玩家们创造力极强，拥有异于常人的变通能力，创造出的作品令人惊叹。然而，这些产品往往只能获得小范围的曝光和认可。</p>
              <p>我不愿将积木与一个个工业化的产品画上等号，积木应当是一个桥梁，让我们的每一个梦，都能在自己创造的世界里成为现实。</p>
              <p>带着这样的愿景，我们把品牌命名为“也造”，“也”寓意着“有你也有我”，真正实现众创，而“造”则代表着一个从无到有的过程，创造我们的所思所要。</p>
            </div>
            <ul className='fooRevealFout' style={{marginBottom: '20px'}}>
              <li>在这里，我们会帮助有想法、有创造能力的玩家实现创意变现；</li>
              <li>在这里，原创积木文化将传递给更多家庭，让“原创精神”点亮孩子的心；</li>
              <li>在这里，无论是孩子还是成人，都能在快餐式即时享乐的移动互联网时代，找回内心的纯粹和热爱。</li>
            </ul>

            <ul className='fooRevealFive' style={{marginBottom: '20px'}}>
              <li>积木对我们意味着什么？</li>
              <li>是梦想，也是快乐，是想象通往现实的一道桥。</li>
              <li>让我们一起创造属于你我的积木新国货。</li>
            </ul>
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default Users
