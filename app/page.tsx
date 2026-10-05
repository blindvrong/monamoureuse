'use client'

import { memo, useCallback, useMemo, useState } from 'react'
import { Heart, Play, Search, Shuffle, Volume2 } from 'lucide-react'
import { reasons } from '@/lib/reasons'

const songs = [
  { title: 'Silence', artist: 'Marshmello, Khalid', mood: 'Nostalgique', color: 'peach' },
  { title: "Who's Lovin' You", artist: 'The Jackson 5', mood: 'Soul', color: 'gold' },
  { title: 'Only Girl (In The World)', artist: 'Rihanna', mood: 'Énergie', color: 'rose' },
  { title: 'MOOO!', artist: 'Doja Cat', mood: 'Confiance', color: 'lilac' },
] as const

const artists = ['Drake', 'Hamza', 'The Marías', 'The Weeknd', 'The Neighbourhood', 'Cigarettes After Sex']
const moods = ['Tous', ...Array.from(new Set(songs.map((song) => song.mood)))]

const shuffleArray = <T,>(items: T[]) => {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }

  return next
}

const SongCard = memo(function SongCard({ song, index }: { song: (typeof songs)[number]; index: number }) {
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

function LoveLetter() {
  const [reasonIndex, setReasonIndex] = useState<number>(() => Math.floor(Math.random() * reasons.length))
  const [noteOrder, setNoteOrder] = useState<number[]>(() => shuffleArray([0, 1, 2]))

  const reason = reasons[reasonIndex]

  const showRandomReason = useCallback(() => {
    setReasonIndex((current) => {
      const next = Math.floor(Math.random() * reasons.length)
      return next === current && reasons.length > 1 ? (next + 1) % reasons.length : next
    })
  }, [])

  const reshuffleNotes = useCallback(() => {
    setNoteOrder(shuffleArray([0, 1, 2]))
  }, [])

  const loveNotes = useMemo(
    () => [
      'Tu es mon plus joli hasard.',
      'Avec toi, même les jours ordinaires deviennent précieux.',
      'Je te choisirais encore, dans toutes les vies.',
    ],
    [],
  )

  return (
    <section className="letter-section" id="lettre" aria-labelledby="lettre-title">
      <div className="section-heading letter-heading">
        <div>
          <p className="eyebrow">une petite lettre pour lïa</p>
          <h2 id="lettre-title">
            Quelques mots
            <br />
            <em>rien que pour toi.</em>
          </h2>
        </div>
        <Heart className="letter-heart" aria-hidden="true" />
      </div>

      <p className="letter-intro">
        Lïa, j&apos;ai mis ici les petits morceaux de toi que je garde dans ma tête. Et si tu veux savoir
        pourquoi je t&apos;aime, laisse le hasard choisir une raison.
      </p>

      <div className="reason-card">
        <span className="reason-number">{String(reasonIndex + 1).padStart(2, '0')} / 100</span>
        <p>{reason.charAt(0).toUpperCase() + reason.slice(1)}.</p>
        <button type="button" className="ghost-button" onClick={showRandomReason}>
          <Shuffle size={16} />
          une autre raison
        </button>
      </div>

      <div className="love-signoff">
        <span>je t&apos;aime,</span>
        <strong>Lïa</strong>
      </div>

      <div className="love-notes" aria-label="Petits mots pour Lïa">
        {noteOrder.map((noteIndex) => (
          <p key={noteIndex}>{loveNotes[noteIndex]}</p>
        ))}
      </div>

      <button type="button" className="ghost-button notes-button" onClick={reshuffleNotes}>
        <Volume2 size={16} />
        réorganiser
      </button>
    </section>
  )
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [activeMood, setActiveMood] = useState('Tous')

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()

    return songs.filter((song) => {
      const matchText = `${song.title} ${song.artist}`.toLowerCase().includes(search)
      const matchMood = activeMood === 'Tous' || song.mood === activeMood
      return matchText && matchMood
    })
  }, [activeMood, query])

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">♪</span>
          pour toi
        </a>

        <nav aria-label="Navigation principale">
          <a href="#analyse">Analyse</a>
          <a href="#sons">Sons</a>
          <a href="#lettre">Lettre</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">une petite bande-son pour toi</p>
        <h1>
          Les morceaux qui parlent
          <br />
          comme toi.
        </h1>
        <p className="hero-copy">
          Une playlist douce, qui sent le souvenir, la nuit, le cœur, et le regard qu’on garde en secret.
        </p>
      </section>

      <LoveLetter />

      <section className="stats-grid" id="analyse" aria-label="Analyse de tes écoutes">
        <div className="stat-card featured">
          <span className="stat-label">temps écouté</span>
          <strong>2h 40</strong>
          <p>un peu de nuit, un peu de chaleur, beaucoup de souvenirs.</p>
        </div>
        <div className="stat-card">
          <span className="stat-label">mood</span>
          <strong>nostalgique</strong>
          <p>tout ce qui te ressemble sans jamais le dire trop fort.</p>
        </div>
        <div className="stat-card">
          <span className="stat-label">vibe</span>
          <strong>mélancolie douce</strong>
          <p>la bonne température pour une belle journée à deux.</p>
        </div>
      </section>

      <section className="artists-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ce qui revient toujours</p>
            <h2>Tes artistes préférés</h2>
          </div>
          <span className="section-count">06</span>
        </div>

        <div className="artist-grid">
          {artists.map((artist) => (
            <div key={artist} className="artist-pill">
              {artist}
            </div>
          ))}
        </div>
      </section>

      <section className="music-player-section top-player" aria-label="Ta musique préférée">
        <div>
          <p className="eyebrow">le son qui te ressemble le plus</p>
          <h2>
            Silence <em>en fond.</em>
          </h2>
          <p>Marshmello, Khalid</p>
        </div>

        <div className="player-card">
          <button type="button" className="play-toggle" aria-label="Lecture en cours">
            <Play size={18} />
          </button>
          <div className="player-track">
            <span className="track-label">now playing</span>
            <span className="track-progress" />
          </div>
        </div>
      </section>

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

      <section className="music-player-section bottom-player" aria-label="Musique de fond pour Lïa">
        <div>
          <p className="eyebrow">à écouter en lisant</p>
          <h2>Le son de Lïa.</h2>
          <p>Appuie sur play, laisse le monde faire silence, et reste un instant dans le bon rythme.</p>
        </div>

        <div className="player-card">
          <button type="button" className="play-toggle" aria-label="Lecture du son de Lïa">
            <Play size={18} />
          </button>
          <div className="player-track">
            <span className="track-label">streaming</span>
            <span className="track-progress accent" />
          </div>
        </div>
      </section>

      <footer>
        <p>j&apos;ai fait ça en pensant à toi.</p>
        <span>pour toi, Lïa</span>
      </footer>
    </main>
  )
}
