'use client'

import { useMemo, useState } from 'react'

const songs = [
  { title: 'Silence', artist: 'Marshmello, Khalid', mood: 'Nostalgique', color: 'peach' },
  { title: "Who's Lovin' You", artist: 'The Jackson 5', mood: 'Soul', color: 'gold' },
  { title: 'Only Girl (In The World)', artist: 'Rihanna', mood: 'Énergie', color: 'rose' },
  { title: 'MOOO!', artist: 'Doja Cat', mood: 'Confiance', color: 'lilac' },
  { title: 'Na Na', artist: 'Trey Songz', mood: 'R&B', color: 'blue' },
  { title: 'Hoe Phase', artist: 'Drake', mood: 'Late night', color: 'plum' },
  { title: "Hold On, We're Going Home", artist: 'Drake', mood: 'Coup de cœur', color: 'mint' },
  { title: 'Canzoni Preferite (Torture Dance Song)', artist: 'Geek Music', mood: 'Bizarre', color: 'yellow' },
  { title: 'melodrama', artist: 'Disiz, Theodora', mood: 'Français', color: 'coral' },
  { title: "Nothin' on You", artist: 'B.o.B, Bruno Mars', mood: 'Soleil', color: 'orange' },
  { title: 'Is There Someone Else?', artist: 'The Weeknd', mood: 'Minuit', color: 'violet' },
  { title: 'Glamorous', artist: 'Ludacris, Fergie', mood: 'Iconique', color: 'pink' },
  { title: 'Shot For Me', artist: 'Drake', mood: 'Intime', color: 'sky' },
  { title: 'The Cut That Always Bleeds', artist: 'Conan Gray', mood: 'Cœur fragile', color: 'red' },
  { title: 'Careless Whisper', artist: 'George Michael', mood: 'Classique', color: 'teal' },
  { title: 'Flemme', artist: 'Angèle', mood: 'Chill', color: 'cream' },
  { title: 'Mystery of Love', artist: 'Sufjan Stevens', mood: 'Tendre', color: 'green' },
  { title: 'Flashing Lights', artist: 'Kanye West', mood: 'Nocturne', color: 'indigo' },
  { title: 'Starboy', artist: 'The Weeknd, Daft Punk', mood: 'Néon', color: 'magenta' },
  { title: 'we fell in love in october', artist: 'girl in red', mood: 'Automne', color: 'sage' },
  { title: 'Die For You', artist: 'The Weeknd', mood: 'Passion', color: 'burgundy' },
  { title: 'Transform', artist: 'Daniel Caesar, Charlotte Day Wilson', mood: 'Velours', color: 'brown' },
  { title: 'Be Like a Woman', artist: 'Chris Rainbow', mood: 'Découverte', color: 'aqua' },
  { title: 'Wonderwall', artist: 'Oasis', mood: 'Souvenir', color: 'blue' },
  { title: 'I Feel It Coming', artist: 'The Weeknd, Daft Punk', mood: 'Doux', color: 'gold' },
  { title: 'Le passé', artist: 'Aya Nakamura', mood: 'Français', color: 'rose' },
  { title: 'Cleopatre', artist: 'Tiakola', mood: 'Rap français', color: 'plum' },
  { title: "Don't", artist: 'Bryson Tiller', mood: 'R&B', color: 'coral' },
  { title: 'Pink + White', artist: 'Frank Ocean', mood: 'Coucher de soleil', color: 'peach' },
  { title: 'NIGHT DANCER', artist: 'imase', mood: 'Japon', color: 'lilac' },
]

const artists = [
  ['Drake', '1er artiste de toujours', 'hip-hop / rap'],
  ['Hamza', '2e artiste de toujours', 'rap français'],
  ['The Marías', 'Ton côté bedroom pop', 'dreamy'],
  ['The Weeknd', 'Le roi des nuits', 'R&B'],
  ['The Neighbourhood', 'Toujours dans la rotation', 'alternative'],
  ['Cigarettes After Sex', 'Pour les moments calmes', 'dream pop'],
]

