import { useEffect, useState } from 'react'
import { User, Building } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type UserItem = GithubResponse['searchUsers']['items'][number]

function TypeIcon({ type }: { type: UserItem['type'] }) {
  const iconSize = 16
  const iconClassName = 'text-muted-foreground flex-shrink-0'

  if (type === 'Organization') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Building size={iconSize} className={iconClassName} aria-label='Organization' />
        </TooltipTrigger>
        <TooltipContent>
          <p>Organization</p>
        </TooltipContent>
      </Tooltip>
    )
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <User size={iconSize} className={iconClassName} aria-label='User' />
      </TooltipTrigger>
      <TooltipContent>
        <p>User</p>
      </TooltipContent>
    </Tooltip>
  )
}

function _UserSearch() {
  const [query] = useQueryState('q', parseAsString.withDefault(''))
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query) {
      setUsers([])
      setLoading(false)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    GithubApi.searchUsers({ q: query })
      .then((response) => setUsers(response.items || []))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to fetch users'))
      .finally(() => setLoading(false))
  }, [query])

  if (loading) return <div className='p-4 text-center'>Loading users...</div>
  if (error) return <div className='p-4 text-center text-red-500'>{error}</div>
  if (!query) return <div className='p-4 text-gray-500'>Enter a search term to find users.</div>
  if (users.length === 0) return <div className='p-4'>No users found matching "{query}".</div>

  return (
    <TooltipProvider delayDuration={300}>
      <div className='space-y-3'>
        {users.map((user) => (
          <a
            key={user.id}
            href={`/user?u=${encodeURIComponent(user.login)}`}
            className='flex items-center justify-between gap-3 p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700'
          >
            {/* Group Avatar and Username on the left */}
            <div className='flex items-center gap-3 overflow-hidden'>
              {' '}
              {/* Added overflow-hidden */}
              <Avatar className='h-8 w-8 flex-shrink-0'>
                {' '}
                {/* Added flex-shrink-0 */}
                <AvatarImage src={user.avatar_url} alt={`${user.login} avatar`} />
                <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {/* Added truncate for long usernames */}
              <span className='truncate'>{user.login}</span>
            </div>

            {/* Icon is now a direct child of the flex container, pushed to the right */}
            <TypeIcon type={user.type} />
          </a>
        ))}
      </div>
    </TooltipProvider>
  )
}

export const UserSearch = withNuqsAdapter(_UserSearch)
