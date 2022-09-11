import { FaSearch } from 'react-icons/fa';

export default function GlobalFilter({
  filter,
  setFilter,
  placeholder = 'Search',
}) {
  return (
    <div className="inner-addon left-addon">
      <FaSearch className="fa" />
      <input
        id="search-input"
        type="text"
        name="search"
        className="form-control input-search"
        placeholder={placeholder}
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}
