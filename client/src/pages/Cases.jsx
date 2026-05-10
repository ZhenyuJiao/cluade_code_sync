import useCases from '../hooks/useCases';
import CaseCard from '../components/CaseCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';

export default function Cases() {
  const { cases, stats, filter, setFilter, sort, setSort, search, setSearch } = useCases();

  return (
    <section className="cases-page">
      <div className="container">
        <h2 className="section-title">全部赚钱路子</h2>
        <p className="section-desc">按分类筛选，找到适合你的那个</p>

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
            <p className="empty-state">没搜到相关案例 🙁 换个关键词试试，或者看看其他分类</p>
          ) : (
            cases.map(c => <CaseCard key={c.id} case={c} />)
          )}
        </div>
      </div>
    </section>
  );
}
