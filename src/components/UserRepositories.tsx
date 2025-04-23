import { useEffect, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { RepositoryCard } from '@/components/search/RepositoryCard'

function _UserRepositories() {
  const [owner] = useQueryState('u', parseAsString)
  const [repositories, setRepositories] = useState<GithubResponse['searchRepositories']['items']>(
    [],
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!owner) return

      try {
        setLoading(true)
        const response = await GithubApi.searchRepositories({ q: `+user:${owner}` })
        setRepositories(response.items)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories')
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [owner])

  if (loading) {
    return <div className='flex justify-center p-12'>Loading repositories...</div>
  }

  if (error) {
    return <div className='text-center text-red-500 p-4'>{error}</div>
  }

  if (repositories.length === 0) {
    return <div className='p-4'>No repositories found for {owner}.</div>
  }

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <h2 className='text-xl font-bold mb-6'>{owner}'s Repositories</h2>
      <div className='grid gap-4'>
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

export const UserRepositories = withNuqsAdapter(_UserRepositories)
