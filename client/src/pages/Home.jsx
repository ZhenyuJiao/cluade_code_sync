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
          <h1><span>AI 赚钱</span>，没你想的那么难</h1>
          <p className="hero-sub">
            不会编程？不懂技术？完全没关系。<br />
            这里的每个案例，都是普通人跟着步骤做、真的赚到了钱。
          </p>
          <Link to="/cases" className="btn btn-primary">看看都有什么路子 ↓</Link>
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

      {/* Featured cases */}
      <section className="cases">
        <div className="container">
          <h2 className="section-title">真实的路子，一步步教给你</h2>
          <p className="section-desc">每个案例都写了完整的步骤：从用什么工具，到怎么找客户，到能赚多少钱。</p>
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

      {/* About */}
      <section className="about">
        <div className="container">
          <h2 className="section-title">为什么要做这个网站？</h2>
          <p className="section-desc">AI 不是程序员的专利。我们相信每个普通人都能用它多赚一份收入。</p>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">📖</div>
              <h3>照着做就行</h3>
              <p>不跟你讲大道理。每个案例从注册账号开始教，跟着步骤走就能上手。</p>
            </div>
            <div className="about-card">
              <div className="about-icon">🔄</div>
              <h3>持续更新</h3>
              <p>AI 变化快，我们会定期加新案例、更新老案例，保持路子有效。</p>
            </div>
            <div className="about-card">
              <div className="about-icon">💬</div>
              <h3>你有路子？告诉我们</h3>
              <p>如果你用 AI 赚到了钱，欢迎分享你的经验。一起帮更多人。</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
