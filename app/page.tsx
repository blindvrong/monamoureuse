'use client'

import { useMemo, useState } from 'react'
import { Heart, Play, Search, Shuffle, Volume2 } from 'lucide-react'
import { reasons } from '@/lib/reasons'

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
  const loveWords = ['mon évidence', 'mon endroit préféré', 'ma douceur', 'mon plus beau hasard', 'mon chez-moi']
  const reason = reasons[reasonIndex]

  function showRandomReason() {
    setReasonIndex((current) => {
      let next = Math.floor(Math.random() * reasons.length)
      while (next === current && reasons.length > 1) next = Math.floor(Math.random() * reasons.length)
      return next
    })
  }

  return <section className="letter-section" id="lettre" aria-labelledby="lettre-title">
    <div className="section-heading letter-heading"><div><p className="eyebrow">POUR LÏA, TOUT SIMPLEMENT</p><h2 id="lettre-title">Quelques mots<br /><em>rien que pour toi.</em></h2></div><Heart className="letter-heart" fill="currentColor" aria-hidden="true" /></div>
    <p className="letter-intro">Lïa, tu es {loveWords[reasonIndex % loveWords.length]}. Et si tu veux savoir pourquoi, laisse le hasard choisir une raison.</p>
    <div className="reason-card"><span className="reason-number">{String(reasonIndex + 1).padStart(2, '0')} / 100</span><p>{reason.charAt(0).toUpperCase() + reason.slice(1)}.</p><button className="shuffle-button" onClick={showRandomReason}><Shuffle size={15} /> une autre raison</button></div>
    <div className="love-signoff"><span>je t&apos;aime,</span><strong>Lïa</strong></div>
  </section>
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [activeMood, setActiveMood] = useState('Tous')
  const filtered = useMemo(() => songs.filter((song) => `${song.title} ${song.artist}`.toLowerCase().includes(query.toLowerCase()) && (activeMood === 'Tous' || song.mood === activeMood)), [query, activeMood])

  return <main className="site-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">♪</span> pour toi</a><nav aria-label="Navigation principale"><a href="#analyse">Analyse</a><a href="#sons">Tes sons</a><a href="#lettre">La lettre</a></nav><span className="date-pill">5 OCT. 2026</span></header>
    <LoveLetter />
    <section className="stats-grid" id="analyse" aria-label="Analyse de tes écoutes"><div className="stat-card featured"><span className="stat-label">TEMPS ÉCOUTÉ</span><strong>2h 40</strong><p>47 écoutes analysées</p><div className="mini-bars">{[40,72,52,86,64,100,48,80].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div><div className="stat-card"><span className="stat-label">TON ARTISTE N°1</span><strong>Drake</strong><p>Le plus présent dans tes écoutes</p><span className="rank">01 / 20</span></div><div className="stat-card"><span className="stat-label">TON GENRE</span><strong>R&B</strong><p>Mais toujours un peu de chaos à côté</p><span className="rank">dreamy · nocturne · soul</span></div></section>
    <section className="artists-section"><div className="section-heading"><div><p className="eyebrow">CE QUI REVIENT TOUJOURS</p><h2>Tes artistes préférés</h2></div><span className="section-count">01 — 06</span></div><div className="artist-list">{artists.map((artist, index) => <div className="artist-row" key={artist}><span className="artist-number">0{index + 1}</span><div><h3>{artist}</h3><p>{['1er artiste de toujours','2e artiste de toujours','Ton côté bedroom pop','Le roi des nuits','Toujours dans la rotation','Pour les moments calmes'][index]}</p></div><span className="artist-genre">{['hip-hop / rap','rap français','dreamy','R&B','alternative','dream pop'][index]}</span><span className="arrow">↗</span></div>)}</div></section>
    <section className="music-player-section top-player" aria-label="Ta musique préférée"><div><p className="eyebrow">LE SON QUI TE RESSEMBLE LE PLUS</p><h2>Silence <em>en fond.</em></h2><p>Marshmello & Khalid · ton morceau le plus marquant</p></div><div className="player-card"><div className="player-art">♪</div><div><strong>Silence</strong><span>Marshmello, Khalid</span><div className="player-line"><i /></div></div><Volume2 size={18} aria-hidden="true" /><a href="https://open.spotify.com/track/0SpI4pEG1JtTMhKzcpyEVg" target="_blank" rel="noreferrer" aria-label="Écouter Silence sur Spotify"><Play size={15} fill="currentColor" /></a></div></section>
    <section className="songs-section" id="sons"><div className="section-heading songs-heading"><div><p className="eyebrow">LA PLAYLIST DE TOI</p><h2>Tes sons préférés</h2><p className="section-intro">Ceux qui tournent <em>en boucle</em>, ceux qui arrivent au bon moment, ceux qui me font penser à toi.</p></div><div className="song-total"><strong>{songs.length}</strong><span>morceaux<br />sélectionnés</span></div></div><div className="controls"><label className="search"><Search size={16} /><input aria-label="Rechercher un morceau" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un morceau ou un artiste" /></label><div className="filters" aria-label="Filtrer par ambiance">{moods.map((mood) => <button className={activeMood === mood ? 'active' : ''} key={mood} onClick={() => setActiveMood(mood)}>{mood}</button>)}</div></div><div className="song-grid">{filtered.map((song, index) => <SongCard key={`${song.title}-${song.artist}`} song={song} index={index} />)}</div></section>
    <section className="music-player-section bottom-player" aria-label="Musique de fond pour Lïa"><div><p className="eyebrow">À ÉCOUTER EN LISANT</p><h2>Le son de Lïa.</h2><p>Appuie sur play, puis laisse la page te raconter votre histoire.</p></div><div className="spotify-frame"><iframe src="https://open.spotify.com/embed/track/0SpI4pEG1JtTMhKzcpyEVg?utm_source=generator&theme=0" title="Silence de Marshmello et Khalid" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></div></section>
    <LoveLetter />
    <footer><p>fait avec tes écoutes, un peu de nostalgie et beaucoup d&apos;amour.</p><span>pour toi · 2026</span></footer>
  </main>
}
