import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { parseAsString, useQueryState } from 'nuqs'
import remarkGfm from 'remark-gfm'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { DownloadSection } from '@/components/features/DownloadSection'
import type { IRankedRelease } from '@/lib/types'
import { type SupportedOS, detectOS } from '@/lib/utils/detectOS'
import { PackageService } from '@/services/PackageService'

function _RepositoryDetail() {
  const [owner] = useQueryState('u', parseAsString)
  const [repo] = useQueryState('r', parseAsString)

  const [readme, setReadme] = useState<GithubResponse['getReadme'] | null>(null)
  const [release, setRelease] = useState<IRankedRelease | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detectedOS, setDetectedOS] = useState<SupportedOS>('unknown')

  useEffect(() => {
    // Detect OS on client side
    setDetectedOS(detectOS())

    const fetchRepositoryData = async () => {
      if (!owner || !repo) return

      try {
        setLoading(true)
        const [readmeData, releaseData] = await Promise.all([
          GithubApi.getReadme({ owner, repo }),
          PackageService.getRankedPackages(owner, repo, navigator.userAgent),
        ])

        setReadme(readmeData)
        setRelease(releaseData)
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
  console.debug({ content: readme?.content })

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold'>{repo}</h1>
      <p className='opacity-50 mb-2'>by {owner}</p>
      // i want to have 2 columns - on the left there will be readme on the right we will have
      releases. integrate it with previous code. it is in one columns so far
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='md:col-span-1'>
          {/* Left column for README */}
          {readme ?
            <div className='typography max-w-none bg-zinc-50 border-zinc-200 dark:bg-zinc-900 border dark:border-zinc-800 px-8 py-1'>
              <Markdown skipHtml remarkPlugins={[remarkGfm]}>
                {readme.content}
              </Markdown>
            </div>
          : <p className='text-gray-700'>No README found for this repository.</p>}
        </div>
        <div className='md:col-span-1'>
          {/* Right column for Releases */}
          <div className='flex justify-center mb-4'>
            <DownloadSection release={release} detectedOS={detectedOS} />
          </div>
        </div>
      </div>
      <div className='flex justify-center mb-4'>
        <DownloadSection release={release} detectedOS={detectedOS} />
      </div>
      {/* {readme ?
        <div className='typography max-w-none bg-zinc-50 border-zinc-200 dark:bg-zinc-900 border dark:border-zinc-800 px-8 py-1'>
          <Markdown skipHtml remarkPlugins={[remarkGfm]}>
            {readme.content}
          </Markdown>
        </div>
        : <p className='text-gray-700'>No README found for this repository.</p>} */}
    </div>
  )
}

export const RepositoryDetail = withNuqsAdapter(_RepositoryDetail)
