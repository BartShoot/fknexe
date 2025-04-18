import { Star, Github, Link as LinkIcon } from 'lucide-react'
import { type GithubResponse } from '@/clients/github/api'
import { ButtonLink } from '@/components/ui/button-link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

// A reusable card for displaying GitHub repository search results or lists
type RepoItem = GithubResponse['searchRepositories']['items'][number]

interface RepositoryCardProps {
  repo: RepoItem
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  const owner = repo.owner?.login ?? ''
  const internalHref = `/user/repository?u=${encodeURIComponent(owner)}&r=${encodeURIComponent(
    repo.name,
  )}`
  return (
    <Card className='hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle className='truncate'>
          <a
            href={internalHref}
            className='block font-semibold hover:underline text-gray-900 dark:text-gray-100 truncate'
          >
            {repo.full_name}
          </a>
        </CardTitle>
        <div className='flex items-center gap-2 text-sm whitespace-nowrap'>
          <span className='flex items-center gap-1 text-muted-foreground'>
            <Star size={14} /> {repo.stargazers_count}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonLink
                variant='ghost'
                size='icon'
                href={repo.html_url}
                aria-label='View on GitHub'
              >
                <Github size={16} />
              </ButtonLink>
            </TooltipTrigger>
            <TooltipContent>
              <p>View on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      {repo.description && (
        <CardContent>
          <p className='text-sm text-gray-600 dark:text-gray-400'>{repo.description}</p>
        </CardContent>
      )}
      {repo.homepage && (
        <CardContent>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={repo.homepage}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline'
              >
                <LinkIcon size={14} />
                <span className='truncate'>{repo.homepage}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{repo.homepage}</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
      )}
    </Card>
  )
}
