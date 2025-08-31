import React, { useMemo, useState } from 'react';
import { SAMPLE_SONGS } from './songs';
import './MusicLibrary.css'

export default function MusicLibrary({ role = 'user', initialSongs }) {
  // Use initialSongs if provided from host; otherwise use sample
  const [songs, setSongs] = useState(initialSongs ?? SAMPLE_SONGS);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('title'); // title/artist/album
  const [sortBy, setSortBy] = useState('title'); // title/artist/album/duration

  // filter using .filter and .map
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return songs.filter(s => (s[filterBy] + '').toLowerCase().includes(q));
  }, [songs, query, filterBy]);

  // sorted using .slice + .sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const A = (a[sortBy] + '').toLowerCase();
      const B = (b[sortBy] + '').toLowerCase();
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  }, [filtered, sortBy]);

  // grouped counts using reduce
  const countsByAlbum = useMemo(() => {
    return songs.reduce((acc, s) => {
      acc[s.album] = (acc[s.album] || 0) + 1;
      return acc;
    }, {});
  }, [songs]);

  // Add / Delete (admin only)
  function handleAdd() {
    const title = prompt('Song title');
    if (!title) return;
    const artist = prompt('Artist') || 'Unknown';
    const album = prompt('Album') || 'Unknown';
    const duration = parseInt(prompt('Duration (seconds)') || '0', 10);
    setSongs(prev => [{ id: Date.now(), title, artist, album, duration }, ...prev]);
  }

  function handleDelete(id) {
    if (!confirm('Delete this song?')) return;
    setSongs(prev => prev.filter(s => s.id !== id));
  }

  return (
    <div className="music-lib-root">
      <h2>Music Library</h2>

      <div className="controls">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${filterBy}`} />
        <select value={filterBy} onChange={e => setFilterBy(e.target.value)}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="title">Sort: Title</option>
          <option value="artist">Sort: Artist</option>
          <option value="album">Sort: Album</option>
          <option value="duration">Sort: Duration</option>
        </select>

        {/* admin controls */}
        {role === 'admin' && (
          <button onClick={handleAdd} className="btn-primary">Add Song</button>
        )}
      </div>

      <div className="summary">
        <div>Total songs: {songs.length}</div>
        <div>Albums: {Object.keys(countsByAlbum).length}</div>
      </div>

      <ul className="song-list">
        {sorted.map(s => (
          <li key={s.id} className="song-item">
            <div className="meta">
              <strong>{s.title}</strong>
              <div className="sub">{s.artist} — <em>{s.album}</em></div>
            </div>
            <div className="actions">
              {role === 'admin' && <button onClick={() => handleDelete(s.id)}>Delete</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
