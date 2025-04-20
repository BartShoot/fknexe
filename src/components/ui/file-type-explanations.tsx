// src/components/ui/file-type-explanations.tsx
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileTypeExplanationsProps {
  osName: string
}

export function FileTypeExplanations({ osName }: FileTypeExplanationsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='mt-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4 text-sm'>
      <div className='flex justify-between items-center cursor-pointer' onClick={toggleExpanded}>
        <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
          What are these file types?
        </h4>
        <Button variant='ghost' size='sm' className='h-6 px-2'>
          {isExpanded ?
            <ChevronUp size={16} />
          : <ChevronDown size={16} />}
        </Button>
      </div>

      {isExpanded && (
        <div className='mt-3 space-y-4'>
          {osName.toLowerCase() === 'windows' && <WindowsFileTypes />}
          {osName.toLowerCase() === 'macos' && <MacOSFileTypes />}
          {osName.toLowerCase() === 'linux' && <LinuxFileTypes />}

          {/* Always show cross-platform formats */}
          <div>
            <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Cross-Platform Formats
            </h5>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
                <span className='font-medium text-xs'>.zip</span>
                <p className='text-xs mt-1'>
                  Compressed archive file. You'll need to extract it before using the contents.
                </p>
              </div>
              <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
                <span className='font-medium text-xs'>.tar.gz / .tgz</span>
                <p className='text-xs mt-1'>
                  Compressed archive common on Unix systems. Extract to access the contents.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function WindowsFileTypes() {
  return (
    <div>
      <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-1'>Windows File Types</h5>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.exe</span>
          <p className='text-xs mt-1'>
            Executable file. Double-click to run or install the program.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.msi</span>
          <p className='text-xs mt-1'>
            Microsoft Installer package. Contains all files needed to install an application.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.msix</span>
          <p className='text-xs mt-1'>
            Modern Windows app package. More secure and reliable than traditional installers.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.bat / .cmd</span>
          <p className='text-xs mt-1'>
            Batch script files. Run commands automatically when opened.
          </p>
        </div>
      </div>
    </div>
  )
}

function MacOSFileTypes() {
  return (
    <div>
      <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-1'>macOS File Types</h5>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.dmg</span>
          <p className='text-xs mt-1'>
            Disk image file. Mount it to access the application, then drag to Applications folder.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.pkg</span>
          <p className='text-xs mt-1'>
            Installation package. Runs an installer to set up the application.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.app</span>
          <p className='text-xs mt-1'>
            Application bundle. A complete macOS application ready to run.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.command</span>
          <p className='text-xs mt-1'>Shell script file. Runs commands in Terminal when opened.</p>
        </div>
      </div>
    </div>
  )
}

function LinuxFileTypes() {
  return (
    <div>
      <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-1'>Linux File Types</h5>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.deb</span>
          <p className='text-xs mt-1'>
            Debian package. Used by Debian, Ubuntu, and related distributions.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.rpm</span>
          <p className='text-xs mt-1'>
            Red Hat package. Used by Fedora, RHEL, CentOS, and related distributions.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.AppImage</span>
          <p className='text-xs mt-1'>
            Self-contained application. Works across many Linux distributions without installation.
          </p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
          <span className='font-medium text-xs'>.sh</span>
          <p className='text-xs mt-1'>
            Shell script. Make executable with chmod +x before running.
          </p>
        </div>
      </div>
    </div>
  )
}
