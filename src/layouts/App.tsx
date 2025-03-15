import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/ui/mode-toggle'

interface AppProps {
  children: React.ReactNode
}

export const App = ({ children }: AppProps) => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
      <div className='flex flex-col min-h-full'>
        <main className='w-full flex-1'>
          <div className='fixed top-2 right-2'>
            <ModeToggle />
          </div>
          {children}
        </main>
        <footer className='text-center text-gray-500 text-sm py-4'>
          brought to you by smelly nerds
        </footer>
      </div>
    </ThemeProvider>
  )
}
