import { LayoutFooter } from '@/components/layout/LayoutFooter'
import { LayoutHeader } from '@/components/layout/LayoutHeader'
import { ThemeProvider } from '@/components/theme-provider'

interface AppProps {
  url: URL
  children: React.ReactNode
}

export const App = ({ url, children }: AppProps) => {
  console.debug({ url })
  return (
    <ThemeProvider defaultTheme='light' storageKey='ui-theme'>
      <div className='flex flex-col min-h-full'>
        <LayoutHeader showSearch={url.pathname !== '/'} />
        <main className='flex flex-col items-center flex-1'>{children}</main>
        <LayoutFooter />
      </div>
    </ThemeProvider>
  )
}
