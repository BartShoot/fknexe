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
        return
      }

      // Reset states for new fetch
      setIsReadmeLoading(true)
      setIsReleaseLoading(true)
      setReadmeError(null)
      setReleaseError(null)
      setRepoNotFoundError(null)
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
        if (err?.status === 404) {
          setRepoNotFoundError(
            'Repository not found. Please check the owner and repository name, or search for another repository.',
          )
          // No need to fetch releases if repo is not found
          setIsReleaseLoading(false) // Ensure release loading is also false
          setReadme(null) // Ensure readme is null
          setRelease(null) // Ensure release is null
        } else {
          setReadmeError('Failed to load README.')
          setReadme(null)
        }
      } finally {
        setIsReadmeLoading(false)
      }

      // Fetch Releases only if repo was found
      if (!repoNotFoundError) {
        try {
          setIsReleaseLoading(true) // Explicitly set true before fetch
          const releaseData = await PackageService.getRankedPackages(owner, repo, parsedUserAgent)
          setRelease(releaseData)
        } catch (err: any) {
          if (err?.status === 404) {
            setReleaseError('No releases found for this repository.') // Or let components handle null
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
  }, [owner, repo, repoNotFoundError]) // Added repoNotFoundError to dependencies to handle its change

  // Overall error state handling for "Repository Not Found"
  if (repoNotFoundError) {
    return <div className='text-center text-red-500 p-4'>{repoNotFoundError}</div>
  }

  // Prepare data for child components
  const latestRelease = release?.latestRelease ?? null
  const rankedPackages = release?.rankedPackages ?? []
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
            // error={releaseError} // Optional
          />
          <OtherAssets
            loading={isReleaseLoading}
            otherPackages={otherPackages}
            // error={releaseError} // Optional
          />
        </div>
      </div>
    </div>
  )
}

export const RepositoryDetail = withNuqsAdapter(_RepositoryDetail)
