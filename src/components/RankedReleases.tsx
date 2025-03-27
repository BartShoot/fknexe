import { DownloadButton } from '@/components/ui/download-button'
import { type IRankedRelease } from '@/lib/types'

interface RankedReleasesProps {
  release: IRankedRelease | null
}

export function RankedReleases({ release }: RankedReleasesProps) {
  if (!release?.rankedPackages) {
    return <p>No ranked releases found.</p>
  }

  const recommendedPackage = release.rankedPackages[0]
  const otherPackages = release.rankedPackages.slice(1)

  return (
    <div className='container mx-auto px-4 max-w-3xl'>
      <span className='bg-green-100 text-green-800 px-2 py-1 rounded-md'>Recommended</span>
      {recommendedPackage && (
        <div className='mb-4 mt-4 border-2 border-green-500 shadow-sm p-4 rounded-md'>
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <div className='flex-grow'>
              <div className='flex items-start gap-2 mb-2'>
                <div>
                  <h3 className='text-lg font-medium'>{recommendedPackage.name}</h3>
                  <p className='text-sm text-gray-600'>
                    Best match for your system{' '}
                    {recommendedPackage.matchInfo?.score ?
                      `• Score: ${recommendedPackage.matchInfo.score}`
                    : ''}
                  </p>
                </div>
              </div>
              <div className='flex flex-wrap gap-2'>
                {renderMatchBadges(recommendedPackage.matchInfo?.matches)}
              </div>
            </div>
            <div className='px-2 py-2'>
              <DownloadButton href={recommendedPackage.browser_download_url} />
            </div>
          </div>
        </div>
      )}

      {otherPackages.length > 0 && (
        <div>
          <h3 className='text-md font-medium mb-4 text-gray-600'>Other Available Packages</h3>
          {otherPackages.map((pkg, index) => (
            <div key={index} className='border shadow-sm p-4 rounded-md mb-3'>
              <div className='flex flex-col sm:flex-row sm:items-center'>
                <div className='flex-grow'>
                  <span className='flex sm:items-center'>
                    <h3 className='text-lg font-medium'>{pkg.name}</h3>
                    <p className='text-sm text-gray-600'>
                      &nbsp;•&nbsp;score: {pkg.matchInfo?.score || 'N/A'}
                    </p>
                  </span>
                  <div className='flex flex-wrap gap-2'>
                    {renderMatchBadges(pkg.matchInfo?.matches)}
                  </div>
                </div>
                <div className='px-2 py-2'>
                  <DownloadButton href={pkg.browser_download_url} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function renderMatchBadges(
  matches: { exact_match?: string[]; partial_match?: string[]; conflicts?: string[] } | undefined,
) {
  if (!matches) return null

  return (
    <div className='flex flex-wrap gap-2 text-sm'>
      {matches.exact_match?.map((match, index) => (
        <span
          key={index}
          className='bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200'
        >
          <span className='mr-1'>✓</span>
          {match}
        </span>
      ))}
      {matches.partial_match?.map((match, index) => (
        <span
          key={index}
          className='bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full border border-yellow-200'
        >
          {match}
        </span>
      ))}
      {matches.conflicts?.map((conflict, index) => (
        <span
          key={index}
          className='bg-red-50 text-red-700 px-2 py-1 rounded-full border border-red-200'
        >
          <span className='mr-1'>✗</span> {conflict}
        </span>
      ))}
    </div>
  )
}
