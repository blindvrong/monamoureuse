'use client'

import { useCallback, useMemo, useState } from 'react'
import { Heart, Shuffle, Volume2 } from 'lucide-react'
import { reasons } from '@/lib/reasons'

const shuffleArray = <T,>(items: T[]) => {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }

  return next
}

export function LoveLetter() {
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
