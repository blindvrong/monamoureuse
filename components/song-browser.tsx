'use client'

import { memo, useMemo, useState } from 'react'
import { Play, Search } from 'lucide-react'

type Song = {
  title: string
  artist: string
  mood: string
  color: string
}

const SongCard = memo(function SongCard({ song, index }: { song: Song; index: number }) {
  return (
    <article className={`song-card ${song.color}`}>
      <div className="cover">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <b>♪</b>
      </div>

      <div className="song-info">
        <span className="song-mood">{song.mood}</span>
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>

      <a
        className="play-button"
        href={`https://open.spotify.com/search/${encodeURIComponent(`${song.title} ${song.artist}`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Écouter ${song.title} de ${song.artist}`}
      >
        <Play size={16} />
      </a>
    </article>
  )
})

export function SongBrowser({ songs }: { songs: Song[] }) {
  const [query, setQuery] = useState('')
  const [activeMood, setActiveMood] = useState('Tous')

  const moods = useMemo(() => ['Tous', ...Array.from(new Set(songs.map((song) => song.mood)))], [songs])

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()

    return songs.filter((song) => {
      const matchText = `${song.title} ${song.artist}`.toLowerCase().includes(search)
      const matchMood = activeMood === 'Tous' || song.mood === activeMood
      return matchText && matchMood
    })
  }, [activeMood, query, songs])

  return (
    <section className="songs-section" id="sons">
      <div className="section-heading songs-heading">
        <div>
          <p className="eyebrow">les morceaux que je garde pour toi</p>
          <h2>Tes sons préférés</h2>
          <p className="section-intro">
            Un peu de nostalgie, un peu d&apos;énergie, et beaucoup de cette douceur qui te ressemble.
          </p>
        </div>
      </div>

      <div className="search-shell">
        <label className="search-box" htmlFor="song-search">
          <Search size={16} />
          <input
            id="song-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cherche un titre, un artiste..."
            aria-label="Rechercher une chanson"
          />
        </label>

        <div className="mood-filters" aria-label="Filtrer par humeur">
          {moods.map((mood) => (
            <button
              key={mood}
              type="button"
              className={mood === activeMood ? 'chip active' : 'chip'}
              onClick={() => setActiveMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <div className="song-list">
        {filtered.map((song, index) => (
          <SongCard key={`${song.title}-${song.artist}`} song={song} index={index} />
        ))}
      </div>
    </section>
  )
}
