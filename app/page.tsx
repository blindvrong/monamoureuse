'use client'

import { useEffect, useState } from 'react'
import { Heart, Shuffle } from 'lucide-react'
import { reasons } from '@/lib/reasons'

type Song = {
  title: string
  artist: string
  spotifyId: string
}

const songs: Song[] = [
  { title: 'Heart To Heart', artist: 'Mac DeMarco', spotifyId: '7EAMXbLcL0qXmciM5SwMh2' },
  { title: 'I Wanna Be Yours', artist: 'Arctic Monkeys', spotifyId: '5XeFesFbtLpXzIVDNQP22n' },
  { title: 'we fell in love in october', artist: 'girl in red', spotifyId: '6IPwKM3fUUzlElbvKw2sKl' },
  { title: 'Lovers Rock', artist: 'TV Girl', spotifyId: '6dBUzqjtbnIa1TwYbyw5CM' },
  { title: 'Hush', artist: 'The Marías', spotifyId: '4zXZ5Mq2L6jnsOsTssgRh8' },
  { title: 'White Ferrari', artist: 'Frank Ocean', spotifyId: '2LMkwUfqC6S6s6qDVlEuzV' },
  { title: 'Duvet', artist: 'bôa', spotifyId: '42qNWdLKCI41S4uzfamhFM' },
  { title: 'The Blonde', artist: 'TV Girl', spotifyId: '72cGBEqu7RitIOoACXYjfR' },
]

const audioBasePath = process.env.NODE_ENV === 'production' ? '/monamoureuse' : ''
const letterProgressKey = 'monamoureuse-letter-progress'
const letterSongs = [
  { title: 'Passionfruit', artist: 'Drake', src: `${audioBasePath}/passionfruit.mp3` },
  { title: 'Make It Up', artist: 'Taylor Scott', src: `${audioBasePath}/make-it-up.mp3` },
]

