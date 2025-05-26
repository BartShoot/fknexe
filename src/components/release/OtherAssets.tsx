import React from 'react'
import { MatchTags } from '@/components/release/MatchTags'
import type { IRankedRelease } from '@/lib/types'

interface OtherAssetsProps {
  loading: boolean
  otherPackages: IRankedRelease['rankedPackages']
  totalRankedPackagesCount: number
}

export const OtherAssets: React.FC<OtherAssetsProps> = ({
  loading,
  otherPackages,
  totalRankedPackagesCount,
}) => {
  if (loading) {
    return (
      <div className='space-y-2'>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className='flex justify-between items-center animate-pulse'>
            <div className='h-4 bg-gray-300 rounded w-3/4' />
            <div className='h-4 bg-gray-300 rounded w-1/4' />
          </div>
        ))}
      </div>
    )
  }

  if (totalRankedPackagesCount === 0) {
    return (
      <div className='border border-dashed rounded-md p-6 flex items-center justify-center border-gray-300 bg-gray-50 text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400 min-h-[100px]'>
        <p>This release contains no assets.</p>
      </div>
    )
  }

  if (!otherPackages || otherPackages.length === 0) {
    return (
      <div className='border border-dashed rounded-md p-6 flex items-center justify-center border-gray-300 bg-gray-50 text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400 min-h-[100px]'>
        <p>No other assets available.</p>
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
    <div>
      <h3 className='text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300'>Other Assets</h3>
      <ul className='space-y-2'>
        {otherPackages.map((pkg) => (
          <li
            key={pkg.id}
            className='pb-2 last:border-b-0 border-b border-gray-200 dark:border-zinc-700'
          >
            <div className='flex justify-between items-center flex-col md:flex-row'>
              <div className='flex flex-col'>
                <span className='text-sm break-words pr-2 flex-1 text-gray-800 dark:text-gray-200'>
                  {pkg.name}
                </span>
                {pkg.matchInfo && <MatchTags matchInfo={pkg.matchInfo} />}
              </div>
              <a
                href={pkg.browser_download_url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-xs text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap dark:text-blue-400 dark:hover:text-blue-300'
                download
              >
                Download ({formatBytes(pkg.size)})
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
