function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <span className="search-icon">⌕</span>
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search recipes, ingredients..."
        aria-label="Search recipes"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