export default function Page() {
  const [query, setQuery] = useState('')
  const [activeMood, setActiveMood] = useState('Tous')
  const filtered = useMemo(() => songs.filter((song) => {
    const matchesQuery = `${song.title} ${song.artist}`.toLowerCase().includes(query.toLowerCase())
    const matchesMood = activeMood === 'Tous' || song.mood === activeMood
    return matchesQuery && matchesMood
  }), [query, activeMood])

  const moods = ['Tous', ...Array.from(new Set(songs.map((song) => song.mood))).slice(0, 6)]

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">♪</span> pour toi</a>
        <nav aria-label="Navigation principale">
          <a href="#analyse">Analyse</a>
          <a href="#sons">Tes sons</a>
        </nav>
        <span className="date-pill">5 OCT. 2026</span>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">TON UNIVERS MUSICAL · 2026</p>
        <h1>Les chansons qui<br /><em>te ressemblent.</em></h1>
        <p className="hero-copy">J&apos;ai fouillé tes écoutes pour garder les morceaux qui reviennent toujours. Une petite bande-son de toi, entre nostalgie, R&B et nuits étoilées.</p>
        <a className="scroll-link" href="#sons"><span>↓</span> découvrir la playlist</a>
      </section>

      <section className="stats-grid" id="analyse" aria-label="Analyse de tes écoutes">
        <div className="stat-card featured"><span className="stat-label">TEMPS ÉCOUTÉ</span><strong>2h 40</strong><p>47 écoutes analysées</p><div className="mini-bars">{[40, 72, 52, 86, 64, 100, 48, 80].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div>
        <div className="stat-card"><span className="stat-label">TON ARTISTE N°1</span><strong>Drake</strong><p>Le plus présent dans tes écoutes</p><span className="rank">01 / 20</span></div>
        <div className="stat-card"><span className="stat-label">TON GENRE</span><strong>R&B</strong><p>Mais toujours un peu de chaos à côté</p><span className="rank">dreamy · nocturne · soul</span></div>
      </section>

      <section className="artists-section">
        <div className="section-heading"><div><p className="eyebrow">CE QUI REVIENT TOUJOURS</p><h2>Tes artistes préférés</h2></div><span className="section-count">01 — 06</span></div>
        <div className="artist-list">{artists.map(([artist, detail, genre], index) => <div className="artist-row" key={artist}><span className="artist-number">0{index + 1}</span><div><h3>{artist}</h3><p>{detail}</p></div><span className="artist-genre">{genre}</span><span className="arrow">↗</span></div>)}</div>
      </section>

      <section className="songs-section" id="sons">
        <div className="section-heading songs-heading"><div><p className="eyebrow">LA PLAYLIST DE TOI</p><h2>Tes sons préférés</h2><p className="section-intro">Ceux qui tournent <em>en boucle</em>, ceux qui arrivent au bon moment, ceux qui me font penser à toi.</p></div><div className="song-total"><strong>{songs.length}</strong><span>morceaux<br />sélectionnés</span></div></div>
        <div className="controls"><label className="search"><span>⌕</span><input aria-label="Rechercher un morceau" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un morceau ou un artiste" /></label><div className="filters" aria-label="Filtrer par ambiance">{moods.map((mood) => <button className={activeMood === mood ? 'active' : ''} key={mood} onClick={() => setActiveMood(mood)}>{mood}</button>)}</div></div>
        <div className="song-grid">{filtered.map((song, index) => <article className={`song-card ${song.color}`} key={`${song.title}-${song.artist}`}><div className="cover"><span>{String(index + 1).padStart(2, '0')}</span><b>♪</b></div><div className="song-info"><span className="song-mood">{song.mood}</span><h3>{song.title}</h3><p>{song.artist}</p></div><a className="play-button" href={`https://open.spotify.com/search/${encodeURIComponent(`${song.title} ${song.artist}`)}`} target="_blank" rel="noreferrer" aria-label={`Écouter ${song.title} de ${song.artist}`}>▶</a></article>)}</div>
        {filtered.length === 0 && <p className="empty-state">Aucun son trouvé. Essaie un autre mot.</p>}
      </section>

      <footer><p>fait avec tes écoutes, un peu de nostalgie et beaucoup d&apos;amour.</p><span>pour toi · 2026</span></footer>
    </main>
  )
}
