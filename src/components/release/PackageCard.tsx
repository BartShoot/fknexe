import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { DownloadButton } from '@/components/ui/download-button'
import { type IMatchResult } from '@/lib/types'
import { cn } from '@/lib/utils'

// A reusable card for displaying a ranked package
interface PackageCardProps {
  name: string
  url: string
  matchInfo?: IMatchResult
  recommended?: boolean
}

export function PackageCard({ name, url, matchInfo, recommended = false }: PackageCardProps) {
  const score = matchInfo?.score
  const badges = matchInfo?.matches
  const cardClasses = cn(
    'transition-colors duration-150',
    recommended ?
      'border-2 border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-800'
    : 'border shadow-sm',
  )
  return (
    <Card className={cardClasses}>
      <CardHeader className='flex items-center justify-between px-4 py-2'>
        <CardTitle className='truncate'>{name}</CardTitle>
        {score !== undefined && (
          <span className='text-sm text-gray-600 dark:text-gray-400'>Score: {score}</span>
        )}
      </CardHeader>
      {badges && (
        <CardContent className='px-4 py-2'>
          <div className='flex flex-wrap gap-2 text-sm'>
            {badges.exact_match.map((m, i) => (
              <Badge variant='success' key={`exact-${i}`}>
                ✓ {m}
              </Badge>
            ))}
            {badges.partial_match.map((m, i) => (
              <Badge variant='warning' key={`partial-${i}`}>
                {m}
              </Badge>
            ))}
            {badges.conflicts.map((c, i) => (
              <Badge variant='danger' key={`conflict-${i}`}>
                ✗ {c}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
      <CardFooter className='flex justify-end px-4 py-2'>
        <DownloadButton href={url} />
      </CardFooter>
    </Card>
  )
}
