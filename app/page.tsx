'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart, Shuffle } from 'lucide-react'
import { reasons } from '@/lib/reasons'
import { loveLetters } from '@/lib/love-letters'

const audioBasePath = process.env.NODE_ENV === 'production' ? '/monamoureuse' : ''
const letterNotificationUrl = process.env.NEXT_PUBLIC_LETTER_NOTIFICATION_URL
const letterProgressKey = 'monamoureuse-letter-progress-v4'
const siteVisitKey = 'monamoureuse-site-visited-v1'
const letterSongs = [
  { title: 'Passionfruit', artist: 'Drake', src: `${audioBasePath}/passionfruit.mp3` },
  { title: 'Make It Up', artist: 'Taylor Scott', src: `${audioBasePath}/make-it-up.mp3` },
  { title: 'Nervous', src: `${audioBasePath}/nervous.mp3` },
]

const artists = ['Marshmello', 'Khalid', 'The Jackson 5', 'Rihanna', 'Taylor Scott']
const finalLetterParagraphs = [
  'Je sais pas vraiment par où commencer parce qu’au final, j’ai tellement de choses à te dire que même une lettre entière suffirait pas.',
  'Depuis que t’es entrée dans ma vie, t’as pris une place énorme. T’es devenue une personne à qui je pense énormément, une personne avec qui j’aime passer du temps, parler de tout et de rien, rigoler pour absolument rien et même juste rester là sans forcément parler.',
  'J’aime énormément de choses chez toi. Ton sourire, ton regard, ta façon de parler, ta façon de t’exprimer, ta voix, tes petites habitudes, tes réactions… même les petits trucs que tu fais sans t’en rendre compte. J’aime quand tu rougis quand je te dis que je t’aime, j’aime quand j’arrive à te faire sourire et j’aime simplement te voir être toi-même.',
  'Mais ce que j’aime surtout, c’est la personne que t’es.',
  'J’aime notre complicité, nos délires, nos discussions random, nos souvenirs et tous ces petits moments qui peuvent sembler simples mais qui comptent énormément pour moi. Même un moment où on fait rien peut devenir un bon souvenir juste parce que je suis avec toi.',
  'On a aussi eu des moments compliqués. On s’est parfois mal compris, on s’est embrouillés, on a pu se blesser sans forcément le vouloir. Mais malgré ça, ce qui compte pour moi, c’est qu’on arrive à parler, à se comprendre et à avancer ensemble.',
  'Je veux pas d’une relation parfaite où on ne se dispute jamais. Je veux juste quelque chose de vrai. Quelque chose où on peut être nous-mêmes, se dire quand quelque chose va pas, se rassurer et continuer à construire notre histoire.',
  'Je veux encore plein de souvenirs avec toi. Encore plein de moments où on rigole pour rien, de conversations interminables, de journées simples qui deviennent importantes juste parce qu’on les a vécues ensemble.',
  'Et si je devais résumer tout ça en une seule phrase :',
  'je t’aime pas seulement pour tout ce que tu fais ou tout ce que t’as, je t’aime parce que c’est toi.',
  'Et personne d’autre pourrait être toi.',
]
const beginningsParagraphs = [
  'Je repense souvent à nos premières parties de Phasmophobia. On s’est rencontrés au milieu d’une enquête, sans savoir que ce moment allait ouvrir une si belle histoire.',
  'Après ça, on a continué à parler, d’abord sur Discord, puis sur Snap. Petit à petit, les messages sont devenus des habitudes, les habitudes des conversations qu’on attendait, et les conversations cette complicité qui n’appartient qu’à nous.',
  'J’ai appris à aimer nos délires, nos discussions qui partent dans tous les sens et ces moments simples où ta présence suffit à rendre ma journée plus belle.',
  'Tout n’a pas toujours été facile. On a connu des incompréhensions et des moments où il a fallu s’écouter et se retrouver. Mais je tiens à nous, à ce qu’on construit, et à la façon dont on continue d’avancer ensemble.',
  'Aujourd’hui, quand je repense à ce début inattendu, je suis surtout reconnaissant que cette partie nous ait fait nous rencontrer. Je ne sais pas tout ce que l’avenir nous réserve, mais j’ai envie de continuer à écrire la suite avec toi.',
]
const comfortNotes = [
  {
    id: 'smile',
    prompt: 'Quand tu as besoin de sourire',
    title: 'Je parie que ton sourire est toujours aussi beau',
    paragraphs: [
      'Même dans les journées un peu grises, j’espère qu’un petit quelque chose réussira à te faire sourire.',
      'Et si tu ne trouves rien, rappelle-toi qu’il y a quelqu’un qui pense à toi et qui aime te voir heureuse. ♥',
    ],
  },
  {
    id: 'miss',
    prompt: 'Quand je te manque',
    title: 'Un petit bout de moi près de toi',
    paragraphs: [
      'Même quand on n’est pas côte à côte, tu gardes une place toute particulière dans mes pensées.',
      'Pense à l’un de nos délires, à une conversation qui t’a fait rire, ou simplement au fait qu’on se retrouvera bientôt pour se raconter plein de choses.',
    ],
  },
  {
    id: 'hard-day',
    prompt: 'Quand ta journée est difficile',
    title: 'Tu n’as pas besoin de tout porter d’un coup',
    paragraphs: [
      'Tu as le droit d’être fatiguée, de faire une pause et de prendre les choses une à une. Tu n’as pas besoin d’avoir toutes les réponses maintenant.',
      'J’espère que demain sera plus doux. En attendant, je t’envoie tout mon amour et un gros câlin à distance.',
    ],
  },
  {
    id: 'love',
    prompt: 'Quand tu veux un mot doux',
    title: 'C’est toi que je choisis',
    paragraphs: [
      'J’aime nos petits moments, nos discussions et cette complicité qu’on a construite à notre façon.',
      'Je suis heureux que nos chemins se soient croisés, mon chou. Je t’aime pour la personne que tu es, tout simplement.',
    ],
  },
]

