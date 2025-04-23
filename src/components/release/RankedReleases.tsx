import { PackageCard } from '@/components/release/PackageCard'
import { type IRankedRelease } from '@/lib/types'

interface RankedReleasesProps {
  release: IRankedRelease | null
}

export function RankedReleases({ release }: RankedReleasesProps) {
  if (!release?.rankedPackages) {
    return <p>No ranked releases found.</p>
  }

  const recommendedPackage = release.rankedPackages[0]!
  const otherPackages = release.rankedPackages.slice(1)

  return (
    <div className='container mx-auto px-4 max-w-3xl space-y-6'>
      {/* Recommended Package */}
      <div>
        <span className='bg-green-100 text-green-800 px-2 py-1 rounded-md'>Recommended</span>
        <div className='mt-2'>
          <PackageCard
            name={recommendedPackage.name}
            url={recommendedPackage.browser_download_url}
            matchInfo={recommendedPackage.matchInfo}
            recommended
          />
        </div>
      </div>

      {/* Other Available Packages */}
      {otherPackages.length > 0 && (
        <div>
          <h3 className='text-md font-medium mb-2 text-gray-600'>Other Available Packages</h3>
          <div className='space-y-4'>
            {otherPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                name={pkg.name}
                url={pkg.browser_download_url}
                matchInfo={pkg.matchInfo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
