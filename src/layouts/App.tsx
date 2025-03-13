import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/ui/mode-toggle'

type AppProps = {
  children: React.ReactNode
}

export const App = ({ children }: AppProps) => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
      <main className='container mx-auto py-12 px-4'>
        <div className='fixed top-4 right-4'>
          <ModeToggle />
        </div>
        {children}
        <footer className='text-center text-gray-500 text-sm mt-20'>
          brought to you by smelly nerds
        </footer>
      </main>
    </ThemeProvider>
  )
}
