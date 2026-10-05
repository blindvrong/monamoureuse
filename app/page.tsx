'use client'

import { useEffect, useMemo, useState } from 'react'
import { Heart, Play, Search, Shuffle, Volume2 } from 'lucide-react'
import { reasons } from '@/lib/reasons'

const songs = [
  { title: 'Silence', artist: 'Marshmello, Khalid', mood: 'Nostalgique', color: 'peach' },
  { title: "Who's Lovin' You", artist: 'The Jackson 5', mood: 'Soul', color: 'gold' },
  { title: 'Only Girl (In The World)', artist: 'Rihanna', mood: 'Énergie', color: 'rose' },
  { title: 'MOOO!', artist: 'Doja Cat', mood: 'Confiance', color: 'lilac' },
]

const artists = ['Drake', 'Hamza', 'The Marías', 'The Weeknd', 'The Neighbourhood', 'Cigarettes After Sex']
const moods = ['Tous', ...Array.from(new Set(songs.map((song) => song.mood))).slice(0, 6)]

function SongCard({ song, index }: { song: typeof songs[number]; index: number }) {
  return <article className={`song-card ${song.color}`}>
    <div className="cover"><span>{String(index + 1).padStart(2, '0')}</span><b>♪</b></div>
    <div className="song-info"><span className="song-mood">{song.mood}</span><h3>{song.title}</h3><p>{song.artist}</p></div>
    <a className="play-button" href={`https://open.spotify.com/search/${encodeURIComponent(`${song.title} ${song.artist}`)}`} target="_blank" rel="noreferrer" aria-label={`Écouter ${song.title} de ${song.artist}`}><Play size={14} fill="currentColor" /></a>
  </article>
}

