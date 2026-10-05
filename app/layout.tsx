import type { Metadata, Viewport } from 'next'
import './globals.css'
import './site-polish.css'
import './header-note.css'

const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/monamoureuse' : ''

export const metadata: Metadata = {
  title: 'Une surprise pour ma reine ✨',
  description: 'J’ai préparé quelque chose rien que pour toi… Ouvre quand tu es prête, ma reine 💌',
  openGraph: {
    title: 'Une surprise pour ma reine ✨',
    description: 'J’ai préparé quelque chose rien que pour toi… Ouvre quand tu es prête, ma reine 💌',
    locale: 'fr_FR',
    type: 'website',
  },
  generator: 'v0.app',
  icons: { icon: `${basePath}/favicon.svg`, apple: [] },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#111b24',
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
