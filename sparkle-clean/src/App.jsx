import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import DefaultServices from './components/DefaultServices';
import ResultsGrid from './components/ResultsGrid';
import NowPlayingBar from './components/NowPlayingBar';
import Toast from './components/Toast';
import Footer from './components/Footer';
import './App.css';

const YT_API_KEY = 'AIzaSyDw5yrY-ijlU8DNBlGP8LA31VzE_i89FtY';

const SERVICE_BADGES = [
  'Home Cleaning', 'Office Package', 'Deep Clean', 'Move-Out',
  'Window Wash', 'Carpet Care', 'Sanitize Pro', 'Eco Clean',
  'Premium Plan', 'Quick Clean', 'Night Shift', 'Express Clean',
];

const SERVICE_SUFFIXES = [
  '– Professional Package', '– 3h Session', '– 2 Cleaners',
  '– Same Day Available', '– Eco-Friendly', '– Top Rated',
];

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | results
  const [results, setResults] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState('');
  const [nowPlaying, setNowPlaying] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  }, []);

  const doSearch = async () => {
    if (!query.trim()) return;
    setStatus('loading');
    try {
      const url =
        `https://www.googleapis.com/youtube/v3/search` +
        `?part=snippet&q=${encodeURIComponent(query)}` +
        `&type=video&videoEmbeddable=true&maxResults=12&key=${YT_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('YouTube API error: ' + res.status);
      const data = await res.json();
      const items = (data.items || []).map((v, i) => ({
        id: v.id.videoId,
        title: v.snippet.title,
        provider: v.snippet.channelTitle,
        thumbnail: v.snippet.thumbnails.medium?.url || v.snippet.thumbnails.default?.url || '',
        badge: 'Music',
      }));
      setResults(items);
      setSearchedQuery(query);
      setStatus(items.length ? 'results' : 'idle');
      if (!items.length) showToast('No services found. Try a different search.');
    } catch (e) {
      setStatus('idle');
      showToast('Search failed: ' + e.message);
    }
  };

  const playVideo = (r) => {
    setActiveId(r.id);
    setNowPlaying(r);
  };

  const stopPlayer = () => {
    setNowPlaying(null);
    setActiveId(null);
  };

  return (
    <div>
      <Navbar />
      <Hero query={query} setQuery={setQuery} onSearch={doSearch} />
      <Stats />

      {status === 'idle' && <DefaultServices />}
      {status === 'loading' && <Loading />}
      {status === 'results' && (
        <ResultsGrid
          results={results}
          searchedQuery={searchedQuery}
          activeId={activeId}
          onPlay={playVideo}
        />
      )}

      {nowPlaying && (
        <NowPlayingBar
          nowPlaying={nowPlaying}
          onStop={stopPlayer}
          onError={showToast}
        />
      )}

      {toast && <Toast message={toast} />}
      <Footer />
    </div>
  );
}

function Loading() {
  return (
    <section>
      <div className="loading-wrap">
        <div className="spinner" />
        Searching available cleaners in your area…
      </div>
    </section>
  );
}
