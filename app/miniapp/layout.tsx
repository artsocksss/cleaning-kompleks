import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cleaning Kompleks — Telegram Mini App',
  description: 'Замовлення професійного клінінгу в Telegram.',
}

export default function MiniAppLayout({ children }: { children: React.ReactNode }) {
  return <html lang="uk"><body>{children}</body></html>
}
