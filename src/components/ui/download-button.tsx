// src/components/ui/download-button.tsx
import { useState, useEffect } from 'react'
import { UAParser } from 'ua-parser-js'
import { ButtonLink } from '@/components/ui/button-link'
import GradientText from '@/components/ui/gradient-text'
import { InstallationGuidance } from '@/components/ui/installation-guidance'
import { PostDownloadModal } from '@/components/ui/post-download-modal'
import { cn } from '@/lib/utils'
import { getCurrentOS } from '@/services/PackageService'

interface DownloadButtonProps
  extends Omit<React.ComponentProps<typeof ButtonLink>, 'download' | 'variant'> {
  fileName?: string
}

export const DownloadButton = ({
  children = 'Download',
  fileName = '',
  className,
  ...props
}: DownloadButtonProps) => {
  const [showGuidance, setShowGuidance] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [osName, setOSName] = useState('')
  const [fileType, setFileType] = useState('')

  useEffect(() => {
    // Detect OS and file type on component mount
    const parsedUserAgent = UAParser(navigator.userAgent)
    const detectedOS = getCurrentOS(parsedUserAgent.os)
    setOSName(detectedOS)

    // Extract file type from href or fileName
    const url = props.href ?? ''
    const name = fileName ?? url.split('/').pop() ?? ''
    const extension = name.split('.').pop()?.toLowerCase() ?? ''

    // Set the appropriate file type based on the extension
    if (['exe', 'msi', 'bat', 'cmd'].includes(extension)) {
      setFileType(extension)
    } else if (['dmg', 'pkg', 'app'].includes(extension)) {
      setFileType(extension)
    } else if (['deb', 'rpm', 'appimage'].includes(extension)) {
      setFileType(extension)
    } else if (['zip', 'tar', 'gz', 'tgz'].includes(extension)) {
      setFileType(extension)
    } else {
      setFileType(extension)
    }
  }, [props.href, fileName])

  useEffect(() => {
    console.debug({ showModal })
  }, [showModal])

  const handleClick = () => {
    // Show download modal immediately
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const closeGuidance = () => {
    setShowGuidance(false)
  }

  const viewInstallationGuide = () => {
    setShowModal(false)
    setShowGuidance(true)
  }

  // Extract file name from URL if not provided
  const displayFileName = (fileName || props.href?.split('/').pop()) ?? 'file'
  console.debug({ fileName, props, displayFileName })

  return (
    <>
      <ButtonLink
        {...props}
        className={cn('w-full', className)}
        download
        variant='download'
        size='download'
        rel='noopener noreferrer'
        target='_blank'
        onClick={handleClick}
      >
        <GradientText
          colors={['#ffccff', '#ffffcc', '#ccffff']}
          animationSpeed={3}
          showBorder={false}
          className='font-extrabold'
        >
          {children}
        </GradientText>
      </ButtonLink>

      {/* Post-download modal (appears immediately after download starts) */}
      <PostDownloadModal
        fileName={displayFileName}
        fileType={fileType}
        osName={osName}
        isOpen={showModal}
        onClose={closeModal}
        onViewInstallGuide={viewInstallationGuide}
      />

      {/* Installation guidance (appears when user clicks to view the guide) */}
      <InstallationGuidance
        fileName={displayFileName}
        fileType={fileType}
        osName={osName}
        isOpen={showGuidance}
        onClose={closeGuidance}
      />
    </>
  )
}