function LetterSongPlayer({ song, onPlay }: { song: (typeof letterSongs)[number]; onPlay: () => void }) {
  return <div className="love-letter-music">
    <div className="love-letter-music-copy">
      <span className="music-note" aria-hidden="true">♪</span>
      <span>
        <strong>{song.title}</strong>
        <small>{song.artist ? `${song.artist} · ` : ''}rien que pour toi</small>
      </span>
    </div>
    <audio className="love-letter-audio" controls preload="metadata" onPlay={onPlay}>
      <source src={song.src} type="audio/mpeg" />
      Ton navigateur ne peut pas lire ce fichier audio.
    </audio>
  </div>
}

function LoveLetter({ isReturningVisitor }: { isReturningVisitor: boolean }) {
  const [reasonIndex, setReasonIndex] = useState(0)
  const [openComfortNoteId, setOpenComfortNoteId] = useState<string | null>(null)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [completedLetters, setCompletedLetters] = useState<Set<number>>(new Set())
  const [isLetterProgressLoaded, setIsLetterProgressLoaded] = useState(false)
  const [areLettersRevealed, setAreLettersRevealed] = useState(false)
  const [notificationStatus, setNotificationStatus] = useState('')
  const [isAllReadConfirmed, setIsAllReadConfirmed] = useState(false)
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

  function revealLetters() {
    setAreLettersRevealed(true)
  }

  async function notifyLetterRead(letterIndex: number) {
    if (!letterNotificationUrl) {
      setNotificationStatus('Les alertes e-mail ne sont pas configurées sur le site.')
      return false
    }
    setNotificationStatus('Envoi de l’alerte e-mail…')
    try {
      const response = await fetch(letterNotificationUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          letterNumber: letterIndex + 1,
          letterTitle: loveLetters[letterIndex].title,
        }),
      })
      if (response.status === 503) {
        setNotificationStatus('Le service e-mail doit être configuré dans Cloudflare avant de pouvoir envoyer une alerte.')
        return false
      }
      if (!response.ok) throw new Error(`Le service d’alerte a répondu ${response.status}.`)
      setNotificationStatus('Alerte e-mail envoyée.')
      return true
    } catch (error) {
      console.error('Impossible d’envoyer l’alerte e-mail de lecture.', error)
      setNotificationStatus('L’alerte e-mail n’a pas pu être envoyée.')
      return false
    }
  }

  async function goToNextLetter() {
    if (notificationStatus === 'Envoi de l’alerte e-mail…') return
    const nextLetterIndex = nextUnreadLetterIndex
    if (nextLetterIndex === -1) return

    setCurrentLetterIndex(nextLetterIndex)
    await notifyLetterRead(currentLetterIndex)
  }

  async function confirmAllLettersRead() {
    if (notificationStatus === 'Envoi de l’alerte e-mail…') return
    setIsAllReadConfirmed(true)
    await notifyLetterRead(currentLetterIndex)
  }

  const isCurrentLetterCompleted = completedLetters.has(currentLetterIndex)
  const nextUnreadLetterIndex = loveLetters.findIndex(
    (_, index) => index > currentLetterIndex && !completedLetters.has(index),
  )

  return <section className="letter-section" id="lettre" aria-labelledby="lettre-title">
    <div className="section-heading letter-heading"><div><h2 id="lettre-title">Quelques mots<br /><em>rien que pour toi.</em></h2></div><Heart className="letter-heart" fill="currentColor" aria-hidden="true" /></div>
    {isReturningVisitor && <p className="returning-visitor-note">Bon retour, mon chou. Ça me fait plaisir de te retrouver, Lïa. <span aria-hidden="true">♥</span></p>}
    <p className="letter-intro">Lïa, je t&apos;aime pour plein de petites choses. Tu peux en découvrir une au hasard.</p>
    <div className="reason-card"><span className="reason-number">{String(reasonIndex + 1).padStart(2, '0')} / 100</span><p aria-live="polite">{reason.charAt(0).toUpperCase() + reason.slice(1)}.</p><button className="shuffle-button" type="button" onClick={showRandomReason}><Shuffle size={15} /> une autre raison</button></div>
    <section className="beginnings-card" aria-labelledby="beginnings-title">
      <div className="beginnings-kicker"><span>LE DÉBUT DE NOUS</span><Heart size={16} fill="currentColor" aria-hidden="true" /></div>
      <h3 id="beginnings-title">De Phasmophobia à notre histoire</h3>
      <div className="beginnings-body">
        {beginningsParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <p className="beginnings-signoff">Et je suis heureux que nos chemins se soient croisés. <span aria-hidden="true">♥</span></p>
    </section>
    <section className="comfort-notes" aria-labelledby="comfort-notes-title">
      <div className="comfort-notes-heading">
        <span className="comfort-notes-kicker">QUAND TU EN AS ENVIE</span>
        <h3 id="comfort-notes-title">À ouvrir quand…</h3>
        <p>Choisis le petit mot dont tu as besoin aujourd’hui.</p>
      </div>
      <div className="comfort-note-choices">
        {comfortNotes.map((note) => <button
          className={`comfort-note-choice${openComfortNoteId === note.id ? ' is-open' : ''}`}
          type="button"
          key={note.id}
          aria-expanded={openComfortNoteId === note.id}
          onClick={() => setOpenComfortNoteId((current) => current === note.id ? null : note.id)}
        >
          <Heart size={16} aria-hidden="true" />
          <span>{note.prompt}</span>
          <span className="comfort-note-arrow" aria-hidden="true">{openComfortNoteId === note.id ? '−' : '＋'}</span>
        </button>)}
      </div>
      {openComfortNoteId && (() => {
        const note = comfortNotes.find((item) => item.id === openComfortNoteId)
        if (!note) return null
        return <article className="comfort-note-message" id="comfort-note-message" aria-live="polite">
          <span className="comfort-note-message-label">UN PETIT MOT POUR TOI</span>
          <h4>{note.title}</h4>
          {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
      })()}
    </section>
    <section className="love-letters" aria-labelledby="love-letters-title">
      <div className="love-letters-heading">
        <h3 id="love-letters-title">La lettre pour mon amour</h3>
      </div>
      {isAllReadConfirmed ? (
        <article className="letters-thank-you" aria-labelledby="final-letter-title">
          <header className="final-letter-heading">
            <Heart className="letters-thank-you-heart" fill="currentColor" aria-hidden="true" />
            <h3 id="final-letter-title">À toi, Lïa <span aria-hidden="true">❤️</span></h3>
          </header>
          <div className="final-letter-body">
            {finalLetterParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="final-letter-signoff">Je t’aime Lïa <span aria-hidden="true">❤️</span></p>
        </article>
      ) : (
        <>
          <article className="love-letter-paper" aria-live="polite" aria-atomic="true">
        <div className="letter-audio-gate">
          {letterSongs.map((song) => <LetterSongPlayer key={song.title} song={song} onPlay={revealLetters} />)}
          {!areLettersRevealed && <p className="letter-audio-hint">Lance l’un des {letterSongs.length} sons pour découvrir les lettres.</p>}
        </div>
        <div className={`letter-reveal-wrap${areLettersRevealed ? '' : ' is-locked'}`}>
          <div className="letter-reveal-content" inert={!areLettersRevealed} aria-hidden={!areLettersRevealed}>
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
                <>
                  <p className="letters-finished-message">Tu as lu toutes les lettres. Je t’aime, Lïa. ♥</p>
                  <button
                    className="next-letter-button"
                    type="button"
                    disabled={notificationStatus === 'Envoi de l’alerte e-mail…'}
                    onClick={confirmAllLettersRead}
                  >
                    J’ai tout lu
                  </button>
                </>
              ) : (
                <button
                  className="next-letter-button"
                  type="button"
                  disabled={!isCurrentLetterCompleted || nextUnreadLetterIndex === -1}
                  onClick={goToNextLetter}
                >
                  Lettre suivante <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
          {!areLettersRevealed && (
            <div className="letter-reveal-overlay" role="status">
              <span className="letter-reveal-heart" aria-hidden="true">♥</span>
              <p>Tes lettres t’attendent</p>
              <small>Écoute un son juste au-dessus pour les révéler.</small>
            </div>
          )}
        </div>
      </article>
        </>
      )}
    </section>
  </section>
}

export default function Page() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(true)
  const [isRevealing, setIsRevealing] = useState(false)
  const [isReturningVisitor, setIsReturningVisitor] = useState(false)
  const hasCheckedVisit = useRef(false)

  useEffect(() => {
    if (hasCheckedVisit.current) return
    hasCheckedVisit.current = true

    try {
      const isReturning = localStorage.getItem(siteVisitKey) === 'true'
      setIsReturningVisitor(isReturning)
      localStorage.setItem(siteVisitKey, 'true')
    } catch (error) {
      console.error('Impossible d’enregistrer la visite du site.', error)
    }
  }, [])

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
      <LoveLetter isReturningVisitor={isReturningVisitor} />
      <section className="stats-grid" id="analyse" aria-label="Analyse de tes écoutes"><div className="stat-card featured"><span className="stat-label">TEMPS ÉCOUTÉ</span><strong>2h 40</strong><p>47 écoutes analysées</p><div className="mini-bars">{[40,72,52,86,64,100,48,80].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div><div className="stat-card"><span className="stat-label">TON ARTISTE N°1</span><strong>Drake</strong><p>Le plus présent dans tes écoutes</p><span className="rank">01 / 20</span></div><div className="stat-card"><span className="stat-label">TON GENRE</span><strong>R&B</strong><p>Mais toujours un peu de chaos à côté</p><span className="rank">dreamy · nocturne · soul</span></div></section>
      <section className="artists-section"><div className="section-heading"><div><p className="eyebrow">CE QUI REVIENT TOUJOURS</p><h2>Tes artistes préférés</h2></div><span className="section-count">01 — 06</span></div><div className="artist-list">{artists.map((artist, index) => <div className="artist-row" key={artist}><span className="artist-number">0{index + 1}</span><div><h3>{artist}</h3><p>{['1er artiste de toujours','2e artiste de toujours','Ton côté bedroom pop','Le roi des nuits','Toujours dans la rotation','Pour les moments calmes'][index]}</p></div><span className="artist-genre">{['hip-hop / rap','rap français','dreamy','R&B','alternative','dream pop'][index]}</span><span className="arrow">↗</span></div>)}</div></section>
    </div>
    {isSurpriseOpen && <div className={`surprise-overlay${isRevealing ? ' is-leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="surprise-title">
      <div className="surprise-card">
        <span className="surprise-eyebrow">J&apos;AI QUELQUE CHOSE POUR TOI</span>
        <h1 id="surprise-title">Surprise<br /><em>mon chou</em></h1>
        <p>J’ai préparé une petite surprise rien que pour toi.</p>
        <button className="surprise-button" type="button" onClick={revealSurprise} aria-label="Ouvrir la surprise">
          <Heart size={28} fill="currentColor" aria-hidden="true" />
        </button>
        <span className="surprise-hint">CLIQUE SUR LE CŒUR</span>
      </div>
    </div>}
  </main>
}
