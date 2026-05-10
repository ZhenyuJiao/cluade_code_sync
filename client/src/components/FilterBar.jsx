const CATEGORIES = ['all', '写作', '设计', '视频', '办公', '翻译'];
const LABELS = { all: '全部', '写作': '📝 写作', '设计': '🎨 设计', '视频': '🎬 视频', '办公': '📊 办公', '翻译': '🌐 翻译' };

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="filters">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={`filter-btn ${filter === cat ? 'active' : ''}`}
          onClick={() => setFilter(cat)}
        >
          {LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
