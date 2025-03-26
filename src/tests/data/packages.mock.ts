const fzfNames: string[] = [
  'fzf-0.60.3-darwin_amd64.tar.gz',
  'fzf-0.60.3-darwin_arm64.tar.gz',
  'fzf-0.60.3-freebsd_amd64.tar.gz',
  'fzf-0.60.3-linux_amd64.tar.gz',
  'fzf-0.60.3-linux_arm64.tar.gz',
  'fzf-0.60.3-linux_armv5.tar.gz',
  'fzf-0.60.3-linux_armv6.tar.gz',
  'fzf-0.60.3-linux_armv7.tar.gz',
  'fzf-0.60.3-linux_loong64.tar.gz',
  'fzf-0.60.3-linux_ppc64le.tar.gz',
  'fzf-0.60.3-linux_s390x.tar.gz',
  'fzf-0.60.3-openbsd_amd64.tar.gz',
  'fzf-0.60.3-windows_amd64.zip',
  'fzf-0.60.3-windows_arm64.zip',
  'fzf-0.60.3-windows_armv5.zip',
  'fzf-0.60.3-windows_armv6.zip',
  'fzf-0.60.3-windows_armv7.zip',
  'fzf_0.60.3_checksums.txt',
]

const nvimNames: string[] = [
  'nvim-linux-arm64.appimage',
  'nvim-linux-arm64.appimage.zsync',
  'nvim-linux-arm64.tar.gz',
  'nvim-linux-x86_64.appimage',
  'nvim-linux-x86_64.appimage.zsync',
  'nvim-linux-x86_64.tar.gz',
  'nvim-macos-arm64.tar.gz',
  'nvim-macos-x86_64.tar.gz',
  'nvim-win64.msi',
  'nvim-win64.zip',
  'shasum.txt',
]

export const testCases = [
  {
    name: 'Windows Firefox',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
    cases: [
      {
        id: 'fzf',
        names: fzfNames,
        expectedMatches: {
          'fzf-0.60.3-windows_amd64.zip': ['OS', 'Architecture', 'Extension'],
          'fzf-0.60.3-darwin_amd64.tar.gz': ['Architecture'],
          'fzf-0.60.3-windows_armv6.zip': ['OS', 'Extension'],
          'fzf-0.60.3-windows_armv5.zip': ['OS', 'Extension'],
          'fzf-0.60.3-windows_armv7.zip': ['OS', 'Extension'],
          'fzf-0.60.3-windows_arm64.zip': ['OS', 'Extension'],
          'fzf-0.60.3-darwin_arm64.tar.gz': [],
        },
      },
      {
        id: 'nvim',
        names: nvimNames,
        expectedMatches: {
          'nvim-win64.zip': ['OS', 'Extension'],
          'nvim-win64.msi': ['OS', 'Extension'],
          'nvim-linux-x86_64.tar.gz': ['Architecture'],
          'nvim-linux-arm64.tar.gz': [],
        },
      },
    ],
  },
  {
    name: 'Mac Safari',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
    cases: [
      {
        id: 'fzf',
        names: fzfNames,
        expectedMatches: {
          'fzf-0.60.3-darwin_arm64.tar.gz': ['OS'],
          'fzf-0.60.3-darwin_amd64.tar.gz': ['OS'],
        },
      },
      {
        id: 'nvim',
        names: nvimNames,
        expectedMatches: {
          'nvim-macos-arm64.tar.gz': ['OS'],
          'nvim-macos-x86_64.tar.gz': ['OS'],
        },
      },
    ],
  },
  {
    name: 'Linux',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36',
    cases: [
      {
        id: 'fzf',
        names: fzfNames,
        expectedMatches: {
          'fzf-0.60.3-linux_amd64.tar.gz': ['OS', 'Architecture'],
          'fzf-0.60.3-linux_s390x.tar.gz': ['OS'],
          'fzf-0.60.3-linux_ppc64le.tar.gz': ['OS'],
          'fzf-0.60.3-linux_loong64.tar.gz': ['OS'],
          'fzf-0.60.3-linux_armv6.tar.gz': ['OS'],
          'fzf-0.60.3-linux_armv5.tar.gz': ['OS'],
          'fzf-0.60.3-linux_armv7.tar.gz': ['OS'],
          'fzf-0.60.3-linux_arm64.tar.gz': ['OS'],
        },
      },
      {
        id: 'nvim',
        names: nvimNames,
        expectedMatches: {
          'nvim-linux-x86_64.tar.gz': ['OS', 'Architecture'],
          'nvim-linux-arm64.tar.gz': ['OS'],
        },
      },
    ],
  },
]
