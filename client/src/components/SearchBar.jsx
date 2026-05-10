export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="搜索案例名称、介绍或工具…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {search && (
        <button className="search-clear" onClick={() => setSearch('')}>✕</button>
      )}
    </div>
  );
}