const artists = ['Marshmello', 'Khalid', 'The Jackson 5', 'Rihanna', 'Taylor Scott']
const loveLetters = [
  {
    title: 'À toi, Lïa',
    paragraphs: [
      'Je sais pas vraiment par où commencer. Je sais juste que tu comptes énormément pour moi, et que je t’aime peut-être plus que je sais te le dire.',
      'J’aime passer du temps avec toi, parler de tout et de rien, rigoler pour rien, ou rester près de toi sans avoir besoin de trouver quoi dire.',
      'Je suis bien avec toi, même quand on ne fait rien. Tu me fais rire, même quand tu pars dans tes explications, et j’aime bien quand tu me racontes ta journée.',
    ],
  },
  {
    title: 'Ta façon de parler',
    paragraphs: [
      'J’aime t’écouter parler, même quand le sujet part dans tous les sens. J’aime quand tu pars dans tes explications et que j’ai juste envie de t’écouter.',
      'Ta façon de raconter les choses, de t’exprimer et de réagir, c’est vraiment toi. Et moi, j’aime ça.',
    ],
  },
  {
    title: 'Ton sourire',
    paragraphs: [
      'Ton sourire, c’est une de ces choses toutes simples qui me font du bien.',
      'Ton sourire, ta voix, ta façon d’être… tout chez toi me fait du bien. Et quand je réussis à te faire rire, même pour une bêtise, je suis content.',
    ],
  },
  {
    title: 'Même sans parler',
    paragraphs: [
      'J’aime aussi les moments où on ne fait rien de particulier. Même quand on fait rien du tout, être à côté de toi me suffit.',
      'Être avec toi, sans devoir remplir chaque silence, ça me va très bien. Je me sens bien, c’est tout.',
    ],
  },
  {
    title: 'Ta voix',
    paragraphs: [
      'Il y a quelque chose dans ta voix qui me fait toujours plaisir à entendre.',
      'Quand tu me racontes ta journée ou juste un petit truc qui te passe par la tête, j’aime être là pour t’écouter. Ça rend mes journées plus douces sans même que tu le remarques.',
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
      'Je ne sais pas si tu t’en rends compte, mais ta présence compte beaucoup pour moi. Penser à toi, c’est devenu mon endroit préféré.',
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
      'J’aime recevoir tes messages et voir ton nom apparaître sur mon téléphone. Chaque fois que ton nom s’affiche, ça me fait sourire.',
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

function FeaturedSong({ song }: { song: Song }) {
  return <article className="featured-song-card">
    <div className="featured-song-label">
      <span>LE SON DU JOUR</span>
      <p>{song.title} · {song.artist}</p>
    </div>
    <iframe
      className="featured-song-embed"
      src={`https://open.spotify.com/embed/track/${song.spotifyId}?theme=0`}
      title={`${song.title} de ${song.artist} sur Spotify`}
      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </article>
}

function CompactSongRow({ song }: { song: Song }) {
  return <article className="compact-song-row" aria-label={`${song.title} de ${song.artist}`}>
    <iframe
      className="compact-song-embed"
      src={`https://open.spotify.com/embed/track/${song.spotifyId}?theme=0`}
      title={`${song.title} de ${song.artist} sur Spotify`}
      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </article>
}

function LetterSongPlayer({ song }: { song: (typeof letterSongs)[number] }) {
  return <div className="love-letter-music">
    <div className="love-letter-music-copy">
      <span className="music-note" aria-hidden="true">♪</span>
      <span>
        <strong>{song.title}</strong>
        <small>{song.artist} · rien que pour toi</small>
      </span>
    </div>
    <audio className="love-letter-audio" controls preload="none">
      <source src={song.src} type="audio/mpeg" />
      Ton navigateur ne peut pas lire ce fichier audio.
    </audio>
  </div>
}

function LoveLetter() {
  const [reasonIndex, setReasonIndex] = useState(0)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [completedLetters, setCompletedLetters] = useState<Set<number>>(new Set())
  const [isLetterProgressLoaded, setIsLetterProgressLoaded] = useState(false)
  const reason = reasons[reasonIndex]

  useEffect(() => {
    const nextReason = Math.floor(Math.random() * reasons.length)
    setReasonIndex(nextReason)

    let storedCompleted: number[] = []
    let storedCurrent = 0
    try {
      const savedProgress = localStorage.getItem(letterProgressKey)
      if (savedProgress) {
        const parsed: unknown = JSON.parse(savedProgress)
        if (typeof parsed === 'object' && parsed !== null) {
          const progress = parsed as { completed?: unknown; current?: unknown }
          if (Array.isArray(progress.completed)) {
            storedCompleted = progress.completed.filter(
              (index): index is number => Number.isInteger(index) && index >= 0 && index < loveLetters.length,
            )
          }
          if (
            typeof progress.current === 'number'
            && Number.isInteger(progress.current)
            && progress.current >= 0
            && progress.current < loveLetters.length
          ) {
            storedCurrent = progress.current
          }
        }
      }
    } catch (error) {
      console.error('Impossible de charger la progression des lettres.', error)
    }

    const completed = new Set(storedCompleted)
    const nextUnread = loveLetters.findIndex((_, index) => index > storedCurrent && !completed.has(index))
    const firstUnread = loveLetters.findIndex((_, index) => !completed.has(index))
    const initialLetter = !completed.has(storedCurrent)
      ? storedCurrent
      : nextUnread !== -1
        ? nextUnread
        : firstUnread !== -1
          ? firstUnread
          : loveLetters.length - 1

    setCompletedLetters(completed)
    setCurrentLetterIndex(initialLetter)
    setIsLetterProgressLoaded(true)

  }, [])

  useEffect(() => {
    if (!isLetterProgressLoaded) return
    try {
      localStorage.setItem(letterProgressKey, JSON.stringify({
        completed: Array.from(completedLetters),
        current: currentLetterIndex,
      }))
    } catch (error) {
      console.error('Impossible d’enregistrer la progression des lettres.', error)
    }
  }, [completedLetters, currentLetterIndex, isLetterProgressLoaded])

  function showRandomReason() {
    setReasonIndex((current) => {
      let next = Math.floor(Math.random() * reasons.length)
      while (next === current && reasons.length > 1) next = Math.floor(Math.random() * reasons.length)
      return next
    })
  }

  function setCurrentLetterCompleted(isCompleted: boolean) {
    setCompletedLetters((current) => {
      const updated = new Set(current)
      if (isCompleted) updated.add(currentLetterIndex)
      else updated.delete(currentLetterIndex)
      return updated
    })
  }

  const isCurrentLetterCompleted = completedLetters.has(currentLetterIndex)
  const nextUnreadLetterIndex = loveLetters.findIndex(
    (_, index) => index > currentLetterIndex && !completedLetters.has(index),
  )

  return <section className="letter-section" id="lettre" aria-labelledby="lettre-title">
    <div className="section-heading letter-heading"><div><h2 id="lettre-title">Quelques mots<br /><em>rien que pour toi.</em></h2></div><Heart className="letter-heart" fill="currentColor" aria-hidden="true" /></div>
    <p className="letter-intro">Lïa, je t&apos;aime pour plein de petites choses. Tu peux en découvrir une au hasard.</p>
    <div className="reason-card"><span className="reason-number">{String(reasonIndex + 1).padStart(2, '0')} / 100</span><p aria-live="polite">{reason.charAt(0).toUpperCase() + reason.slice(1)}.</p><button className="shuffle-button" type="button" onClick={showRandomReason}><Shuffle size={15} /> une autre raison</button></div>
    <section className="love-letters" aria-labelledby="love-letters-title">
      <div className="love-letters-heading">
        <h3 id="love-letters-title">La lettre pour mon amour</h3>
      </div>
      <article className="love-letter-paper" aria-live="polite" aria-atomic="true">
        <div className="love-letter-paper-topline">
          <span className="love-letter-paper-index">LETTRE {String(currentLetterIndex + 1).padStart(2, '0')} / {loveLetters.length}</span>
          <Heart size={17} aria-hidden="true" />
        </div>
        <div className="letter-progress" role="progressbar" aria-label="Lettres terminées" aria-valuemin={0} aria-valuemax={loveLetters.length} aria-valuenow={completedLetters.size}>
          <span style={{ width: `${(completedLetters.size / loveLetters.length) * 100}%` }} />
        </div>
        <p className="love-letter-title">{loveLetters[currentLetterIndex].title}</p>
        <div className="love-letter-body">
          {loveLetters[currentLetterIndex].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="love-letter-signoff"><span>Je t’aime,</span><strong>Lïa</strong></div>
        <div className="letter-navigation">
          <label className="letter-complete-label">
            <input
              type="checkbox"
              checked={isCurrentLetterCompleted}
              disabled={!isLetterProgressLoaded}
              onChange={(event) => setCurrentLetterCompleted(event.target.checked)}
            />
            <span>J&apos;ai fini de lire cette lettre</span>
          </label>
          <span className="letters-read-count">{completedLetters.size} / {loveLetters.length} lues</span>
          {completedLetters.size === loveLetters.length ? (
            <p className="letters-finished-message">Tu as lu toutes les lettres. Je t’aime, Lïa. ♥</p>
          ) : (
            <button
              className="next-letter-button"
              type="button"
              disabled={!isCurrentLetterCompleted || nextUnreadLetterIndex === -1}
              onClick={() => setCurrentLetterIndex(nextUnreadLetterIndex)}
            >
              Lettre suivante <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
        {letterSongs.map((song) => <LetterSongPlayer key={song.title} song={song} />)}
      </article>
    </section>
  </section>
}

export default function Page() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(true)
  const [isRevealing, setIsRevealing] = useState(false)
  const featuredSong = songs[0]
  const otherSongs = songs.slice(1)

  function revealSurprise() {
    setIsRevealing(true)
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 750
    window.setTimeout(() => setIsSurpriseOpen(false), delay)
  }

  return <main className="site-shell" id="top">
    <div className={`site-content${isSurpriseOpen ? ' is-locked' : ''}${isRevealing ? ' is-revealing' : ''}`} inert={isSurpriseOpen}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <div className="topbar-note">
          <span className="topbar-note-mark"><Heart size={15} fill="currentColor" aria-hidden="true" /></span>
          <span className="topbar-note-title">Pour toi, Lïa</span>
          <span className="date-pill">5 OCT. 2026</span>
        </div>
      </header>
      <LoveLetter />
      <section className="stats-grid" id="analyse" aria-label="Analyse de tes écoutes"><div className="stat-card featured"><span className="stat-label">TEMPS ÉCOUTÉ</span><strong>2h 40</strong><p>47 écoutes analysées</p><div className="mini-bars">{[40,72,52,86,64,100,48,80].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div><div className="stat-card"><span className="stat-label">TON ARTISTE N°1</span><strong>Drake</strong><p>Le plus présent dans tes écoutes</p><span className="rank">01 / 20</span></div><div className="stat-card"><span className="stat-label">TON GENRE</span><strong>R&B</strong><p>Mais toujours un peu de chaos à côté</p><span className="rank">dreamy · nocturne · soul</span></div></section>
      <section className="artists-section"><div className="section-heading"><div><p className="eyebrow">CE QUI REVIENT TOUJOURS</p><h2>Tes artistes préférés</h2></div><span className="section-count">01 — 06</span></div><div className="artist-list">{artists.map((artist, index) => <div className="artist-row" key={artist}><span className="artist-number">0{index + 1}</span><div><h3>{artist}</h3><p>{['1er artiste de toujours','2e artiste de toujours','Ton côté bedroom pop','Le roi des nuits','Toujours dans la rotation','Pour les moments calmes'][index]}</p></div><span className="artist-genre">{['hip-hop / rap','rap français','dreamy','R&B','alternative','dream pop'][index]}</span><span className="arrow">↗</span></div>)}</div></section>
      <section className="songs-section" id="sons">
        <div className="section-heading songs-heading">
          <h2>Ceux qui tournent <em>en boucle</em> chez toi</h2>
        </div>
        {featuredSong ? (
          <>
            <FeaturedSong song={featuredSong} />
            {otherSongs.length > 0 && <div className="compact-song-list" aria-label="Les autres morceaux">
              <p className="compact-song-list-label">ET TOUS LES AUTRES</p>
              {otherSongs.map((song) => <CompactSongRow key={`${song.title}-${song.artist}`} song={song} />)}
            </div>}
          </>
        ) : (
          <div className="empty-results" role="status"><p>Aucun morceau à afficher.</p></div>
        )}
      </section>
      <footer><p>j&apos;ai fait ça en pensant à toi.</p><span>pour toi, Lïa</span></footer>
    </div>
    {isSurpriseOpen && <div className={`surprise-overlay${isRevealing ? ' is-leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="surprise-title">
      <div className="surprise-card">
        <span className="surprise-eyebrow">J&apos;AI QUELQUE CHOSE POUR TOI</span>
        <h1 id="surprise-title">Surprise<br /><em>mon chou</em></h1>
        <p>J&apos;ai préparé une petite surprise rien que pour toi.</p>
        <button className="surprise-button" type="button" onClick={revealSurprise} aria-label="Ouvrir la surprise">
          <Heart size={28} fill="currentColor" aria-hidden="true" />
        </button>
        <span className="surprise-hint">CLIQUE SUR LE CŒUR</span>
      </div>
    </div>}
  </main>
}
