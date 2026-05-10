import { useParams, useNavigate } from 'react-router-dom';
import useCases from '../hooks/useCases';

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allCases } = useCases();
  const c = allCases.find(x => x.id === Number(id));

  if (!c) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>案例不存在</h2>
        <p>可能已被删除或链接有误</p>
        <button className="btn btn-primary" onClick={() => navigate('/cases')}>返回案例库</button>
      </div>
    );
  }

  return (
    <div className="case-detail-page">
      <div className="container">
        <button className="btn-back" onClick={() => navigate(-1)}>← 返回</button>

        <div className="detail-header">
          <span className={`tag tag-${c.difficulty}`}>{c.difficulty}</span>
          <span className="card-category">{c.category}</span>
        </div>
        <h2>{c.title}</h2>
        <div className="detail-meta">
          <span>⏱ 时间：{c.timeCost}</span>
          <span>💰 收入：{c.income}</span>
        </div>

        <div className="detail-summary">{c.summary}</div>

        {c.problem && (
          <div className="detail-block detail-problem">
            <strong>😫 痛点：</strong>
            <p>{c.problem}</p>
          </div>
        )}
        {c.result && (
          <div className="detail-block detail-result">
            <strong>✅ 能赚多少：</strong>
            <p>{c.result}</p>
          </div>
        )}

        <h3 className="detail-section-title">📋 教学步骤</h3>
        <ol className="detail-steps">
          {c.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>

        <div className="detail-tools">
          <strong>🔧 使用工具：</strong>
          <div className="tool-tags">
            {c.tools.map((t, i) => <span key={i} className="tool-tag">{t}</span>)}
          </div>
        </div>

        {c.tips && (
          <div className="detail-tips">
            💡 <strong>小贴士：</strong>
            <p>{c.tips}</p>
          </div>
        )}
      </div>
    </div>
  );
}
