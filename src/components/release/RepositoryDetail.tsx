import { useEffect, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { UAParser } from 'ua-parser-js'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { OtherAssets } from '@/components/release/OtherAssets'
import { ReadmeSection } from '@/components/release/Readme'
import { RecommendedDownload } from '@/components/release/RecommendedDownload'
import { ReleaseNotes } from '@/components/release/ReleaseNotes'
import { useTheme } from '@/components/theme-provider'
import type { IRankedRelease } from '@/lib/types'
import { getCurrentOS, PackageService } from '@/services/PackageService'

function _RepositoryDetail() {
  const [owner] = useQueryState('u', parseAsString)
  const [repo] = useQueryState('r', parseAsString)

  const [readme, setReadme] = useState<GithubResponse['getReadme'] | null>(null)
  const [release, setRelease] = useState<IRankedRelease | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [parsedUA, setParsedUA] = useState<UAParser.IResult | null>(null)
  const [osName, setOSName] = useState<string | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchRepositoryData = async () => {
      if (!owner || !repo) return

      try {
        setLoading(true)

        const parsedUserAgent = UAParser(navigator.userAgent)
        setParsedUA(parsedUserAgent)
        setOSName(getCurrentOS(parsedUserAgent.os))

        const [readmeData, releaseData] = await Promise.all([
          GithubApi.getReadme({ owner, repo }),
          PackageService.getRankedPackages(owner, repo, parsedUserAgent),
        ])

        setReadme(readmeData)
        setRelease(releaseData)
      } catch (err: any) {
        if (err?.status === 404) {
          setError(
            'Repository not found. Please check the owner and repository name, or search for another repository.',
          )
        } else {
          setError('Failed to fetch repository data. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRepositoryData()
  }, [owner, repo])

  // Error state handling
  if (error) {
    return <div className='text-center text-red-500 p-4'>{error}</div>
  }

  // Prepare data
  const latestRelease = release?.latestRelease ?? null
  const rankedPackages = release?.rankedPackages ?? []
  const firstPackage = rankedPackages[0] ?? null
  const otherPackages = rankedPackages.slice(1)

  return (
    <div
      className={`container mx-auto p-4 md:p-6 rounded-lg shadow-md ${theme === 'dark' ? 'dark' : ''}`}
    >
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Left Column: Release Notes & README */}
        <div className='md:w-2/3 flex flex-col gap-6'>
          <ReleaseNotes loading={loading} latestRelease={latestRelease} owner={owner} repo={repo} />
          <ReadmeSection loading={loading} readme={readme} />
        </div>
        {/* Right Column: Recommended Download & Other Assets */}
        <div className='md:w-1/3 flex flex-col gap-6'>
          <RecommendedDownload
            loading={loading}
            firstPackage={firstPackage}
            parsedUA={parsedUA}
            osName={osName}
          />
          <OtherAssets loading={loading} otherPackages={otherPackages} />
        </div>
      </div>
    </div>
  )
}

export const RepositoryDetail = withNuqsAdapter(_RepositoryDetail)
