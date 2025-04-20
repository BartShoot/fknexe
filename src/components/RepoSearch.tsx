import { useEffect, useState } from 'react'
import { Github, Star, Link } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { ButtonLink } from '@/components/ui/button-link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type RepoItem = GithubResponse['searchRepositories']['items'][number]

function _RepoSearch() {
  const [query] = useQueryState('q', parseAsString)

  const [repositories, setRepositories] = useState<RepoItem[]>([])
  const [loading, setLoading] = useState(true)
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

  console.debug({ query, repositories, loading, error })

  if (loading) {
    return <div className='p-4 text-center'>Loading repositories...</div>
  }

  if (error) {
    return <div className='p-4 text-center text-red-500'>{error}</div>
  }

  if (!query) {
    return <div className='p-4 text-gray-500'>Enter a search term to find repositories.</div>
  }

  if (repositories.length === 0) {
    return <div className='p-4'>No repositories found matching "{query}".</div>
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className='space-y-3'>
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className='p-3 border rounded dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150' // Added hover effect + transition
          >
            {/* Top section: Repo name, Stars, GitHub link */}
            <div className='flex justify-between items-start mb-2'>
              {' '}
              {/* Increased margin-bottom slightly */}
              {/* Link to internal repo page */}
              <a
                href={`/user/repository?u=${encodeURIComponent(repo.owner!.login)}&r=${encodeURIComponent(repo.name)}`}
                className='font-semibold hover:underline mr-2 overflow-hidden truncate' // Added truncate for long names
              >
                {repo.full_name}
              </a>
              {/* Stars and GitHub Icon */}
              <div className='flex items-center gap-2 text-sm whitespace-nowrap flex-shrink-0'>
                {' '}
                {/* Added flex-shrink-0 */}
                <span className='flex items-center gap-1 text-muted-foreground'>
                  {' '}
                  {/* Use muted color */}
                  <Star size={14} className='fill-current' />{' '}
                  {/* Use fill-current for star color */}
                  {repo.stargazers_count}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ButtonLink
                      variant='ghost'
                      size='icon'
                      className='h-6 w-6 text-muted-foreground'
                      href={repo.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github size={16} />
                    </ButtonLink>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Middle section: Description */}
            {repo.description && (
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>{repo.description}</p>
            )}

            {/* Bottom section: Homepage Icon/Link */}
            {/* --- Homepage Icon Logic --- */}
            {repo.homepage && (
              <div className='flex items-center mt-1'>
                {' '}
                {/* Wrapper for alignment */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={repo.homepage}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='Repository Homepage'
                      className='flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline'
                    >
                      <Link size={14} />
                      {<span>{repo.homepage}</span>}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{repo.homepage}</p> {/* Show full URL in tooltip */}
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            {/* --- End Homepage Icon Logic --- */}
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}

export const RepoSearch = withNuqsAdapter(_RepoSearch)
