'use client'

import { useEffect, useMemo, useState } from 'react'
import { Heart, Play, Search, Shuffle, Volume2 } from 'lucide-react'
import { reasons } from '@/lib/reasons'

const songs = [
  { title: 'Silence', artist: 'Marshmello, Khalid', mood: 'Nostalgique', color: 'peach' },
  { title: "Who's Lovin' You", artist: 'The Jackson 5', mood: 'Soul', color: 'gold' },
  { title: 'Only Girl (In The World)', artist: 'Rihanna', mood: 'Énergie', color: 'rose' },
]

const artists = ['Drake', 'Hamza', 'The Marías', 'The Weeknd', 'The Neighbourhood', 'Cigarettes After Sex']
const moods = ['Tous', ...Array.from(new Set(songs.map((song) => song.mood))).slice(0, 6)]
const loveLetterMusic = {
  title: 'Gymnopédie No. 1',
  artist: 'Erik Satie · Philippe Entremont',
  trackId: '5NGtFXVpXSvwunEIGeviY3',
}

const loveLetters = [
  {
    title: 'À toi, Lïa ❤️',
    preview: 'Tout ce que j’aime chez toi, simplement.',
    paragraphs: [
      'Je sais pas vraiment par où commencer, parce que j’ai beaucoup de choses à te dire.',
      'Tu as une place immense dans ma vie. Tu es la personne à qui je pense, avec qui j’aime passer du temps, parler de tout et de rien, rire pour absolument rien, ou juste rester là sans forcément parler.',
      'J’aime énormément de choses chez toi : ton sourire, ton regard, ta façon de parler, ta voix, tes petites habitudes et tes réactions. J’aime quand tu rougis quand je te dis que je t’aime, quand j’arrive à te faire sourire, et te voir être simplement toi-même.',
      'Mais ce que j’aime surtout, c’est la personne que tu es.',
      'J’aime notre complicité, nos délires, nos discussions random et tous ces moments simples qui comptent beaucoup pour moi. Même quand on ne fait rien de spécial, je me sens bien avec toi.',
      'Parfois, on ne se comprend pas tout de suite. Pour moi, l’important, c’est qu’on puisse se parler, s’écouter et se rassurer.',
      'Je ne cherche pas une relation parfaite. Je veux quelque chose de vrai, où on peut être nous-mêmes, dire ce qu’on ressent et se sentir bien ensemble.',
      'Si je devais résumer tout ça en une phrase : je t’aime pas seulement pour ce que tu fais ou ce que tu as. Je t’aime parce que c’est toi.',
    ],
  },
  {
    title: 'Un petit mot comme ça',
    preview: 'J’avais juste envie de te le dire.',
    paragraphs: [
      'Coucou toi,',
      'Je pensais à toi alors je t’écris. J’aime bien nos conversations, même quand on commence par un truc tout bête et qu’on finit par parler de tout. Et recevoir un message de toi, ça me fait toujours plaisir.',
      'Voilà, c’est tout. Je voulais juste te le dire.',
    ],
  },
  {
    title: 'Quand tu me manques',
    preview: 'Juste pour te dire que je pense à toi.',
    paragraphs: [
      'Ma belle,',
      'Tu me manques un peu aujourd’hui. J’espère que ta journée se passe bien. Raconte-moi quand tu auras le temps, ça me fera plaisir de te lire.',
      'À bientôt, j’espère. Je t’embrasse.',
    ],
  },
  {
    title: 'Ce que j’aime chez nous',
    preview: 'Sans grand discours.',
    paragraphs: [
      'Lïa,',
      'Je ne suis pas toujours très fort pour dire les choses, mais je suis vraiment bien avec toi. J’aime nos délires, nos discussions et même les moments où on ne fait rien de spécial.',
      'J’espère qu’on continuera à en avoir plein. Je t’aime.',
    ],
  },
]

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
  const [activeLetter, setActiveLetter] = useState(0)
  const loveNotes = [
    'J’aime bien quand tu me racontes ta journée.',
    'Tu me fais rire, même quand tu pars dans tes explications.',
    'Je suis bien avec toi, même quand on ne fait rien.',
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
    <p className="letter-intro">Lïa, j&apos;avais envie de te laisser quelques mots ici. Et si tu veux, tu peux piocher une raison pour laquelle je t&apos;aime.</p>
    <div className="reason-card"><span className="reason-number">{String(reasonIndex + 1).padStart(2, '0')} / 100</span><p aria-live="polite">{reason.charAt(0).toUpperCase() + reason.slice(1)}.</p><button className="shuffle-button" type="button" onClick={showRandomReason}><Shuffle size={15} /> une autre raison</button></div>
    <div className="love-signoff"><span>je t&apos;aime,</span><strong>Lïa</strong></div>
    <div className="love-notes" aria-label="Petits mots pour Lïa">
      {noteOrder.map((noteIndex) => <p key={noteIndex}>{loveNotes[noteIndex]}</p>)}
    </div>
    <section className="love-letters" aria-labelledby="love-letters-title">
      <div className="love-letters-heading">
        <p className="eyebrow">à ouvrir quand tu veux</p>
        <h3 id="love-letters-title">Des lettres <em>pour toi.</em></h3>
        <p>Choisis juste celle que tu as envie de lire.</p>
      </div>
      <div className="love-letters-layout">
        <div className="love-letter-list" role="group" aria-label="Choisir une lettre">
          {loveLetters.map((letter, index) => (
            <button
              type="button"
              className={`love-letter-choice${activeLetter === index ? ' active' : ''}`}
              aria-pressed={activeLetter === index}
              key={letter.title}
              onClick={() => setActiveLetter(index)}
            >
              <span className="love-letter-index">0{index + 1}</span>
              <span className="love-letter-choice-copy">
                <strong>{letter.title}</strong>
                <small>{letter.preview}</small>
              </span>
              <span className="love-letter-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <article className="love-letter-paper" aria-live="polite" aria-atomic="true">
          <span className="love-letter-paper-index">LETTRE {String(activeLetter + 1).padStart(2, '0')} / {String(loveLetters.length).padStart(2, '0')}</span>
          <h4>{loveLetters[activeLetter].title}</h4>
          <div className="love-letter-body">
            {loveLetters[activeLetter].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="love-letter-signoff"><span>Je t’aime,</span><strong>Lïa</strong></div>
          {activeLetter === 0 && (
            <div className="love-letter-music">
              <p>Gymnopédie No. 1 · Erik Satie</p>
              <iframe
                title={`${loveLetterMusic.title} de ${loveLetterMusic.artist} — musique douce pour accompagner la lettre`}
                src={`https://open.spotify.com/embed/track/${loveLetterMusic.trackId}?utm_source=generator&theme=0&autoplay=1`}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="eager"
              />
              <small>Si ton navigateur bloque la lecture automatique, appuie sur lecture.</small>
            </div>
          )}
        </article>
      </div>
    </section>
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
    <section className="music-player-section top-player" aria-label="Ta musique préférée"><div><p className="eyebrow">LE SON QUI TE RESSEMBLE LE PLUS</p><h2>{loveLetterMusic.title} <em>en fond.</em></h2><p>{loveLetterMusic.artist} · un peu de douceur</p></div><div className="player-card"><div className="player-art">♪</div><div><strong>{loveLetterMusic.title}</strong><span>{loveLetterMusic.artist}</span><div className="player-line"><i /></div></div><Volume2 size={18} aria-hidden="true" /><a href={`https://open.spotify.com/track/${loveLetterMusic.trackId}`} target="_blank" rel="noreferrer" aria-label={`Écouter ${loveLetterMusic.title} sur Spotify`}><Play size={15} fill="currentColor" /></a></div></section>
    <section className="songs-section" id="sons"><div className="section-heading songs-heading"><div><p className="eyebrow">les morceaux que je garde pour toi</p><h2>Tes sons préférés</h2><p className="section-intro">Ceux que tu écoutes souvent. Ceux qui me font penser à toi, même quand tu n&apos;es pas là.</p></div><div className="song-total" aria-live="polite"><strong>{filtered.length}</strong><span>morceaux<br />affichés</span></div></div><div className="controls"><label className="search"><Search size={16} aria-hidden="true" /><input type="search" aria-label="Rechercher un morceau" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un morceau ou un artiste" /></label><div className="filters" aria-label="Filtrer par ambiance">{moods.map((mood) => <button type="button" aria-pressed={activeMood === mood} className={activeMood === mood ? 'active' : ''} key={mood} onClick={() => setActiveMood(mood)}>{mood}</button>)}</div></div>{filtered.length > 0 ? <div className="song-grid">{filtered.map((song, index) => <SongCard key={`${song.title}-${song.artist}`} song={song} index={index} />)}</div> : <div className="empty-results" role="status"><p>Aucun morceau ne correspond à ta recherche.</p><button type="button" onClick={() => { setQuery(''); setActiveMood('Tous') }}>Effacer les filtres</button></div>}</section>
    <section className="music-player-section bottom-player" aria-label="Musique de fond pour Lïa"><div><p className="eyebrow">À ÉCOUTER EN LISANT</p><h2>Le son de Lïa.</h2><p>Un piano tout doux pour accompagner ta lettre.</p></div><a className="spotify-frame" href={`https://open.spotify.com/track/${loveLetterMusic.trackId}`} target="_blank" rel="noreferrer" aria-label={`Ouvrir ${loveLetterMusic.title} de ${loveLetterMusic.artist} sur Spotify`}><div className="spotify-frame-art">♪</div><div><strong>{loveLetterMusic.title}</strong><span>{loveLetterMusic.artist}</span><small>Écouter sur Spotify ↗</small></div></a></section>
    <footer><p>j&apos;ai fait ça en pensant à toi.</p><span>pour toi, Lïa</span></footer>
  </main>
}
