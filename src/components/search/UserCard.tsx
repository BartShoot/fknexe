import { Building, User as UserIcon } from 'lucide-react'
import { type GithubResponse } from '@/clients/github/api'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

type UserItem = GithubResponse['searchUsers']['items'][number]

interface UserCardProps {
  user: UserItem
}

function TypeIcon({ type }: { type: UserItem['type'] }) {
  const iconSize = 16
  const iconClassName = 'text-muted-foreground flex-shrink-0'
  const label = type === 'Organization' ? 'Organization' : 'User'
  const IconComponent = type === 'Organization' ? Building : UserIcon
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconComponent size={iconSize} className={iconClassName} aria-label={label} />
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function UserCard({ user }: UserCardProps) {
  const href = `/user?u=${encodeURIComponent(user.login)}`
  return (
    <Card className='hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
      <CardHeader className='flex items-center justify-between p-2'>
        <div className='flex items-center gap-3 overflow-hidden'>
          <Avatar className='h-8 w-8 flex-shrink-0'>
            <AvatarImage src={user.avatar_url} alt={`${user.login} avatar`} />
            <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className='truncate'>
            <a href={href} className='block hover:underline'>
              {user.login}
            </a>
          </CardTitle>
        </div>
        <TypeIcon type={user.type} />
      </CardHeader>
    </Card>
  )
}
