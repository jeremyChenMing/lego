import React from 'react'
import l from './Users.less'
import cx from 'classnames'
import MainLayout from '../components/MainLayout/MainLayout'
import ScrollReveal from 'scrollreveal'
// import { Form, Input, Icon, Button, notification } from 'antd'

class Users extends React.Component {
  componentDidMount () {

    // window.sr = ScrollReveal({ duration: 1200, reset: false })
    // sr.reveal('.fooRevealF', {
    //   duration: 1200,
    //   origin: 'right',
    //   distance: '600px',
    //   delay: 0
    // })
    // sr.reveal('.fooRevealS', {
    //   duration: 1200,
    //   origin: 'right',
    //   distance: '600px'
    //   // delay: 500,
    // })
    // sr.reveal('.fooRevealT', {
    //   duration: 1200,
    //   origin: 'right',
    //   distance: '600px'
    //   // delay: 1500,
    // })
    // sr.reveal('.fooRevealFout', {
    //   duration: 1200,
    //   origin: 'right',
    //   distance: '600px'
    //   // delay: 2000,
    // })
    // sr.reveal('.fooRevealFive', {
    //   duration: 1200,
    //   origin: 'right',
    //   distance: '600px'
    //   // delay: 2500,
    // })
  }
  render () {
    const {location} = this.props
    return (
      <MainLayout location={location} >
        <div className={cx(l.topBox)}>
          {/**/}<div className={cx(l.shadow)}>
            <img src="/img/W80.png" alt="背景"/>
            <h1>" 也造 " &nbsp;诞生</h1>
          </div>
          
        </div>
        <div className={cx(l.logoTitle)}><span>品牌故事</span></div>
        <div className={cx(l.historyClass, 'main_container')} style={{marginTop: '20px'}}>
          {/*<div className={cx(l.bgs)}></div>*/}

          <div className={cx(l.content)}>
            <h1>“也造”</h1>
            <p style={{marginBottom: '40px'}}>是一家专注服务于设计师积木原创和消费者互动体验的新型互联网社群科技公司。</p>
            <div className={cx(l.robote)}>
              <img src="/img/logo.png" alt="也造形象LOGO"/>
            </div>
            <h1>不知道从什么时候开始，越来越多的人有了“现代病”。</h1>
            <p>我们的耳朵不再灵敏。</p>
            <p style={{marginBottom: '20px'}}>听不到外面的世界有哪些新的声音，也听不到孩子小声的请求：“可不可以陪我玩一会”。</p>
            <p>我们的眼睛不再明亮。</p>
            <p style={{marginBottom: '20px'}}>忽明忽暗的屏幕占据了我们太多时间，不停的下拉刷新，却很难有“眼前一亮”的时刻。</p>
            <p>我们的手指不再灵活。</p>
            <p style={{marginBottom: '20px'}}>十指之中，大拇指成了出镜率最高的那一个，左右上下滑动，留下其他9个“兄弟”发麻、僵硬。</p>
            <p>更糟糕的是，我们的心也渐渐缺少了热情。</p>
            <p style={{marginBottom: '20px'}}>在“无趣”中消耗着时间，或许是因为找不到“有趣”在哪里。</p>
            <p style={{marginBottom: '20px'}}>“也造”想做的，就是帮助更多人找回内心的创意和热爱：你“也”我“也”，你有我有，和每一位用户，我们一起共创积木作品，共享有品位、有格调的“生活+梦想”的乐趣。</p>
            <ul style={{marginBottom: '20px'}}>
              <li>我们可以倾听孩子的诉求，一起用积木创造他们心中的奇妙世界，给他们高质量的陪伴；</li>
              <li>我们可以用积木的色彩拼出蓝天白云、古堡花园，拼出如梦如画的美妙场景；</li>
              <li>我们可以让手指听从大脑的“吩咐”，用一双巧手，创造我们自己的专属作品；</li>
              <li>我们更可以为内心的热情和创意找到出口，在这个谁都可以表达的时代，用积木拼出我们的生活态度。</li>
            </ul>
            <p style={{marginBottom: '20px'}}>换一种有趣的方式“浪费”时间吧，一起用积木造作品、造生活、“也”造梦想、造未来，造所思所要。</p>
            <p style={{marginBottom: '40px'}}>一起“造”：从无到有，从0到1，生成不息。</p>

            <h1>公司愿景</h1>
            <p style={{marginBottom: '40px'}}>让每个人激活创造潜能，收获创造带来的乐趣和价值</p>

            <h1>公司使命</h1>
            <p style={{marginBottom: '40px'}}>用积木联结你我，把想象付诸作品</p>

            <h1>公司价值观</h1>
            <p>用户至上、尊重原创、诚信正直、价值共享</p>

            
          </div>

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
        <div className={cx(l.logoT)}>
          <h1>也造 YE-ZAO</h1>
          <h2>造生活，也造梦想</h2>
        </div>
      </MainLayout>
    )
  }
}

export default Users
