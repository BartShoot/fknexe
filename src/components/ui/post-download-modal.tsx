// src/components/ui/post-download-modal.tsx
import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SecurityWarningGuidance } from '@/components/ui/security-warning-guidance'

interface PostDownloadModalProps {
  fileName: string
  fileType: string
  osName: string
  isOpen: boolean
  onClose: () => void
  onViewInstallGuide: () => void
}

export function PostDownloadModal({
  fileName,
  fileType,
  osName,
  isOpen,
  onClose,
  onViewInstallGuide,
}: PostDownloadModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showSecurityGuide, setShowSecurityGuide] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    if (isOpen) {
      setIsVisible(true)

      // Auto-close after 8 seconds if user doesn't interact
      timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Allow fade-out animation to complete
      }, 8000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen && !isVisible) return null

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 max-w-sm bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-800 p-4 transition-all duration-300 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}
      >
        <div className='flex justify-between items-start'>
          <div className='flex items-start'>
            <div className='flex-shrink-0 mr-3'>
              <CheckCircle className='h-6 w-6 text-green-500' />
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                Download Started
              </h3>
              <div className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                <p className='font-medium text-gray-700 dark:text-gray-300'>{fileName}</p>
                <p className='mt-1'>Your file should begin downloading shortly.</p>
              </div>
            </div>
          </div>

          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            aria-label='Close download started confirmation modal'
          >
            <X size={18} />
          </Button>
        </div>

        <div className='mt-3 flex space-x-2'>
          <Button
            variant='outline'
            size='sm'
            className='flex items-center text-xs'
            onClick={onViewInstallGuide}
          >
            <HelpCircle className='mr-1 h-3 w-3' />
            Installation Guide
          </Button>

          {needsSecurityWarning(osName, fileType) && (
            <Button
              variant='ghost'
              size='sm'
              className='flex items-center text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/30'
              onClick={() => setShowSecurityGuide(true)}
            >
              <AlertTriangle className='mr-1 h-3 w-3' />
              Security Warnings
            </Button>
          )}
        </div>
      </div>

      {/* Security Warning Guidance Modal */}
      <SecurityWarningGuidance
        osName={osName}
        isOpen={showSecurityGuide}
        onClose={() => setShowSecurityGuide(false)}
      />
    </>
  )
}

// Helper function to determine if security warning is needed
function needsSecurityWarning(osName: string, fileType: string): boolean {
  const osLower = osName.toLowerCase()
  const fileTypeLower = fileType.toLowerCase()

  // Windows executables and installers
  if (osLower === 'windows' && ['exe', 'msi', 'msix'].includes(fileTypeLower)) {
    return true
  }

  // macOS installers
  if (osLower === 'macos' && ['dmg', 'pkg'].includes(fileTypeLower)) {
    return true
  }

  // Linux executables
  if (osLower === 'linux' && ['appimage', 'sh', 'run'].includes(fileTypeLower)) {
    return true
  }

  return false
}
