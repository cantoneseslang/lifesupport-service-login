import { SupabaseProvider } from './supabase-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.difyChatbotConfig = {
                token: '2EVbZSnoP7luoOe7'
              }
            `,
          }}
        />
        <script
          src="https://udify.app/embed.min.js"
          id="2EVbZSnoP7luoOe7"
          defer
        />
      </head>
      <body>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}