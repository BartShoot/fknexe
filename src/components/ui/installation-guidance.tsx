// src/components/ui/installation-guidance.tsx
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InstallationGuidanceProps {
  fileName: string
  fileType: string
  osName: string
  isOpen: boolean
  onClose: () => void
}

export function InstallationGuidance({
  fileName,
  fileType,
  osName,
  isOpen,
  onClose,
}: InstallationGuidanceProps) {
  if (!isOpen) return null

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 shadow-lg border-t border-gray-200 dark:border-zinc-800 p-4 z-50 transition-transform duration-300 ease-in-out transform translate-y-0'>
      <div className='container mx-auto max-w-5xl'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='text-xl font-bold text-gray-800 dark:text-gray-200'>Installation Guide</h3>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            aria-label='Close installation guidance'
          >
            <X size={18} />
          </Button>
        </div>

        <div className='mb-4'>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
            You've downloaded <span className='font-medium'>{fileName}</span>. Here's how to install
            it on your {osName} system:
          </p>
        </div>

        {osName.toLowerCase() === 'windows' && <WindowsGuidance fileType={fileType} />}
        {osName.toLowerCase() === 'macos' && <MacOSGuidance fileType={fileType} />}
        {osName.toLowerCase() === 'linux' && <LinuxGuidance fileType={fileType} />}

        <div className='text-xxs mt-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-xs text-yellow-800 dark:text-yellow-300'>
          <p>
            <strong>Important:</strong> These instructions are provided as general guidance only. We
            take no responsibility for the safety, integrity, or behavior of any software you
            download. Always:
          </p>
          <ul className='list-disc pl-5 mt-1 space-y-1'>
            <li>Download software only from sources you trust</li>
            <li>Verify checksums or digital signatures when available</li>
            <li>Keep your operating system and antivirus software up-to-date</li>
          </ul>
          <p className='mt-1'>
            By downloading and installing any software, you acknowledge that you do so at your own
            risk. We do not endorse, verify, or take responsibility for any third-party
            applications.
          </p>
        </div>

        <div className='mt-4 text-xs text-gray-500 dark:text-gray-400'>
          <p>
            <strong>Security Note:</strong> Modern operating systems include security measures that
            may show warnings when installing software from the internet. This is normal and helps
            protect your system.
          </p>
        </div>
      </div>
    </div>
  )
}

