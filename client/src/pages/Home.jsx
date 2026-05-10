import { Link } from 'react-router-dom';
import useCases from '../hooks/useCases';
import CaseCard from '../components/CaseCard';

export default function Home() {
  const { allCases, stats } = useCases();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1><span>用 AI 赚钱</span>，不需要你会编程</h1>
          <p className="hero-sub">
            不用懂代码，不用花大价钱报课。<br />
            每个案例都有人做成了，把步骤一步步拆给你看。<br />
            你跟着做就行。
          </p>
          <Link to="/cases" className="btn btn-primary">免费看所有赚钱路子 ↓</Link>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-num">{stats.caseCount}</span>
            <span className="stat-label">赚钱案例</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{stats.categoryCount}</span>
            <span className="stat-label">赚钱方式</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">入门~高阶</span>
            <span className="stat-label">难度覆盖</span>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="problem">
        <div className="container">
          <h2 className="section-title">你是不是也这样想过？</h2>
          <div className="problem-grid">
            <div className="problem-item">
              <span className="problem-icon">🤔</span>
              <p>"看别人用 AI 赚钱很心动，但自己完全不知道从哪里开始"</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">😤</span>
              <p>"搜了一堆教程，要么太专业看不懂，要么一看就是割韭菜"</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">😰</span>
              <p>"怕学不会、怕花冤枉钱、怕折腾半天一场空"</p>
            </div>
          </div>
          <p className="problem-outro">你不是一个人。这里每个案例，都是从你这种状态开始的普通人做的。</p>
        </div>
      </section>

      {/* Featured cases */}
      <section className="cases">
        <div className="container">
          <h2 className="section-title">赚钱的路子，我们都给你拆好了</h2>
          <p className="section-desc">用什么工具、怎么找客户、能赚多少钱 — 每一步都写清楚了，跟着来就行。</p>
          <div className="case-grid">
            {allCases.slice(0, 6).map(c => (
              <CaseCard key={c.id} case={c} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/cases" className="btn btn-outline">查看全部案例 →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <h2 className="section-title">常见问题</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>我完全不懂 AI，能学会吗？</h3>
              <p>这些案例就是给不懂技术的人写的。每个步骤都像"点开这个按钮"一样简单，不需要你会任何技术。</p>
            </div>
            <div className="faq-item">
              <h3>需要花钱吗？</h3>
              <p>大部分案例用的 AI 工具都有免费版，你不需要一开始就花钱。等赚到钱了再考虑升级。</p>
            </div>
            <div className="faq-item">
              <h3>每天要花多少时间？</h3>
              <p>每个案例都标注了时间投入，大部分每天 30 分钟到 1 小时就行。不需要辞职干。</p>
            </div>
            <div className="faq-item">
              <h3>真的能赚到钱吗？</h3>
              <p>我们不保证你赚多少钱，也不卖课。案例都是真实有人做成功的经验。做不做得到看你愿不愿意动手试。</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about">
        <div className="container">
          <h2 className="section-title">在这儿，每个普通人都能找到适合自己的路子</h2>
          <p className="section-desc">我们做的就是一件事：把那些用 AI 赚到钱的人的经验，整理成你能跟着做的步骤。</p>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">📖</div>
              <h3>不讲大道理</h3>
              <p>不跟你扯什么"AI思维"、"认知升级"。从注册账号开始教，一步是一步。</p>
            </div>
            <div className="about-card">
              <div className="about-icon">🔄</div>
              <h3>路子一直在更新</h3>
              <p>AI 变得快，赚钱的路子也在变。我们会持续加新案例，淘汰过时的。</p>
            </div>
            <div className="about-card">
              <div className="about-icon">💬</div>
              <h3>你也可能是下一个人</h3>
              <p>如果你照着路子赚到钱了，欢迎把你的经验分享出来，帮到更多人。</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
