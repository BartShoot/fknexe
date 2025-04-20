// src/components/ui/security-warning-guidance.tsx
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SecurityWarningGuidanceProps {
  osName: string
  isOpen: boolean
  onClose: () => void
}

export function SecurityWarningGuidance({ osName, isOpen, onClose }: SecurityWarningGuidanceProps) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='p-6'>
          <div className='flex justify-between items-start'>
            <h3 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
              Security Warning Guide
            </h3>
            <Button variant='ghost' size='icon' onClick={onClose} aria-label='Close security guide'>
              <X size={18} />
            </Button>
          </div>

          <p className='text-gray-600 dark:text-gray-400 mt-2 mb-6'>
            Modern operating systems include security features that may display warnings when
            installing software downloaded from the internet. Here's how to safely handle these
            warnings:
          </p>

          {osName.toLowerCase() === 'windows' && <WindowsSecurityGuidance />}
          {osName.toLowerCase() === 'macos' && <MacOSSecurityGuidance />}
          {osName.toLowerCase() === 'linux' && <LinuxSecurityGuidance />}

          <div className='mt-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-sm'>
            <h4 className='font-semibold text-blue-800 dark:text-blue-300 mb-2'>
              General Security Tips
            </h4>
            <ul className='list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-300'>
              <li>Only download software from trusted sources</li>
              <li>Check that the download page uses HTTPS (secure connection)</li>
              <li>Verify the publisher's name when prompted</li>
              <li>Keep your operating system and antivirus software updated</li>
              <li>If you're unsure about a download, research the application before proceeding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function WindowsSecurityGuidance() {
  return (
    <div className='space-y-6'>
      <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
        <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-3'>
          Windows SmartScreen Warning
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <div className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
              <div className='bg-gray-100 dark:bg-gray-750 p-2 text-center text-xs text-gray-800 dark:text-gray-200'>
                Example SmartScreen Warning
              </div>
              <div className='p-3 bg-white dark:bg-gray-900 h-48 flex items-center justify-center'>
                <p className='text-gray-500 text-sm italic'>
                  Image of Windows SmartScreen warning would appear here
                </p>
              </div>
            </div>
          </div>
          <div>
            <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-2'>How to proceed:</h5>
            <ol className='list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-400 text-sm'>
              <li>
                When you see "Windows protected your PC", click on{' '}
                <span className='font-medium'>"More info"</span>
              </li>
              <li>Verify the application name and publisher</li>
              <li>
                If you trust the source, click <span className='font-medium'>"Run anyway"</span>
              </li>
              <li>
                If prompted by User Account Control (UAC), click{' '}
                <span className='font-medium'>"Yes"</span> to allow the app to make changes
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
        <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-3'>
          Antivirus Software Warnings
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Common antivirus warnings:
            </h5>
            <ol className='list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-400 text-sm'>
              <li>Your antivirus may scan files automatically when downloaded</li>
              <li>It might display a notification that the file was scanned</li>
              <li>
                In some cases, it might quarantine the file if it detects something suspicious
              </li>
              <li>
                You may need to open your antivirus software to allow the file if you trust the
                source
              </li>
            </ol>
          </div>
          <div>
            <div className='bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-sm'>
              <h5 className='font-medium text-yellow-800 dark:text-yellow-300 mb-1'>
                When to be careful:
              </h5>
              <ul className='list-disc pl-5 space-y-1 text-yellow-700 dark:text-yellow-300'>
                <li>If your antivirus flags the file as "High Risk" or "Malicious"</li>
                <li>If the publisher name doesn't match what you expected</li>
                <li>If you weren't expecting to download this type of file</li>
                <li>If the website seemed suspicious or wasn't using HTTPS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MacOSSecurityGuidance() {
  return (
    <div className='space-y-6'>
      <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
        <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-3'>
          macOS Gatekeeper Warning
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <div className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
              <div className='bg-gray-100 dark:bg-gray-750 p-2 text-center text-xs text-gray-800 dark:text-gray-200'>
                Example Gatekeeper Warning
              </div>
              <div className='p-3 bg-white dark:bg-gray-900 h-48 flex items-center justify-center'>
                <p className='text-gray-500 text-sm italic'>
                  Image of macOS Gatekeeper warning would appear here
                </p>
              </div>
            </div>
          </div>
          <div>
            <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-2'>How to proceed:</h5>
            <ol className='list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-400 text-sm'>
              <li>
                When you see "app can't be opened because it is from an unidentified developer", you
                have two options:
              </li>
              <li>
                <span className='font-medium'>Option 1:</span> Control-click (or right-click) the
                app, then choose Open from the shortcut menu
              </li>
              <li>Click Open in the dialog that appears</li>
              <li>
                <span className='font-medium'>Option 2:</span> Go to System Preferences {'>'}{' '}
                Security & Privacy {'>'} General
              </li>
              <li>Click the "Open Anyway" button near the message about the blocked application</li>
            </ol>
          </div>
        </div>
      </div>

      <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
        <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-3'>
          App Notarization Warnings
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-2'>
              About notarization:
            </h5>
            <ul className='list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 text-sm'>
              <li>macOS has a security feature called notarization</li>
              <li>
                Applications that are notarized by Apple are verified to be free of malicious
                content
              </li>
              <li>Non-notarized apps will show additional warnings</li>
              <li>You can still install non-notarized apps if you trust the developer</li>
            </ul>
          </div>
          <div>
            <div className='bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-sm'>
              <h5 className='font-medium text-yellow-800 dark:text-yellow-300 mb-1'>
                When to be careful:
              </h5>
              <ul className='list-disc pl-5 space-y-1 text-yellow-700 dark:text-yellow-300'>
                <li>If you don't recognize the developer</li>
                <li>If the app claims to be from Apple but shows this warning</li>
                <li>If you weren't expecting to download this type of file</li>
                <li>If you found the application through a suspicious advertisement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinuxSecurityGuidance() {
  return (
    <div className='space-y-6'>
      <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
        <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-3'>
          Linux Package Security
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Security considerations:
            </h5>
            <ul className='list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 text-sm'>
              <li>Linux distributions handle package security differently</li>
              <li>Official package repositories are usually the safest option</li>
              <li>
                When installing software from outside repositories (like GitHub), verify the source
              </li>
              <li>Be cautious when running scripts with sudo or as root</li>
            </ul>
          </div>
          <div>
            <div className='bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-sm'>
              <h5 className='font-medium text-yellow-800 dark:text-yellow-300 mb-1'>
                When to be careful:
              </h5>
              <ul className='list-disc pl-5 space-y-1 text-yellow-700 dark:text-yellow-300'>
                <li>If you're asked for your password to install software from unknown sources</li>
                <li>If a script or installer is using curl or wget piped directly to bash</li>
                <li>If the package is not digitally signed</li>
                <li>If the application asks for more permissions than it should need</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
        <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-3'>
          AppImage and Executable File Security
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Running executable files:
            </h5>
            <ol className='list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-400 text-sm'>
              <li>When downloading AppImage or binary files, make them executable first:</li>
              <li>
                <code className='bg-gray-100 dark:bg-gray-700 px-1 rounded'>
                  chmod +x filename.AppImage
                </code>
              </li>
              <li>Run the file from the terminal or file manager:</li>
              <li>
                <code className='bg-gray-100 dark:bg-gray-700 px-1 rounded'>
                  ./filename.AppImage
                </code>
              </li>
              <li>
                Some file managers may ask you if you want to run the file or view its contents
              </li>
            </ol>
          </div>
          <div>
            <h5 className='font-medium text-gray-700 dark:text-gray-300 mb-2'>Security tips:</h5>
            <ul className='list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 text-sm'>
              <li>Check the SHA256 or MD5 sum of downloads if provided by the developer</li>
              <li>
                Use{' '}
                <code className='bg-gray-100 dark:bg-gray-700 px-1 rounded'>
                  sha256sum filename
                </code>{' '}
                to verify file integrity
              </li>
              <li>AppImages can be run without installation, making them easier to isolate</li>
              <li>Consider using tools like Flatpak or Snap for better application sandboxing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
