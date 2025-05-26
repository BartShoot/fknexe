import React from 'react'
import Markdown from 'react-markdown'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Github } from 'lucide-react'
import remarkGfm from 'remark-gfm'
import { ButtonLink } from '@/components/ui/button-link'
import type { IRankedRelease } from '@/lib/types'

interface ReleaseNotesProps {
  loading: boolean
  latestRelease?: IRankedRelease['latestRelease'] | null
  owner?: string | null
  repo?: string | null
}

export const ReleaseNotes: React.FC<ReleaseNotesProps> = ({
  loading,
  latestRelease,
  owner,
  repo,
}) => {
  if (loading) {
    return (
      <div className='space-y-4 animate-pulse'>
        <div className='h-8 bg-gray-300 rounded w-1/3' />
        <div className='h-4 bg-gray-300 rounded w-1/4' />
        <div className='h-4 bg-gray-300 rounded w-full' />
        <div className='h-4 bg-gray-300 rounded w-full' />
      </div>
    )
  }

  if (!latestRelease) {
    return <div className='text-center text-gray-500 p-4'>No release data found.</div>
  }

  return (
    <div className='pb-4 border-b dark:border-zinc-800'>
      <TooltipProvider delayDuration={300}>
        <div className='flex items-center justify-between'>
          <Tooltip>
            <TooltipTrigger asChild>
              <h2 className='text-2xl font-bold mb-2 dark:text-white'>
                <a
                  href={latestRelease.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block hover:bg-gray-100 hover:text-gray-700 transition duration-150 ease-in-out'
                >
                  Release Notes: {latestRelease.name} ({latestRelease.tag_name})
                </a>
              </h2>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open release on GitHub</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonLink
                variant='ghost'
                size='icon'
                className='text-muted-foreground border-2'
                href={`https://github.com/${owner}/${repo}/`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Github size={24} />
              </ButtonLink>
            </TooltipTrigger>
            <TooltipContent>
              <p>View on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <p className='text-sm mb-3 text-gray-600 dark:text-gray-400'>
        {latestRelease.published_at && (
          <span>Published on: {new Date(latestRelease.published_at).toLocaleDateString()} by </span>
        )}
        <a
          href={latestRelease.author.html_url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:underline dark:text-blue-400'
        >
          {latestRelease.author.login}
        </a>
      </p>
      {latestRelease.body ?
        <div className='typography max-w-none bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 px-4 py-1 rounded-md'>
          <Markdown skipHtml remarkPlugins={[remarkGfm]}>
            {latestRelease.body}
          </Markdown>
        </div>
      : <div className='border border-dashed rounded-md p-6 min-h-[100px] flex items-center justify-center border-gray-300 bg-gray-50 text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400'>
          <p>No release notes found for this release.</p>
        </div>
      }
    </div>
  )
}
