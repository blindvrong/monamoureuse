import type { Metadata, Viewport } from 'next'
import './globals.css'
import './site-polish.css'
import './header-note.css'

const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/monamoureuse' : ''

export const metadata: Metadata = {
  title: 'Surprise mon chou',
  description: 'Une petite bande-son de toi, entre nostalgie, R&B et nuits étoilées.',
  generator: 'v0.app',
  icons: { icon: `${basePath}/favicon.svg`, apple: [] },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#191615',
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
