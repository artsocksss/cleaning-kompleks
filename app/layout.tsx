import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cleaning Kompleks — Професійний клінінг', description: 'Професійний клінінг квартир, будинків та комерційних приміщень.' }

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="uk"><body>{children}</body></html> }
