import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { GithubResponse } from '@/clients/github/api'

interface ReadmeSectionProps {
  loading: boolean
  readme?: GithubResponse['getReadme'] | null
}

export const ReadmeSection: React.FC<ReadmeSectionProps> = ({ loading, readme }) => {
  if (loading) {
    return (
      <div className='space-y-2 animate-pulse'>
        <div className='h-6 bg-gray-300 rounded w-1/4' />
        <div className='h-4 bg-gray-300 rounded w-full' />
        <div className='h-4 bg-gray-300 rounded w-full' />
        <div className='h-4 bg-gray-300 rounded w-3/4' />
      </div>
    )
  }

  return (
    <div className='pb-4 border-b dark:border-zinc-800'>
      <h3 className='text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300'>README</h3>
      {readme ?
        <div className='typography max-w-none bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 px-8 py-1 rounded-md'>
          <Markdown skipHtml remarkPlugins={[remarkGfm]}>
            {readme.content}
          </Markdown>
        </div>
      : <div className='border border-dashed rounded p-6 min-h-[300px] flex items-center justify-center border-gray-300 bg-gray-50 text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400'>
          <p>No README found for this repository.</p>
        </div>
      }
    </div>
  )
}
