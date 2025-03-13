import { useEffect, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { DownloadButton } from '@/components/ui/download-button'
import { type SupportedOS, detectOS, getAppropriateAsset } from '@/lib/utils/detectOS'

function _RepositoryDetail() {
  const [owner] = useQueryState('u', parseAsString)
  const [repo] = useQueryState('r', parseAsString)

  const [readme, setReadme] = useState<GithubResponse['getReadme'] | null>(null)
  const [release, setRelease] = useState<GithubResponse['getLatestRelease'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detectedOS, setDetectedOS] = useState<SupportedOS>('unknown')
  const [downloadAsset, setDownloadAsset] = useState<{ name: string; url: string } | null>(null)

  useEffect(() => {
    // Detect OS on client side
    setDetectedOS(detectOS())

    const fetchRepositoryData = async () => {
      if (!owner || !repo) return

      try {
        setLoading(true)

        // Fetch readme and release data in parallel
        const [readmeData, releaseData] = await Promise.all([
          GithubApi.getReadme({ owner, repo }),
          GithubApi.getLatestRelease({ owner: owner, repo: repo }).catch(() => null),
        ])

        setReadme(readmeData)
        setRelease(releaseData)

        // Find appropriate asset for the detected OS
        if (releaseData) {
          const asset = getAppropriateAsset(releaseData.assets, detectOS())
          setDownloadAsset(asset)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repository data')
      } finally {
        setLoading(false)
      }
    }

    fetchRepositoryData()
  }, [owner, repo])

  if (loading) {
    return <div className='flex justify-center p-12'>Loading repository details...</div>
  }

  if (error) {
    return <div className='text-center text-red-500 p-4'>{error}</div>
  }

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-2'>{repo}</h1>
      <p className='text-gray-500 mb-8'>by {owner}</p>

      {/* Download Section */}
      <div className='bg-gray-100 p-6 rounded-lg mb-8 flex flex-col items-center'>
        <h2 className='text-xl font-semibold mb-4'>Download Latest Release</h2>

        {!release && <p className='text-gray-700'>No releases found for this repository.</p>}

        {release && !downloadAsset && (
          <div className='text-center'>
            <p className='text-gray-700 mb-4'>
              No compatible binary found for your operating system ({detectedOS}
              ).
            </p>
            <p className='text-sm'>
              You can browse all available files in the{' '}
              <a
                href={release.html_url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                release page
              </a>
              .
            </p>
          </div>
        )}

        {release && downloadAsset && (
          <div className='text-center'>
            <p className='text-gray-700 mb-4'>
              We found a compatible binary for your {detectedOS} system:
            </p>
            <p className='font-medium mb-2'>{downloadAsset.name}</p>
            <DownloadButton href={downloadAsset.url} />
          </div>
        )}
      </div>

      <div className='border border-gray-200 rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>README</h2>
        {readme ?
          <div className='prose max-w-none'>
            <pre className='whitespace-pre-wrap'>{readme.content}</pre>
          </div>
        : <p className='text-gray-700'>No README found for this repository.</p>}
      </div>
    </div>
  )
}

export const RepositoryDetail = withNuqsAdapter(_RepositoryDetail)
