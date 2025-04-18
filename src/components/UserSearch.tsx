import { useEffect, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { UserCard } from '@/components/UserCard'

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

  if (loading) return <div className='p-4 text-center'>Loading users...</div>
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
