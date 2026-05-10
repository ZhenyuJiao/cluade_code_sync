import { useNavigate } from 'react-router-dom';

export default function CaseCard({ case: c }) {
  const navigate = useNavigate();

  return (
    <div className="case-card" onClick={() => navigate(`/cases/${c.id}`)}>
      <div className="card-header">
        <span className={`tag tag-${c.difficulty}`}>{c.difficulty}</span>
        <span className="card-category">{c.category}</span>
      </div>
      <h3 className="card-title">{c.title}</h3>
      <p className="card-summary">{c.summary}</p>
      <div className="card-meta">
        <span>⏱ {c.timeCost}</span>
        <span>💰 {c.income}</span>
      </div>
      <button className="btn-detail">查看详情 →</button>
    </div>
  );
}
