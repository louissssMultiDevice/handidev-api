import './globals.css'

export const metadata = {
  title: 'Handi Dev — Email Generator',
  description: 'Handi Dev tools: email generator, verification watcher, smooth theme toggle & fancy loader'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  )
}
