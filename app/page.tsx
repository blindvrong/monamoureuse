'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Heart, Pause, Play, Search, Shuffle } from 'lucide-react'
import { reasons } from '@/lib/reasons'

const songs = [
  { title: 'Silence', artist: 'Marshmello, Khalid', mood: 'Nostalgique', color: 'peach' },
  { title: "Who's Lovin' You", artist: 'The Jackson 5', mood: 'Soul', color: 'gold' },
  { title: 'Only Girl (In The World)', artist: 'Rihanna', mood: 'Énergie', color: 'rose' },
]

const artists = ['Drake', 'Hamza', 'The Marías', 'The Weeknd', 'The Neighbourhood', 'Cigarettes After Sex']
const moods = ['Tous', ...Array.from(new Set(songs.map((song) => song.mood))).slice(0, 6)]
const loveLetters = [
  {
    title: 'À toi, Lïa',
    paragraphs: [
      'Je sais pas vraiment par où commencer, alors je vais juste te dire les choses simplement : tu comptes énormément pour moi.',
      'J’aime passer du temps avec toi, parler de tout et de rien, rigoler pour rien, ou rester près de toi sans avoir besoin de trouver quoi dire.',
    ],
  },
  {
    title: 'Ta façon de parler',
    paragraphs: [
      'J’aime t’écouter parler, même quand le sujet part dans tous les sens.',
      'Ta façon de raconter les choses, de t’exprimer et de réagir, c’est vraiment toi. Et moi, j’aime ça.',
    ],
  },
  {
    title: 'Ton sourire',
    paragraphs: [
      'Ton sourire, c’est une de ces choses toutes simples qui me font du bien.',
      'Et quand je réussis à te faire rire, même pour une bêtise, je suis content. Voilà, je voulais que tu le saches.',
    ],
  },
  {
    title: 'Même sans parler',
    paragraphs: [
      'J’aime aussi les moments où on ne fait rien de particulier.',
      'Être avec toi, sans devoir remplir chaque silence, ça me va très bien. Je me sens bien, c’est tout.',
    ],
  },
  {
    title: 'Ta voix',
    paragraphs: [
      'Il y a quelque chose dans ta voix qui me fait toujours plaisir à entendre.',
      'Quand tu me racontes ta journée ou juste un petit truc qui te passe par la tête, j’aime être là pour t’écouter.',
    ],
  },
  {
    title: 'Tes petites habitudes',
    paragraphs: [
      'J’aime les petits détails qui font que tu es toi : tes habitudes, tes expressions, tes réactions.',
      'Ce ne sont peut-être que des choses simples, mais je les remarque et elles me font sourire.',
    ],
  },
  {
    title: 'Quand tu rougis',
    paragraphs: [
      'J’avoue, j’aime bien quand tu rougis quand je te dis que je t’aime.',
      'Pas pour te mettre mal à l’aise, juste parce que je trouve ça touchant de voir que ces mots te font quelque chose.',
    ],
  },
  {
    title: 'Nos discussions',
    paragraphs: [
      'J’aime qu’on puisse parler de tout et de rien, passer d’un sujet à un autre sans prévenir.',
      'Avec toi, une conversation toute simple me suffit largement.',
    ],
  },
  {
    title: 'Tes délires',
    paragraphs: [
      'Nos délires me font du bien. Même quand personne d’autre ne comprend pourquoi on rigole.',
      'J’aime cette complicité qu’on a, et la légèreté qu’elle apporte à ma journée.',
    ],
  },
  {
    title: 'Ton regard',
    paragraphs: [
      'J’aime ton regard et toutes les petites expressions qui passent sur ton visage.',
      'Il y a beaucoup de choses que j’aime chez toi, mais celle-là, je ne voulais pas l’oublier.',
    ],
  },
  {
    title: 'Juste toi',
    paragraphs: [
      'Tu n’as pas besoin d’en faire plus pour me plaire.',
      'J’aime la personne que tu es, dans les bons jours comme dans les jours plus ordinaires. C’est toi que j’aime.',
    ],
  },
  {
    title: 'Ton humour',
    paragraphs: [
      'J’aime ton humour et ta façon de me faire rire, parfois sans même essayer.',
      'Même une petite remarque de toi peut me mettre de bonne humeur.',
    ],
  },
  {
    title: 'Quand tu me racontes',
    paragraphs: [
      'J’aime quand tu me racontes ce que tu aimes, ce qui t’intéresse ou ce qui t’arrive.',
      'Je suis content que tu partages ces petits bouts de ta journée avec moi.',
    ],
  },
  {
    title: 'Ta douceur',
    paragraphs: [
      'J’aime les moments où tu me rassures et où tu me montres que je compte pour toi.',
      'Ça me fait du bien de pouvoir être moi-même avec toi.',
    ],
  },
  {
    title: 'Tu me fais du bien',
    paragraphs: [
      'Il suffit parfois d’un message de toi pour changer un peu ma journée.',
      'Je ne sais pas si tu t’en rends compte, mais ta présence compte beaucoup pour moi.',
    ],
  },
  {
    title: 'Ta personnalité',
    paragraphs: [
      'J’aime ta personnalité, ta manière de penser et ta façon de voir les choses.',
      'Même quand on n’a pas exactement le même avis, j’aime découvrir comment tu réfléchis.',
    ],
  },
  {
    title: 'Être moi avec toi',
    paragraphs: [
      'Avec toi, je peux parler de moi et être simplement comme je suis.',
      'C’est précieux pour moi, et je voulais te remercier pour ça.',
    ],
  },
  {
    title: 'Nos moments simples',
    paragraphs: [
      'Pas besoin d’un programme incroyable pour que je sois heureux avec toi.',
      'Une discussion, un rire ou un moment tranquille ensemble, ça me suffit.',
    ],
  },
  {
    title: 'Ta façon d’écrire',
    paragraphs: [
      'J’aime recevoir tes messages et voir ton nom apparaître sur mon téléphone.',
      'Même quelques mots de toi, ça me fait plaisir.',
    ],
  },
  {
    title: 'Quand tu es contente',
    paragraphs: [
      'J’aime te voir heureuse et entendre parler de ce qui te fait plaisir.',
      'Ton enthousiasme est contagieux, et ça me rend heureux aussi.',
    ],
  },
  {
    title: 'Notre complicité',
    paragraphs: [
      'J’aime ce petit truc à nous : nos blagues, nos regards et nos conversations qui n’appartiennent qu’à nous.',
      'Je me sens proche de toi, et ça compte beaucoup.',
    ],
  },
  {
    title: 'Tes réactions',
    paragraphs: [
      'J’aime tes réactions, même les plus spontanées.',
      'Elles me rappellent à quel point tu es toi, et c’est justement ça qui me plaît.',
    ],
  },
  {
    title: 'Prendre soin de toi',
    paragraphs: [
      'J’aime prendre soin de toi et être là quand tu as besoin de parler.',
      'Tu peux me dire ce que tu as sur le cœur. Je t’écoute.',
    ],
  },
  {
    title: 'On peut se parler',
    paragraphs: [
      'On n’est pas obligés d’être d’accord sur tout ni de tout comprendre du premier coup.',
      'Je préfère qu’on puisse se parler franchement, s’écouter et se rassurer.',
    ],
  },
  {
    title: 'Ta façon de penser',
    paragraphs: [
      'J’aime quand tu défends ton avis et que tu m’expliques ce que tu en penses.',
      'Tu me fais réfléchir, et j’aime apprendre à mieux te connaître.',
    ],
  },
  {
    title: 'Les petits détails',
    paragraphs: [
      'Il y a plein de petits trucs que tu fais sans y penser et que je trouve attachants.',
      'Je ne vais pas tous les lister, mais je les remarque. Et ça me plaît.',
    ],
  },
  {
    title: 'Tu comptes pour moi',
    paragraphs: [
      'Tu as une place importante dans ma vie, Lïa.',
      'Je tiens à toi, et j’aime pouvoir te le dire simplement, sans avoir besoin d’une occasion spéciale.',
    ],
  },
  {
    title: 'Notre petit monde',
    paragraphs: [
      'J’aime ce qu’on est quand on est tous les deux : nos discussions, nos rires et notre façon d’être ensemble.',
      'Je me sens bien dans ces moments-là.',
    ],
  },
  {
    title: 'Ce que je vois en toi',
    paragraphs: [
      'J’aime les côtés de toi que tu ne montres pas forcément à tout le monde.',
      'Merci de me laisser te connaître comme tu es.',
    ],
  },
  {
    title: 'Je t’aime parce que c’est toi',
    paragraphs: [
      'Je pourrais parler longtemps de ton sourire, de ta voix, de tes habitudes et de tout ce qu’on aime faire ensemble.',
      'Mais au fond, la raison la plus simple reste la meilleure : je t’aime parce que c’est toi. Personne d’autre ne peut être toi.',
    ],
  },
]

