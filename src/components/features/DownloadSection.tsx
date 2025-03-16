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

  return (
    <div>
      {(!!downloadAsset && (
        <div className='flex flex-col items-center'>
          <p>Found download asset for your {detectedOS} system</p>
          <i className='mb-2'>{downloadAsset.name}</i>
          <DownloadButton href={downloadAsset.url} />
        </div>
      )) || <div>No download asset found for your {detectedOS} system</div>}
    </div>
  )
}
