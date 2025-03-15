// src/components/features/DownloadSection.tsx
import { useEffect, useState } from 'react'
import { type GithubResponse } from '@/clients/github/api'
import { DownloadButton } from '@/components/ui/download-button'
import { type SupportedOS, getAppropriateAsset } from '@/lib/utils/detectOS'

interface DownloadSectionProps {
  release: GithubResponse['getLatestRelease'] | null
  detectedOS: SupportedOS
}

export function DownloadSection({ release, detectedOS }: DownloadSectionProps) {
  const [downloadAsset, setDownloadAsset] = useState<{ name: string; url: string } | null>(null)

  useEffect(() => {
    if (release) {
      const asset = getAppropriateAsset(release.assets, detectedOS)
      setDownloadAsset(asset)
    }
  }, [release, detectedOS])

  if (!release) return <p className='text-gray-700'>No releases found for this repository.</p>

  return (
    <div className='bg-gray-100 p-6 rounded-lg mb-8 flex flex-col items-center'>
      <h2 className='text-xl font-semibold mb-4'>Download Latest Release</h2>

      {!downloadAsset && (
        <div className='text-center'>
          <p className='text-gray-700 mb-4'>
            No compatible binary found for your operating system ({detectedOS}).
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

      {downloadAsset && (
        <div className='text-center'>
          <p className='text-gray-700 mb-4'>
            We found a compatible binary for your {detectedOS} system:
          </p>
          <p className='font-medium mb-2'>{downloadAsset.name}</p>
          <DownloadButton href={downloadAsset.url} />
        </div>
      )}
    </div>
  )
}
