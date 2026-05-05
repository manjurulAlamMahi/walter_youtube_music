const FALLBACK = 'https://placehold.co/400x148/e3f2fd/1a73e8?text=CleanPro';

export default function ResultsGrid({ results, searchedQuery, activeId, onPlay }) {
  return (
    <section>
      <h2>Music results for &ldquo;{searchedQuery}&rdquo;</h2>
      <div className="results-grid">
        {results.map((r) => (
          <div
            key={r.id}
            className={`result-card${activeId === r.id ? ' active' : ''}`}
            onClick={() => onPlay(r)}
          >
            {/* <img
              src={r.thumbnail || FALLBACK}
              alt="service"
              onError={(e) => { e.target.src = FALLBACK; }}
            /> */}
            <div className="play-overlay">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <div className="card-body">
              <span className="badge">{r.badge}</span>
              <h4>{r.title}</h4>
              <p>Provider: {r.provider.length > 30 ? r.provider.slice(0, 30) + '…' : r.provider}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
