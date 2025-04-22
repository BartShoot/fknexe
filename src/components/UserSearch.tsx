import { useEffect, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { UserCard } from '@/components/UserCard'
import { Card, CardHeader } from '@/components/ui/card'

type UserItem = GithubResponse['searchUsers']['items'][number]

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

  if (loading)
    return (
      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Card key={idx} className='animate-pulse'>
            <CardHeader className='flex items-center justify-between p-2'>
              <div className='flex items-center gap-3'>
                <div className='h-8 w-8 bg-gray-300 rounded-full' />
                <div className='h-4 bg-gray-300 rounded w-32' />
              </div>
              <div className='h-4 w-4 bg-gray-300 rounded' />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  if (error) return <div className='p-4 text-center text-red-500'>{error}</div>
  if (!query) return <div className='p-4 text-gray-500'>Enter a search term to find users.</div>
  if (users.length === 0) return <div className='p-4'>No users found matching "{query}".</div>

  return (
    <div className='space-y-3'>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export const UserSearch = withNuqsAdapter(_UserSearch)
