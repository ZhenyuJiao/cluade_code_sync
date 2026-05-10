import useCases from '../hooks/useCases';
import CaseCard from '../components/CaseCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';

export default function Cases() {
  const { cases, stats, filter, setFilter, sort, setSort, search, setSearch } = useCases();

  return (
    <section className="cases-page">
      <div className="container">
        <h2 className="section-title">赚钱案例库</h2>
        <p className="section-desc">找到适合你的路子，动手试试</p>

        <FilterBar filter={filter} setFilter={setFilter} />
        <SearchBar search={search} setSearch={setSearch} />

        <div className="sort-bar">
          <label>排序：</label>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">最新发布</option>
            <option value="easiest">难度最低</option>
            <option value="highest-income">收入最高</option>
          </select>
        </div>

        <div className="case-grid">
          {cases.length === 0 ? (
            <p className="empty-state">暂无匹配的案例，试试其他关键词</p>
          ) : (
            cases.map(c => <CaseCard key={c.id} case={c} />)
          )}
        </div>
      </div>
    </section>
  );
}