function LoveLetter() {
  const [reasonIndex, setReasonIndex] = useState(0)
  const [noteOrder, setNoteOrder] = useState([0, 1, 2])
  const loveNotes = [
    'Tu es mon plus joli hasard.',
    'Avec toi, même les jours ordinaires deviennent précieux.',
    'Je te choisirais encore, dans toutes les vies.',
  ]
  const reason = reasons[reasonIndex]

  useEffect(() => {
    const nextReason = Math.floor(Math.random() * reasons.length)
    const shuffledNotes = [0, 1, 2].sort(() => Math.random() - 0.5)
    setReasonIndex(nextReason)
    setNoteOrder(shuffledNotes)
  }, [])

  function showRandomReason() {
    setReasonIndex((current) => {
      let next = Math.floor(Math.random() * reasons.length)
      while (next === current && reasons.length > 1) next = Math.floor(Math.random() * reasons.length)
      return next
    })
  }

  return <section className="letter-section" id="lettre" aria-labelledby="lettre-title">
    <div className="section-heading letter-heading"><div><p className="eyebrow">une petite lettre pour lïa</p><h2 id="lettre-title">Quelques mots<br /><em>rien que pour toi.</em></h2></div><Heart className="letter-heart" fill="currentColor" aria-hidden="true" /></div>
    <p className="letter-intro">Lïa, j&apos;ai mis ici les petits morceaux de toi que je garde dans ma tête. Et si tu veux savoir pourquoi je t&apos;aime, laisse le hasard choisir une raison.</p>
    <div className="reason-card"><span className="reason-number">{String(reasonIndex + 1).padStart(2, '0')} / 100</span><p aria-live="polite">{reason.charAt(0).toUpperCase() + reason.slice(1)}.</p><button className="shuffle-button" type="button" onClick={showRandomReason}><Shuffle size={15} /> une autre raison</button></div>
    <div className="love-signoff"><span>je t&apos;aime,</span><strong>Lïa</strong></div>
    <div className="love-notes" aria-label="Petits mots pour Lïa">
      {noteOrder.map((noteIndex) => <p key={noteIndex}>{loveNotes[noteIndex]}</p>)}
    </div>
  </section>
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [activeMood, setActiveMood] = useState('Tous')
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fr')
    return songs.filter((song) =>
      `${song.title} ${song.artist}`.toLocaleLowerCase('fr').includes(normalizedQuery) &&
      (activeMood === 'Tous' || song.mood === activeMood),
    )
  }, [query, activeMood])

  return <main className="site-shell" id="top">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">♪</span> pour toi</a><nav aria-label="Navigation principale"><a href="#analyse">Analyse</a><a href="#sons">Tes sons</a><a href="#lettre">La lettre</a></nav><span className="date-pill">5 OCT. 2026</span></header>
    <LoveLetter />
    <section className="stats-grid" id="analyse" aria-label="Analyse de tes écoutes"><div className="stat-card featured"><span className="stat-label">TEMPS ÉCOUTÉ</span><strong>2h 40</strong><p>47 écoutes analysées</p><div className="mini-bars">{[40,72,52,86,64,100,48,80].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div><div className="stat-card"><span className="stat-label">TON ARTISTE N°1</span><strong>Drake</strong><p>Le plus présent dans tes écoutes</p><span className="rank">01 / 20</span></div><div className="stat-card"><span className="stat-label">TON GENRE</span><strong>R&B</strong><p>Mais toujours un peu de chaos à côté</p><span className="rank">dreamy · nocturne · soul</span></div></section>
    <section className="artists-section"><div className="section-heading"><div><p className="eyebrow">CE QUI REVIENT TOUJOURS</p><h2>Tes artistes préférés</h2></div><span className="section-count">01 — 06</span></div><div className="artist-list">{artists.map((artist, index) => <div className="artist-row" key={artist}><span className="artist-number">0{index + 1}</span><div><h3>{artist}</h3><p>{['1er artiste de toujours','2e artiste de toujours','Ton côté bedroom pop','Le roi des nuits','Toujours dans la rotation','Pour les moments calmes'][index]}</p></div><span className="artist-genre">{['hip-hop / rap','rap français','dreamy','R&B','alternative','dream pop'][index]}</span><span className="arrow">↗</span></div>)}</div></section>
    <section className="music-player-section top-player" aria-label="Ta musique préférée"><div><p className="eyebrow">LE SON QUI TE RESSEMBLE LE PLUS</p><h2>Silence <em>en fond.</em></h2><p>Marshmello & Khalid · ton morceau le plus marquant</p></div><div className="player-card"><div className="player-art">♪</div><div><strong>Silence</strong><span>Marshmello, Khalid</span><div className="player-line"><i /></div></div><Volume2 size={18} aria-hidden="true" /><a href="https://open.spotify.com/track/0SpI4pEG1JtTMhKzcpyEVg" target="_blank" rel="noreferrer" aria-label="Écouter Silence sur Spotify"><Play size={15} fill="currentColor" /></a></div></section>
    <section className="songs-section" id="sons"><div className="section-heading songs-heading"><div><p className="eyebrow">les morceaux que je garde pour toi</p><h2>Tes sons préférés</h2><p className="section-intro">Ceux que tu écoutes souvent. Ceux qui me font penser à toi, même quand tu n&apos;es pas là.</p></div><div className="song-total" aria-live="polite"><strong>{filtered.length}</strong><span>morceaux<br />affichés</span></div></div><div className="controls"><label className="search"><Search size={16} aria-hidden="true" /><input type="search" aria-label="Rechercher un morceau" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un morceau ou un artiste" /></label><div className="filters" aria-label="Filtrer par ambiance">{moods.map((mood) => <button type="button" aria-pressed={activeMood === mood} className={activeMood === mood ? 'active' : ''} key={mood} onClick={() => setActiveMood(mood)}>{mood}</button>)}</div></div>{filtered.length > 0 ? <div className="song-grid">{filtered.map((song, index) => <SongCard key={`${song.title}-${song.artist}`} song={song} index={index} />)}</div> : <div className="empty-results" role="status"><p>Aucun morceau ne correspond à ta recherche.</p><button type="button" onClick={() => { setQuery(''); setActiveMood('Tous') }}>Effacer les filtres</button></div>}</section>
    <section className="music-player-section bottom-player" aria-label="Musique de fond pour Lïa"><div><p className="eyebrow">À ÉCOUTER EN LISANT</p><h2>Le son de Lïa.</h2><p>Appuie sur play, puis laisse la page te raconter votre histoire.</p></div><a className="spotify-frame" href="https://open.spotify.com/track/0SpI4pEG1JtTMhKzcpyEVg" target="_blank" rel="noreferrer" aria-label="Ouvrir Silence de Marshmello et Khalid sur Spotify"><div className="spotify-frame-art">♪</div><div><strong>Silence</strong><span>Marshmello, Khalid</span><small>Écouter sur Spotify ↗</small></div></a></section>
    <footer><p>j&apos;ai fait ça en pensant à toi.</p><span>pour toi, Lïa</span></footer>
  </main>
}
