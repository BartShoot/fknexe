import { useEffect, useState } from 'react'
// Icons and UI moved into RepositoryCard
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
// RepositoryCard handles repository display
import { RepositoryCard } from '@/components/RepositoryCard'

type RepoItem = GithubResponse['searchRepositories']['items'][number]

function _RepoSearch() {
  const [query] = useQueryState('q', parseAsString.withDefault(''))
  const [repositories, setRepositories] = useState<RepoItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!query) {
        setRepositories([])
        setLoading(false)
        setError(null)
        return
      }
      try {
        setLoading(true)
        setError(null)
        const response = await GithubApi.searchRepositories({ q: query })
        setRepositories(response.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories')
        setRepositories([])
      } finally {
        setLoading(false)
      }
    }
    fetchRepositories()
  }, [query])

  if (loading) return <div className='p-4 text-center'>Loading repositories...</div>
  if (error) return <div className='p-4 text-center text-red-500'>{error}</div>
  if (!query)
    return <div className='p-4 text-gray-500'>Enter a search term to find repositories.</div>
  if (repositories.length === 0)
    return <div className='p-4'>No repositories found matching "{query}".</div>

  return (
    <div className='space-y-3'>
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

export const RepoSearch = withNuqsAdapter(_RepoSearch)
