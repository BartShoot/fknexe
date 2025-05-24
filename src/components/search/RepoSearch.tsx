import React from 'react'
import type { GithubResponse } from '@/clients/github/api'
import { Card, CardHeader } from '@/components/ui/card'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip' // Keep Tooltip related imports
import { RepositoryCard } from '@/components/search/RepositoryCard'

type RepoItem = GithubResponse['searchRepositories']['items'][number]

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
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </TooltipProvider>
  )
}
