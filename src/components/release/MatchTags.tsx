import React from 'react'
import type { IMatchResult } from '@/lib/types'

interface MatchTagsProps {
  matchInfo: IMatchResult
}

export const MatchTags: React.FC<MatchTagsProps> = ({ matchInfo }) => {
  const { exact_match, partial_match, conflicts } = matchInfo.matches
  return (
    <div className='flex flex-wrap gap-1 mt-1'>
      {exact_match.map((match) => (
        <span
          key={`exact-${match}`}
          className='bg-green-100 text-sm text-green-800 font-medium px-2.5 py-0.5 rounded-full border-green-800 border-2 dark:bg-green-900 dark:text-green-200 dark:border-green-200'
        >
          {match}
        </span>
      ))}
      {partial_match.map((match) => (
        <span
          key={`partial-${match}`}
          className='bg-gray-100 text-sm text-gray-800 font-medium px-2.5 py-0.5 rounded-full border-gray-800 border-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-200'
        >
          {match}
        </span>
      ))}
      {conflicts.map((match) => (
        <span
          key={`conflict-${match}`}
          className='bg-red-100 text-sm text-red-800 font-medium px-2.5 py-0.5 rounded-full border-red-800 border-2 dark:bg-red-900 dark:text-red-200 dark:border-red-200'
        >
          {match}
        </span>
      ))}
    </div>
  )
}