function WindowsGuidance({ fileType }: { fileType: string }) {
  const isExe = fileType.includes('exe')
  const isMsi = fileType.includes('msi')
  const isZip = fileType.includes('zip')

  return (
    <div className='bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4'>
      <h4 className='font-semibold text-blue-800 dark:text-blue-300 mb-2'>
        Windows Installation Steps
      </h4>
      <ol className='list-decimal pl-5 space-y-2'>
        {isExe && (
          <>
            <li>Locate the .exe file in your Downloads folder</li>
            <li>
              Right-click the file and select "Run as administrator" (recommended) or double-click
              to run
            </li>
            <li>
              If you see a User Account Control (UAC) prompt asking "Do you want to allow this app
              to make changes to your device?", click "Yes"
            </li>
            <li>Follow the installation wizard instructions</li>
          </>
        )}

        {isMsi && (
          <>
            <li>Locate the .msi file in your Downloads folder</li>
            <li>Double-click the file to start the installer</li>
            <li>If you see a User Account Control (UAC) prompt, click "Yes"</li>
            <li>Follow the installation wizard instructions</li>
          </>
        )}

        {isZip && (
          <>
            <li>Locate the .zip file in your Downloads folder</li>
            <li>Right-click the file and select "Extract All..."</li>
            <li>Choose a destination folder and click "Extract"</li>
            <li>
              Open the extracted folder and look for an executable (.exe) file to run the
              application
            </li>
          </>
        )}

        {!isExe && !isMsi && !isZip && (
          <>
            <li>Locate the downloaded file in your Downloads folder</li>
            <li>Double-click the file to open or install it</li>
            <li>
              If Windows doesn't know how to open the file, you may need to use a specific
              application
            </li>
          </>
        )}
      </ol>

      <div className='mt-3 text-sm text-blue-700 dark:text-blue-300'>
        <h5 className='font-semibold'>Common Windows Security Warnings</h5>
        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <div className='border border-blue-200 dark:border-blue-700 rounded p-2 bg-white dark:bg-blue-950/50'>
            <h6 className='font-medium'>SmartScreen Warning</h6>
            <p className='text-xs mt-1'>
              If you see "Windows protected your PC", click "More info" then "Run anyway" if you
              trust the source.
            </p>
          </div>
          <div className='border border-blue-200 dark:border-blue-700 rounded p-2 bg-white dark:bg-blue-950/50'>
            <h6 className='font-medium'>Antivirus Alert</h6>
            <p className='text-xs mt-1'>
              Your antivirus may scan the file. If flagged, consider checking the publisher's
              website for verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MacOSGuidance({ fileType }: { fileType: string }) {
  const isDmg = fileType.includes('dmg')
  const isPkg = fileType.includes('pkg')
  const isZip = fileType.includes('zip')

  return (
    <div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4'>
      <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
        macOS Installation Steps
      </h4>
      <ol className='list-decimal pl-5 space-y-2'>
        {isDmg && (
          <>
            <li>Locate the .dmg file in your Downloads folder</li>
            <li>Double-click the file to mount the disk image</li>
            <li>In the opened window, drag the application icon to the Applications folder</li>
            <li>Eject the disk image by dragging it to the Trash</li>
            <li>Open the application from your Applications folder</li>
          </>
        )}

        {isPkg && (
          <>
            <li>Locate the .pkg file in your Downloads folder</li>
            <li>Double-click to open the installer</li>
            <li>Follow the installation wizard instructions</li>
            <li>You may be prompted to enter your admin password</li>
          </>
        )}

        {isZip && (
          <>
            <li>Locate the .zip file in your Downloads folder</li>
            <li>Double-click the file to extract it</li>
            <li>Open the extracted folder and drag the application to your Applications folder</li>
          </>
        )}

        {!isDmg && !isPkg && !isZip && (
          <>
            <li>Locate the downloaded file in your Downloads folder</li>
            <li>Double-click the file to open or install it</li>
            <li>If macOS doesn't know how to open the file, you may need a specific application</li>
          </>
        )}
      </ol>

      <div className='mt-3 text-sm text-gray-700 dark:text-gray-300'>
        <h5 className='font-semibold'>Common macOS Security Warnings</h5>
        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
            <h6 className='font-medium'>"App cannot be opened" Warning</h6>
            <p className='text-xs mt-1'>
              If you see "App can't be opened because it is from an unidentified developer", go to
              System Preferences {'>'} Security & Privacy and click "Open Anyway".
            </p>
          </div>
          <div className='border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-900'>
            <h6 className='font-medium'>Gatekeeper Alert</h6>
            <p className='text-xs mt-1'>
              Right-click (or Control+click) the app and select "Open" from the context menu, then
              click "Open" in the dialog.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinuxGuidance({ fileType }: { fileType: string }) {
  const isDeb = fileType.includes('deb')
  const isRpm = fileType.includes('rpm')
  const isAppImage = fileType.includes('appimage')
  const isTar = fileType.includes('tar') || fileType.includes('gz')

  return (
    <div className='bg-green-50 dark:bg-green-900/30 rounded-lg p-4'>
      <h4 className='font-semibold text-green-800 dark:text-green-300 mb-2'>
        Linux Installation Steps
      </h4>
      <ol className='list-decimal pl-5 space-y-2'>
        {isDeb && (
          <>
            <li>Open a terminal</li>
            <li>
              Navigate to your Downloads folder:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>cd ~/Downloads</code>
            </li>
            <li>
              Install the package using:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>
                sudo dpkg -i filename.deb
              </code>
            </li>
            <li>
              If there are dependency issues, run:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>
                sudo apt-get install -f
              </code>
            </li>
          </>
        )}

        {isRpm && (
          <>
            <li>Open a terminal</li>
            <li>
              Navigate to your Downloads folder:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>cd ~/Downloads</code>
            </li>
            <li>
              For Fedora/RHEL/CentOS, install using:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>
                sudo dnf install filename.rpm
              </code>
            </li>
            <li>
              For older systems, use:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>
                sudo rpm -i filename.rpm
              </code>
            </li>
          </>
        )}

        {isAppImage && (
          <>
            <li>Open a terminal</li>
            <li>
              Navigate to your Downloads folder:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>cd ~/Downloads</code>
            </li>
            <li>
              Make the AppImage executable:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>
                chmod +x filename.AppImage
              </code>
            </li>
            <li>
              Run the application:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>
                ./filename.AppImage
              </code>
            </li>
          </>
        )}

        {isTar && (
          <>
            <li>Open a terminal</li>
            <li>
              Navigate to your Downloads folder:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>cd ~/Downloads</code>
            </li>
            <li>
              Extract the archive:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>
                tar -xzf filename.tar.gz
              </code>
            </li>
            <li>
              Navigate to the extracted folder and look for installation instructions (README,
              INSTALL files)
            </li>
          </>
        )}

        {!isDeb && !isRpm && !isAppImage && !isTar && (
          <>
            <li>Open a terminal</li>
            <li>
              Navigate to your Downloads folder:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>cd ~/Downloads</code>
            </li>
            <li>
              Make sure the file is executable if needed:{' '}
              <code className='bg-green-100 dark:bg-green-800 px-1 rounded'>chmod +x filename</code>
            </li>
            <li>Look for any included README or INSTALL files for specific instructions</li>
          </>
        )}
      </ol>

      <div className='mt-3 text-sm text-green-700 dark:text-green-300'>
        <h5 className='font-semibold'>Linux Package Information</h5>
        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <div className='border border-green-200 dark:border-green-700 rounded p-2 bg-white dark:bg-green-950/50'>
            <h6 className='font-medium'>Distribution Compatibility</h6>
            <p className='text-xs mt-1'>
              Make sure the package type matches your distribution. Use .deb for Debian/Ubuntu and
              .rpm for Fedora/RHEL/CentOS.
            </p>
          </div>
          <div className='border border-green-200 dark:border-green-700 rounded p-2 bg-white dark:bg-green-950/50'>
            <h6 className='font-medium'>AppImage</h6>
            <p className='text-xs mt-1'>
              AppImage files run on most Linux distributions without installation. They contain all
              required dependencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
