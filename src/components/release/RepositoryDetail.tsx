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
  const [parsedUA, setParsedUA] = useState<UAParser.IResult | null>(null)
  const [osName, setOSName] = useState<string | null>(null)
  const { theme } = useTheme()

  // New granular loading and error states
  const [isReadmeLoading, setIsReadmeLoading] = useState(true)
  const [isReleaseLoading, setIsReleaseLoading] = useState(true)
  const [readmeError, setReadmeError] = useState<string | null>(null)
  const [releaseError, setReleaseError] = useState<string | null>(null)
  const [repoNotFoundError, setRepoNotFoundError] = useState<string | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<{ resetTime: number } | null>(null)

  useEffect(() => {
    const fetchRepositoryData = async () => {
      if (!owner || !repo) {
        // Reset states if owner/repo are not present (e.g., cleared from URL)
        setIsReadmeLoading(true)
        setIsReleaseLoading(true)
        setReadme(null)
        setRelease(null)
        setReadmeError(null)
        setReleaseError(null)
        setRepoNotFoundError(null)
        setRateLimitInfo(null)
        return
      }

      // Reset states for new fetch
      setIsReadmeLoading(true)
      setIsReleaseLoading(true)
      setReadmeError(null)
      setReleaseError(null)
      setRepoNotFoundError(null)
      setRateLimitInfo(null)
      setReadme(null) // Clear previous data
      setRelease(null) // Clear previous data

      const parsedUserAgent = UAParser(navigator.userAgent)
      setParsedUA(parsedUserAgent)
      setOSName(getCurrentOS(parsedUserAgent.os))

      // Fetch README
      try {
        const readmeData = await GithubApi.getReadme({ owner, repo })
        setReadme(readmeData)
      } catch (err: any) {
        if (err?.isRateLimitError && typeof err?.rateLimitResetTime === 'number') {
          setRateLimitInfo({ resetTime: err.rateLimitResetTime })
          setReadme(null)
          setRelease(null)
          setIsReadmeLoading(false)
          setIsReleaseLoading(false)
          return // Stop further processing
        } else if (err?.status === 404) {
          setRepoNotFoundError(
            'Repository not found. Please check the owner and repository name, or search for another repository.',
          )
          setIsReleaseLoading(false) // No need to attempt release fetch
          setReadme(null)
          setRelease(null)
        } else {
          setReadmeError('Failed to load README.')
          setReadme(null)
        }
      } finally {
        setIsReadmeLoading(false)
      }

      // Fetch Releases only if repo was found AND NOT rate limited during README fetch
      if (!repoNotFoundError && !rateLimitInfo) {
        try {
          setIsReleaseLoading(true) // Set loading true for this specific fetch
          const releaseData = await PackageService.getRankedPackages(owner, repo, parsedUserAgent)
          setRelease(releaseData)
        } catch (err: any) {
          if (err?.isRateLimitError && typeof err?.rateLimitResetTime === 'number') {
            setRateLimitInfo({ resetTime: err.rateLimitResetTime })
            setRelease(null)
            // setIsReleaseLoading is handled in finally
          } else if (err?.status === 404) {
            setReleaseError('No releases found for this repository.')
            setRelease(null)
          } else {
            setReleaseError('Failed to load release data.')
            setRelease(null)
          }
        } finally {
          setIsReleaseLoading(false)
        }
      }
    }

    fetchRepositoryData()
  }, [owner, repo, repoNotFoundError]) // Dependencies remain the same

  // Highest priority error: Rate Limit
  if (rateLimitInfo) {
    const remainingMs = rateLimitInfo.resetTime * 1000 - Date.now()
    const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000))
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60
    let message = 'API rate limit exceeded. '
    if (remainingSeconds <= 0) {
      message += 'Please try again now.'
    } else if (minutes > 0) {
      message += `Please try again in ${minutes}m ${seconds}s.`
    } else {
      message += `Please try again in ${seconds}s.`
    }
    return (
      <div className='p-4 border rounded-md bg-red-100 border-red-400 text-red-700 dark:bg-red-800 dark:border-red-600 dark:text-red-100 text-center'>
        {message}
      </div>
    )
  }

  // Second priority error: Repository Not Found
  if (repoNotFoundError) {
    return <div className='text-center text-red-500 p-4'>{repoNotFoundError}</div>
  }

  // Prepare data for child components
  const latestRelease = release?.latestRelease ?? null
  const rankedPackages = release?.rankedPackages ?? []
  const totalRankedPackagesCount = rankedPackages.length
  const firstPackage = rankedPackages[0] ?? null
  const otherPackages = rankedPackages.slice(1)

  // Note: Child components like ReadmeSection, ReleaseNotes already handle null data
  // by showing "No README found" or "No releases found".
  // We can pass readmeError/releaseError to them if we want more specific error messages
  // within their boundaries, but it's optional for this refactoring's main goal.

  return (
    <div
      className={`container mx-auto p-4 md:p-6 rounded-lg shadow-md ${theme === 'dark' ? 'dark' : ''}`}
    >
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Left Column: Release Notes & README */}
        <div className='md:w-2/3 flex flex-col gap-6'>
          <ReleaseNotes
            loading={isReleaseLoading}
            latestRelease={latestRelease}
            owner={owner}
            repo={repo}
            // error={releaseError} // Optional: pass error to display in component
          />
          <ReadmeSection
            loading={isReadmeLoading}
            readme={readme}
            // error={readmeError} // Optional: pass error to display in component
          />
        </div>
        {/* Right Column: Recommended Download & Other Assets */}
        <div className='md:w-1/3 flex flex-col gap-6'>
          <RecommendedDownload
            loading={isReleaseLoading}
            firstPackage={firstPackage}
            parsedUA={parsedUA}
            osName={osName}
            totalRankedPackagesCount={totalRankedPackagesCount}
            // error={releaseError} // Optional
          />
          <OtherAssets
            loading={isReleaseLoading}
            otherPackages={otherPackages}
            totalRankedPackagesCount={totalRankedPackagesCount}
            // error={releaseError} // Optional
          />
        </div>
      </div>
    </div>
  )
}

export const RepositoryDetail = withNuqsAdapter(_RepositoryDetail)
