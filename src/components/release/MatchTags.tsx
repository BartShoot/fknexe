import React from 'react'
import { Badge } from '@/components/ui/Badge'
import type { IMatchResult } from '@/lib/types'

interface MatchTagsProps {
  matchInfo: IMatchResult
}

export const MatchTags: React.FC<MatchTagsProps> = ({ matchInfo }) => {
  const { exact_match, partial_match, conflicts } = matchInfo.matches
  return (
    <div className='flex flex-wrap gap-1 mt-1'>
      {exact_match.map((match) => (
        <Badge variant='success' key={`exact-${match}`}>
          {match}
        </Badge>
      ))}
      {partial_match.map((match) => (
        <Badge variant='default' key={`partial-${match}`}>
          {match}
        </Badge>
      ))}
      {conflicts.map((match) => (
        <Badge variant='danger' key={`conflict-${match}`}>
          {match}
        </Badge>
      ))}
    </div>
  )
}
