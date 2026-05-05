export default function Hero({ query, setQuery, onSearch }) {
  return (
    <div className="hero">
      <h1>✨ Premium Cleaning Services</h1>
      <p>Find the perfect cleaning solution for your home or business</p>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a service (e.g. deep clean, office, move-out…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button onClick={onSearch}>Find Service</button>
      </div>
    </div>
  );
}
