import { useEffect, useRef, useState } from 'react';

export default function NowPlayingBar({ nowPlaying, onStop, onError }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const readyRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let destroyed = false;

    function initPlayer() {
      if (destroyed || !containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        width: 160,
        height: 70,
        videoId: nowPlaying.id,
        playerVars: { autoplay: 1, controls: 0, rel: 0 },
        events: {
          onReady() {
            readyRef.current = true;
            setIsPlaying(true);
          },
          onStateChange(e) {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
            if (e.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              onStop();
            }
          },
          onError(e) {
            const blocked = [101, 150, 153].includes(e.data);
            onError(blocked
              ? 'This song blocks embedding. Try another one.'
              : `Playback error (${e.data}). Try another song.`);
            onStop();
          },
        },
      });
    }

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        initPlayer();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      }
    }

    return () => {
      destroyed = true;
      readyRef.current = false;
      try { playerRef.current?.destroy(); } catch { }
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (readyRef.current && playerRef.current) {
      playerRef.current.loadVideoById(nowPlaying.id);
      setIsPlaying(true);
    }
  }, [nowPlaying.id]);

  const togglePlayback = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
      return;
    }

    player.playVideo();
    setIsPlaying(true);
  };

  return (
    <div className="now-playing-bar">
      <div ref={containerRef} className="yt-frame" />
      {/* <img src={nowPlaying.thumbnail} alt="" /> */}
      <div className="np-info">
        <div className="np-label">🧽 Now Playing</div>
        <div className="np-title">{nowPlaying.title}</div>
        <div className="np-provider">{nowPlaying.provider}</div>
      </div>
      <div className="np-actions">
        <button className="np-toggle" onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="np-stop" onClick={onStop}>✕</button>
      </div>
    </div>
  );
}
