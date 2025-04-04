import { UserSearchForm } from '@/components/SearchForm'
import { LayoutHeaderLogo } from '@/components/layout/header/Logo'
import { ModeToggle } from '@/components/ui/mode-toggle'

interface ILayoutHeaderProps {
  showSearch?: boolean
}

export const LayoutHeader = ({ showSearch }: ILayoutHeaderProps) => {
  return (
    <header className='flex justify-between px-8 py-0.5 border-b-1 border-primary-foreground '>
      <div className='flex items-center justify-center'>
        <LayoutHeaderLogo />
      </div>
      <div className='flex items-center justify-center gap-8'>
        {showSearch && <UserSearchForm className='min-w-56' />}
        {/* About Link */}
        <a href='/about' className='text-sm font-medium hover:underline'>
          About
        </a>
        <ModeToggle />
      </div>
    </header>
  )
}