function SongCard({ song, index }: { song: typeof songs[number]; index: number }) {
  return <article className={`song-card ${song.color}`}>
    <div className="cover"><span>{String(index + 1).padStart(2, '0')}</span><b>♪</b></div>
    <div className="song-info"><span className="song-mood">{song.mood}</span><h3>{song.title}</h3><p>{song.artist}</p></div>
    <a className="play-button" href={`https://music.youtube.com/search?q=${encodeURIComponent(`${song.title} ${song.artist}`)}`} target="_blank" rel="noreferrer" aria-label={`Chercher ${song.title} de ${song.artist} sur YouTube Music`}><Play size={14} fill="currentColor" /></a>
  </article>
}

function LoveLetter() {
  const [reasonIndex, setReasonIndex] = useState(0)
  const [noteOrder, setNoteOrder] = useState([0, 1, 2])
  const [dailyLetterIndex, setDailyLetterIndex] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicBlocked, setMusicBlocked] = useState(false)
  const musicRef = useRef<HTMLAudioElement>(null)
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

    const anchor = Date.UTC(2026, 9, 5)
    const today = new Date()
    const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    const elapsedDays = Math.floor((todayUtc - anchor) / 86_400_000)
    setDailyLetterIndex(((elapsedDays % loveLetters.length) + loveLetters.length) % loveLetters.length)

    const audio = musicRef.current
    if (audio) {
      audio.volume = 0.14
      audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicBlocked(true))
    }
  }, [])

  function toggleMusic() {
    const audio = musicRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => {
        setMusicPlaying(true)
        setMusicBlocked(false)
      }).catch(() => setMusicBlocked(true))
    } else {
      audio.pause()
      setMusicPlaying(false)
    }
  }

  function showRandomReason() {
    setReasonIndex((current) => {
      let next = Math.floor(Math.random() * reasons.length)
      while (next === current && reasons.length > 1) next = Math.floor(Math.random() * reasons.length)
      return next
    })
  }

  return <section className="letter-section" id="lettre" aria-labelledby="lettre-title">
    <div className="section-heading letter-heading"><div><p className="eyebrow">une petite lettre pour lïa</p><h2 id="lettre-title">Quelques mots<br /><em>rien que pour toi.</em></h2></div><Heart className="letter-heart" fill="currentColor" aria-hidden="true" /></div>
    <p className="letter-intro">Lïa, je t&apos;aime pour plein de petites choses. Tu peux en découvrir une au hasard.</p>
    <div className="reason-card"><span className="reason-number">{String(reasonIndex + 1).padStart(2, '0')} / 100</span><p aria-live="polite">{reason.charAt(0).toUpperCase() + reason.slice(1)}.</p><button className="shuffle-button" type="button" onClick={showRandomReason}><Shuffle size={15} /> une autre raison</button></div>
    <div className="love-signoff"><span>je t&apos;aime,</span><strong>Lïa</strong></div>
    <div className="love-notes" aria-label="Petits mots pour Lïa">
      {noteOrder.map((noteIndex) => <p key={noteIndex}>{loveNotes[noteIndex]}</p>)}
    </div>
    <section className="love-letters" aria-labelledby="love-letters-title">
      <div className="love-letters-heading">
        <h3 id="love-letters-title">La lettre <em>du jour.</em></h3>
      </div>
      <article className="love-letter-paper" aria-live="polite" aria-atomic="true">
        <div className="love-letter-paper-topline">
          <span className="love-letter-paper-index">JOUR {String(dailyLetterIndex + 1).padStart(2, '0')} / 30</span>
          <Heart size={17} aria-hidden="true" />
        </div>
        <h4>{loveLetters[dailyLetterIndex].title}</h4>
        <div className="love-letter-body">
          {loveLetters[dailyLetterIndex].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="love-letter-signoff"><span>Je t’aime,</span><strong>Lïa</strong></div>
        <div className="love-letter-music">
          <div className="love-letter-music-copy">
            <span className="music-note" aria-hidden="true">♪</span>
            <span><strong>Piano tout doux</strong><small>En boucle pendant ta lecture</small></span>
          </div>
          <button
            className="music-toggle"
            type="button"
            onClick={toggleMusic}
            aria-pressed={musicPlaying}
            aria-label={musicPlaying ? 'Mettre la musique en pause' : 'Lancer la musique'}
          >
            {musicPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            <span>{musicPlaying ? 'Pause' : 'Écouter'}</span>
          </button>
          {musicBlocked && <small className="music-hint">Appuie sur « Écouter » pour lancer le piano.</small>}
          <audio ref={musicRef} src="piano-doux.wav" loop preload="auto" />
        </div>
      </article>
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
    <section className="songs-section" id="sons"><div className="section-heading songs-heading"><div><p className="eyebrow">les morceaux que je garde pour toi</p><h2>Tes sons préférés</h2><p className="section-intro">Ceux que tu écoutes souvent. Ceux qui me font penser à toi, même quand tu n&apos;es pas là.</p></div><div className="song-total" aria-live="polite"><strong>{filtered.length}</strong><span>morceaux<br />affichés</span></div></div><div className="controls"><label className="search"><Search size={16} aria-hidden="true" /><input type="search" aria-label="Rechercher un morceau" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un morceau ou un artiste" /></label><div className="filters" aria-label="Filtrer par ambiance">{moods.map((mood) => <button type="button" aria-pressed={activeMood === mood} className={activeMood === mood ? 'active' : ''} key={mood} onClick={() => setActiveMood(mood)}>{mood}</button>)}</div></div>{filtered.length > 0 ? <div className="song-grid">{filtered.map((song, index) => <SongCard key={`${song.title}-${song.artist}`} song={song} index={index} />)}</div> : <div className="empty-results" role="status"><p>Aucun morceau ne correspond à ta recherche.</p><button type="button" onClick={() => { setQuery(''); setActiveMood('Tous') }}>Effacer les filtres</button></div>}</section>
    <footer><p>j&apos;ai fait ça en pensant à toi.</p><span>pour toi, Lïa</span></footer>
  </main>
}
