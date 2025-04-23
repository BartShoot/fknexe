import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Github } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import remarkGfm from 'remark-gfm'
import { UAParser } from 'ua-parser-js'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { useTheme } from '@/components/theme-provider'
import { ButtonLink } from '@/components/ui/button-link'
import type { IRankedRelease, IMatchResult } from '@/lib/types'
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repository data')
      } finally {
        setLoading(false)
      }
    }

    fetchRepositoryData()
  }, [owner, repo])

  // Helper function to format bytes
  const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  // Helper function to render match tags
  const renderMatchTags = (matchInfo: IMatchResult) => {
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

  if (loading) {
    return <div className='flex justify-center p-12'>Loading repository details...</div>
  }

  if (error) {
    return <div className='text-center text-red-500 p-4'>{error}</div>
  }

  if (!release) {
    return <div className='text-center text-gray-500 p-4'>No release data found.</div>
  }

  const { latestRelease, rankedPackages } = release
  const firstPackage = rankedPackages?.[0]
  const otherPackages = rankedPackages?.slice(1) || []

  return (
    <div
      className={`container mx-auto p-4 md:p-6 rounded-lg shadow-md ${theme === 'dark' ? 'dark' : ''}`}
    >
      {/* Main Content: Two Columns */}
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Left Column */}
        <div className='md:w-2/3 flex flex-col gap-6'>
          {/* Release Notes */}
          <div className={`pb-4 border-b dark:border-zinc-800`}>
            <TooltipProvider delayDuration={300}>
              <div className='flex items-center justify-between'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h2 className={`text-2xl font-bold mb-2 dark:text-white`}>
                      <a
                        href={latestRelease.html_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block hover:bg-gray-100 hover:text-gray-700 transition duration-150 ease-in-out'
                      >
                        Release Notes: {latestRelease.name} ({latestRelease.tag_name})
                      </a>
                    </h2>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open release on GitHub</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ButtonLink
                      variant='ghost'
                      size='icon'
                      className='text-muted-foreground border-2'
                      href={`https://github.com/${owner}/${repo}/`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github size={24} />
                    </ButtonLink>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            <p className={`text-sm mb-3 text-gray-600 dark:text-gray-400`}>
              {latestRelease.published_at && (
                <span>
                  Published on: {new Date(latestRelease.published_at).toLocaleDateString()} by{' '}
                </span>
              )}
              <a
                href={latestRelease.author.html_url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:underline dark:text-blue-400'
              >
                {latestRelease.author.login}
              </a>
            </p>
            {latestRelease.body ?
              <div className='typography max-w-none bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 px-4 py-1 rounded-md'>
                <Markdown skipHtml remarkPlugins={[remarkGfm]}>
                  {latestRelease.body}
                </Markdown>
              </div>
            : <div
                className={`border border-dashed rounded-md p-6 min-h-[100px] flex items-center justify-center border-gray-300 bg-gray-50 text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400`}
              >
                <p>No release notes found for this release.</p>
              </div>
            }
          </div>

          {/* Readme */}
          <div className={`pb-4 border-b dark:border-zinc-800`}>
            <h3 className={`text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300`}>
              README
            </h3>
            {readme ?
              <div className='typography max-w-none bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 px-8 py-1 rounded-md'>
                <Markdown skipHtml remarkPlugins={[remarkGfm]}>
                  {readme.content}
                </Markdown>
              </div>
            : <div
                className={`border border-dashed rounded p-6 min-h-[300px] flex items-center justify-center border-gray-300 bg-gray-50 text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400`}
              >
                <p>No README found for this repository.</p>
              </div>
            }
          </div>
        </div>

        {/* Right Column */}
        <div className='md:w-1/3 flex flex-col gap-6'>
          {/* First Ranked Package */}
          {firstPackage && (
            <div
              className={`p-4 rounded-md border bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-800`}
            >
              <h3 className={`text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200`}>
                Recommended Download
              </h3>
              {parsedUA && (
                <p className={`text-sm mb-3 text-gray-600 dark:text-gray-300`}>
                  For your {osName} system{' '}
                  {parsedUA.cpu.architecture ? `with ${parsedUA.cpu.architecture} CPU` : ''} we
                  recommend:
                </p>
              )}
              <div className='flex flex-col'>
                <p className={`text-lg font-medium break-words text-gray-800 dark:text-gray-200`}>
                  {firstPackage.name}
                </p>
                {firstPackage.matchInfo && renderMatchTags(firstPackage.matchInfo)}
              </div>
              <p className={`text-sm mb-3 mt-3 text-gray-600 dark:text-gray-300`}>
                Downloads: {firstPackage.download_count.toLocaleString()}
              </p>
              <a
                href={firstPackage.browser_download_url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full text-sm transition duration-150 ease-in-out w-full text-center dark:bg-blue-500 dark:hover:bg-blue-400'
                download
              >
                Download ({formatBytes(firstPackage.size)})
              </a>
              <div className='mt-4 text-center'>
                <p className='text-xs mt-2 text-gray-500 dark:text-gray-400'>
                  If this is not the right package for you, please let us know!
                </p>
                <button
                  data-tally-open='n94KX5'
                  data-tally-width='450'
                  data-tally-hide-title='1'
                  data-tally-overlay='1'
                  data-tally-emoji-text='🤔'
                  data-tally-emoji-animation='spin'
                  data-tally-auto-close='2000'
                  className='mt-2 text-sm border-2 py-2 px-4 hover:bg-gray-100 rounded-full border-gray-500 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400'
                >
                  Did we get this right?
                </button>
              </div>
            </div>
          )}

          {/* Other Packages */}
          {otherPackages.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300`}>
                Other Assets
              </h3>
              <ul className='space-y-2'>
                {otherPackages.map((pkg) => (
                  <li
                    key={pkg.id}
                    className={`pb-2 last:border-b-0 border-b border-gray-200 dark:border-zinc-700`}
                  >
                    <div className='flex justify-between items-center flex-col md:flex-row'>
                      <div className='flex flex-col'>
                        <span
                          className={`text-sm break-words pr-2 flex-1 text-gray-800 dark:text-gray-200`}
                        >
                          {pkg.name}
                        </span>
                        {pkg.matchInfo && renderMatchTags(pkg.matchInfo)}
                      </div>
                      <a
                        href={pkg.browser_download_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-xs text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap dark:text-blue-400 dark:hover:text-blue-300'
                        download
                      >
                        Download ({formatBytes(pkg.size)})
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const RepositoryDetail = withNuqsAdapter(_RepositoryDetail)
