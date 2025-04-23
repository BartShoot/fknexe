import { useEffect, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { RepoSearch } from '@/components/search/RepoSearch'
import { UserSearch } from '@/components/search/UserSearch'

type UserItem = GithubResponse['searchUsers']['items'][number]
type RepoItem = GithubResponse['searchRepositories']['items'][number]

function _SearchResults() {
  const [query] = useQueryState('q', parseAsString.withDefault(''))
  const [users, setUsers] = useState<UserItem[]>([])
  const [repositories, setRepositories] = useState<RepoItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query) {
      setUsers([])
      setRepositories([])
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    Promise.all([GithubApi.searchUsers({ q: query }), GithubApi.searchRepositories({ q: query })])
      .then(([userResponse, repoResponse]) => {
        setUsers(userResponse.items || [])
        setRepositories(repoResponse.items || [])
      })
      .catch((err) => {
        console.error('Search API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch search results')
        setUsers([])
        setRepositories([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [query])

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      <section className='md:col-span-1'>
        <h2 className='text-xl font-semibold mb-4'>Users</h2>
        <UserSearch users={users} loading={loading} error={error} query={query} />
      </section>

      <section className='md:col-span-2'>
        <h2 className='text-xl font-semibold mb-4'>Repositories</h2>
        <RepoSearch repositories={repositories} loading={loading} error={error} query={query} />
      </section>
    </div>
  )
}

export const SearchResults = withNuqsAdapter(_SearchResults)
