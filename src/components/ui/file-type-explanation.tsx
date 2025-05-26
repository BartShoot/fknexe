// src/components/ui/file-type-explanations.tsx
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileTypeExplanationsProps {
  fileType: string
}

export function FileTypeExplanation({ fileType }: FileTypeExplanationsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Function to render the appropriate file type explanation
  const renderFileTypeExplanation = () => {
    switch (fileType) {
      case 'exe':
        return renderFileTypeBox(
          '.exe',
          'Executable file. Double-click to run or install the program.',
        )
      case 'msi':
        return renderFileTypeBox(
          '.msi',
          'Microsoft Installer package. Contains all files needed to install an application.',
        )
      case 'msix':
        return renderFileTypeBox(
          '.msix',
          'Modern Windows app package. More secure and reliable than traditional installers.',
        )
      case 'bat':
      case 'cmd':
        return renderFileTypeBox(
          '.bat / .cmd',
          'Batch script files. Run commands automatically when opened.',
        )
      case 'dmg':
        return renderFileTypeBox(
          '.dmg',
          'Disk image file. Mount it to access the application, then drag to Applications folder.',
        )
      case 'pkg':
        return renderFileTypeBox(
          '.pkg',
          'Installation package. Runs an installer to set up the application.',
        )
      case 'app':
        return renderFileTypeBox(
          '.app',
          'Application bundle. A complete macOS application ready to run.',
        )
      case 'command':
        return renderFileTypeBox(
          '.command',
          'Shell script file. Runs commands in Terminal when opened.',
        )
      case 'deb':
        return renderFileTypeBox(
          '.deb',
          'Debian package. Used by Debian, Ubuntu, and related distributions.',
        )
      case 'rpm':
        return renderFileTypeBox(
          '.rpm',
          'Red Hat package. Used by Fedora, RHEL, CentOS, and related distributions.',
        )
      case 'appimage':
        return renderFileTypeBox(
          '.AppImage',
          'Self-contained application. Works across many Linux distributions without installation.',
        )
      case 'sh':
        return renderFileTypeBox(
          '.sh',
          'Shell script. Make executable with chmod +x before running.',
        )
      case 'zip':
        return renderFileTypeBox(
          '.zip',
          "Compressed archive file. You'll need to extract it before using the contents.",
        )
      case 'tar':
      case 'gz':
      case 'tgz':
        return renderFileTypeBox(
          '.tar.gz / .tgz',
          'Compressed archive common on Unix systems. Extract to access the contents.',
        )

      default:
        return renderFileTypeBox(
          `.${fileType}`,
          'A file used by this application. Check the documentation for specific installation instructions.',
        )
    }
  }

  // Helper function to render a file type explanation box
  const renderFileTypeBox = (extension: string, description: string) => {
    return (
      <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
        <span className='font-medium text-xs'>{extension}</span>
        <p className='text-xs mt-1'>{description}</p>
      </div>
    )
  }

  return (
    <div className='mt-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4 text-sm'>
      <div className='flex justify-between items-center cursor-pointer' onClick={toggleExpanded}>
        <h4 className='font-semibold text-gray-800 dark:text-gray-200'>What is this file type?</h4>
        <Button variant='ghost' size='sm' className='h-6 px-2'>
          {isExpanded ?
            <ChevronUp size={16} />
          : <ChevronDown size={16} />}
        </Button>
      </div>

      {isExpanded && (
        <div className='mt-3 space-y-4'>
          <div className='grid grid-cols-1 gap-2'>{renderFileTypeExplanation()}</div>
        </div>
      )}
    </div>
  )
}
