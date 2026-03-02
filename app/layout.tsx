import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tandem Repeat Research | Dr. Dina Sokol',
  description: 'Computational research on tandem repeats in genomic sequences — algorithms, tools, and analysis by Dr. Dina Sokol, Brooklyn College CUNY.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
