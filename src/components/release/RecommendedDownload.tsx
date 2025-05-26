import React from 'react'
import { MatchTags } from '@/components/release/MatchTags'
import type { IRankedRelease } from '@/lib/types'

interface RecommendedDownloadProps {
  loading: boolean
  firstPackage?: IRankedRelease['rankedPackages'][number] | null
  parsedUA?: any
  osName?: string | null
}

export const RecommendedDownload: React.FC<RecommendedDownloadProps> = ({
  loading,
  firstPackage,
  parsedUA,
  osName,
}) => {
  if (loading) {
    return (
      <div className='p-4 rounded-md border bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-800 animate-pulse'>
        <div className='h-6 bg-blue-200 rounded w-1/2 mb-4' />
        <div className='h-4 bg-blue-200 rounded w-3/4 mb-4' />
        <div className='h-10 bg-blue-200 rounded w-full mb-4' />
        <div className='h-8 bg-blue-200 rounded w-full' />
      </div>
    )
  }

  if (!firstPackage) {
    return (
      <div className='border border-dashed rounded p-6 flex items-center justify-center border-gray-300 bg-gray-50 text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400 min-h-[100px]'>
        <p>No recommended downloads found.</p>
      </div>
    )
  }

  const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  return (
    <div className='p-4 rounded-md border bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-800'>
      <h3 className='text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200'>
        Recommended Download
      </h3>
      {parsedUA && (
        <p className='text-sm mb-3 text-gray-600 dark:text-gray-300'>
          For your {osName} system{' '}
          {parsedUA.cpu?.architecture ? `with ${parsedUA.cpu.architecture} CPU` : ''} we recommend:
        </p>
      )}
      <div className='flex flex-col'>
        <p className='text-lg font-medium break-words text-gray-800 dark:text-gray-200'>
          {firstPackage.name}
        </p>
        {firstPackage.matchInfo && <MatchTags matchInfo={firstPackage.matchInfo} />}
      </div>
      <p className='text-sm mb-3 mt-3 text-gray-600 dark:text-gray-300'>
        Downloads: {firstPackage.download_count.toLocaleString()}
      </p>
      <a
        href={firstPackage.browser_download_url}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full text-sm transition duration-150 ease-in-out w-full text-center dark:bg-blue-500 dark:hover:bg-blue-400'
        download
      >
        Download ({formatBytes(firstPackage.size)})
      </a>
      <div className='mt-4 text-center'>
        <p className='text-xs mt-2 text-gray-500 dark:text-gray-400'>
          If this is not the right package for you, please let us know!
        </p>
        <button
          data-tally-open='n94KX5'
          data-tally-width='450'
          data-tally-hide-title='1'
          data-tally-overlay='1'
          data-tally-emoji-text='🤔'
          data-tally-emoji-animation='spin'
          data-tally-auto-close='2000'
          className='mt-2 text-sm border-2 py-2 px-4 hover:bg-gray-100 rounded-full border-gray-500 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400'
        >
          Did we get this right?
        </button>
      </div>
    </div>
  )
}
