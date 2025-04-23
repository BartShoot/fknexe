import React from 'react'
import { Github, Star, Link as LinkIcon } from 'lucide-react'
// Renamed Link to LinkIcon
import type { GithubResponse } from '@/clients/github/api'
import { ButtonLink } from '@/components/ui/button-link'
import { Card, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type RepoItem = GithubResponse['searchRepositories']['items'][number]

interface RepoListItemProps {
  repo: RepoItem
}

const RepoListItem: React.FC<RepoListItemProps> = ({ repo }) => {
  const ownerLogin = repo.owner?.login
  const repoName = repo.name

  const internalLink =
    ownerLogin && repoName ?
      `/user/repository?u=${encodeURIComponent(ownerLogin)}&r=${encodeURIComponent(repoName)}`
    : '#'

  return (
    <div
      className={cn(
        'p-3 border rounded-md dark:border-zinc-700 bg-card', // Use card background
        'hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-150', // Hover effect like RepositoryDetail
      )}
    >
      {/* Top section: Repo name, Stars, GitHub link */}
      <div className='flex justify-between items-start gap-2 mb-2'>
        {/* Link to internal repo page */}
        <a
          href={internalLink}
          className='font-semibold hover:underline mr-2 overflow-hidden text-ellipsis whitespace-nowrap text-foreground' // Truncate long names
          title={repo.full_name} // Add title attribute for full name on hover
        >
          {repo.full_name}
        </a>

        {/* Stars and GitHub Icon */}
        <div className='flex items-center gap-2 text-sm whitespace-nowrap flex-shrink-0'>
          <span className='flex items-center gap-1 text-muted-foreground'>
            <Star size={14} className='fill-current text-yellow-500' />{' '}
            {/* Use fill-current and specific color */}
            {repo.stargazers_count?.toLocaleString() ?? 0} {/* Format numbers */}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonLink
                variant='ghost'
                size='icon'
                className='h-6 w-6 text-muted-foreground hover:text-foreground'
                href={repo.html_url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='View on GitHub' // Accessibility
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
        <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
          {' '}
          {/* Limit description lines */}
          {repo.description}
        </p>
      )}

      {/* Bottom section: Homepage Link */}
      {repo.homepage && (
        <div className='flex items-center mt-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={repo.homepage}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Repository Homepage'
                className='flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline overflow-hidden text-ellipsis whitespace-nowrap'
              >
                <LinkIcon size={14} className='flex-shrink-0' />
                <span className='truncate'>{repo.homepage}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{repo.homepage}</p> {/* Show full URL in tooltip */}
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export interface RepoSearchProps {
  repositories: RepoItem[]
  loading: boolean
  error: string | null
  query: string
}

export function RepoSearch({ repositories, loading, error, query }: RepoSearchProps) {
  if (loading) {
    return (
      <div className='space-y-3'>
        {Array.from({ length: 7 }).map((_, idx) => (
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
  }

  if (error) {
    return <div className='p-4 text-center text-destructive dark:text-red-500'>Error: {error}</div>
  }

  if (!query) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        Enter a search term above to find repositories.
      </div>
    )
  }

  if (repositories.length === 0) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        No repositories found matching "{query}".
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className='space-y-3'>
        {repositories.map((repo) => (
          <RepoListItem key={repo.id} repo={repo} />
        ))}
      </div>
    </TooltipProvider>
  )
}
