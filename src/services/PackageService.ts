import { UAParser } from 'ua-parser-js'
import { CPU, OS } from 'ua-parser-js/enums'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import type { IAsset, IMatchResult, IOSType, IRankedRelease } from '@/lib/types'

class PackageService {
  async getRankedPackages(owner: string, repo: string, userAgent: string): Promise<IRankedRelease> {
    const latestRelease: GithubResponse['getLatestRelease'] = await GithubApi.getLatestRelease({
      owner,
      repo,
    })
    const parsedUA = UAParser(userAgent)
    const rankedPackages = this.getSortedRankedPackages(latestRelease.assets, parsedUA)
    delete (latestRelease as { assets?: IAsset[] }).assets
    return { latestRelease, rankedPackages }
  }

  private getSortedRankedPackages(packages: IAsset[], ua: UAParser.IResult) {
    return this.rankPackages(
      packages.flatMap((p) => p.name),
      ua,
    )
      .map((ranked) => {
        const originalPackage = packages.find((pkg) => pkg.name === ranked.packageName)!!
        return {
          ...originalPackage,
          matchInfo: ranked.matchInfo,
        }
      })
      .sort((a, b) => {
        const bHasOS = b.matchInfo.matches.exact_match.includes('OS')
        const aHasOS = a.matchInfo.matches.exact_match.includes('OS')
        return (
          b.matchInfo.score - a.matchInfo.score ||
          ((bHasOS && !aHasOS) || (!bHasOS && aHasOS) ? 1 : -1) ||
          b.download_count - a.download_count
        )
      })
  }

  rankPackages(packageNames: string[], ua: UAParser.IResult) {
    return packageNames.map((name) => {
      const matchInfo = this.matchInfo(name, ua)
      return { packageName: name, matchInfo }
    })
  }

  private matchInfo(packageName: string, ua: UAParser.IResult): IMatchResult {
    const score = { os: 0, arch: 0, ext: 0, conflicts: 0 }
    const matches = {
      exact_match: [] as string[],
      partial_match: [] as string[],
      conflicts: [] as string[],
    }
    const osName = getCurrentOS(ua.os).toLowerCase()
    const archName = ua.cpu.architecture?.toLowerCase() ?? ''

    const osScore = 5
    const osMatch = this.getOsMatch(packageName, osName)
    this.matchAgainstSynonyms(packageName, osSynonyms, osName, osScore, matches, osMatch, 'OS')
    score.os = osScore

    const archScore = 3
    const archMatch = this.getArchitectureMatch(packageName, archName)
    this.matchAgainstSynonyms(
      packageName,
      archSynonyms,
      archName,
      archScore,
      matches,
      archMatch,
      'Architecture',
    )
    score.arch = archScore

    const extScore = 2
    const extMatch = this.getExtensionMatch(packageName, osName)
    this.matchAgainstSynonyms(
      packageName,
      exclusiveExtensions,
      osName,
      extScore,
      matches,
      extMatch,
      'Extension',
    )
    score.ext = extScore

    return {
      score: score.os + score.arch + score.ext + score.conflicts,
      matches,
    }
  }

  private getOsMatch(packageName: string, osName: string) {
    return this.findBestMatch(packageName, [osName, ...(osSynonyms[osName] ?? [])])
  }

  private getArchitectureMatch(packageName: string, archName: string) {
    return this.findBestMatch(packageName, [archName, ...(archSynonyms[archName] ?? [])])
  }

  private getExtensionMatch(packageName: string, osName: string) {
    return (exclusiveExtensions[osName] ?? []).find((ext) => packageName.endsWith(ext))
  }

  private matchAgainstSynonyms(
    packageName: string,
    synonyms: Record<string, string[]>,
    currentName: string,
    score: number,
    matches: { exact_match: string[]; conflicts: string[] },
    match: string | undefined,
    type: string,
  ) {
    const allConflicts = Object.entries(synonyms)
      .filter(([key]) => key !== currentName)
      .flatMap(([, synonyms]) => synonyms)
    const conflictMatch = this.findBestMatch(packageName, allConflicts)
    const longestMatch = this.getLongestMatch([match, conflictMatch])

    if (longestMatch) {
      if (longestMatch === match) {
        score *= 1
        matches.exact_match.push(type)
      } else if (longestMatch === conflictMatch) {
        score *= 1
        matches.conflicts.push(type)
      }
      return true
    }
    return false
  }

  private findBestMatch(packageName: string, potentialMatches: string[]): string | undefined {
    const matches = potentialMatches.filter((match) => packageName.includes(match))
    return matches.sort((a, b) => b.length - a.length)[0]
  }

  private getLongestMatch(matches: (string | undefined)[]): string | undefined {
    return matches.reduce((longest, current) => {
      if (!current) return longest
      if (!longest) return current
      return current.length > longest.length ? current : longest
    }, undefined)
  }
}

const defaultPackageService = new PackageService()
export { defaultPackageService as PackageService }

const osSynonyms: Record<string, string[]> = {
  [OS.WINDOWS.toLowerCase()]: [
    'windows',
    'win',
    'win32',
    'win64',
    'winnt',
    'win10',
    'win11',
    'msie',
    'msedge',
  ],
  [OS.MACOS.toLowerCase()]: [
    'darwin',
    'mac',
    'macos',
    'osx',
    'mac os x',
    'apple',
    'mac_powerpc',
    'macintosh',
    'apple',
    'catalina',
    'monterey',
    'ventura',
    'sonoma',
  ],
  [OS.LINUX.toLowerCase()]: [
    'linux',
    'gnu linux',
    'ubuntu',
    'debian',
    'fedora',
    'centos',
    'redhat',
    'rhel',
    'opensuse',
    'suse',
    'arch',
    'gentoo',
    'x11',
  ],
}

const archSynonyms: Record<string, string[]> = {
  [CPU.X86_64.toLowerCase()]: ['x86_64', 'x64', 'amd64'],
  [CPU.ARM_64.toLowerCase()]: ['arm64', 'aarch64'],
  [CPU.X86.toLowerCase()]: ['x86', 'ia32'],
  [CPU.ARM_HF.toLowerCase()]: ['armhf', 'armv7'],
}

const exclusiveExtensions: Record<string, string[]> = {
  [OS.WINDOWS.toLowerCase()]: ['.exe', '.msi', '.bat', '.cmd'],
  [OS.MACOS.toLowerCase()]: ['.dmg', '.pkg', '.app'],
  [OS.LINUX.toLowerCase()]: ['.deb', '.rpm', '.appimage'],
}

function toOSType(value: string): IOSType | undefined {
  return (Object.values(OS) as string[]).includes(value) ? (value as IOSType) : undefined
}

function getCurrentOS(os: UAParser.IOS) {
  if (!os.name) return ''
  const osType = toOSType(os.name)
  switch (osType) {
    case OS.WINDOWS:
      return OS.WINDOWS.toString()
    case OS.MACOS:
      return OS.MACOS.toString()
    case OS.FREEBSD:
    case OS.GHOSTBSD:
      return OS.FREEBSD.toString()
    case OS.OPENBSD:
    case OS.NETBSD:
      return OS.OPENBSD.toString()
    case OS.LINUX:
    case OS.UBUNTU:
    case OS.GNU:
    case OS.GENTOO:
    case OS.AIX:
    case OS.ARCH:
    case OS.DEBIAN:
    case OS.ELEMENTARY_OS:
    case OS.FEDORA:
    case OS.SUSE:
    case OS.CENTOS:
    case OS.DRAGONFLY:
    case OS.FIREFOX_OS:
    case OS.HP_UX:
    case OS.HURD:
    case OS.KUBUNTU:
    case OS.LINPUS:
    case OS.LINSPIRE:
    case OS.MAGEIA:
    case OS.MANDRIVA:
    case OS.MANJARO:
    case OS.MEEGO:
    case OS.MINIX:
    case OS.MINT:
    case OS.PCLINUXOS:
    case OS.RASPBIAN:
    case OS.REDHAT:
    case OS.SABAYON:
    case OS.SERENITYOS:
    case OS.SLACKWARE:
    case OS.SOLARIS:
    case OS.UNIX:
    case OS.VECTORLINUX:
    case OS.ZENWALK:
      return OS.LINUX.toString()
    //misc
    case OS.NINTENDO:
    case OS.NETRANGE:
    case OS.NETTV:
    case OS.OPENHARMONY:
    case OS.OPENVMS:
    case OS.PLAYSTATION:
    case OS.WEBOS:
    case OS.WINDOWS_IOT:
    case OS.XBOX:
      return ''
    //mobile
    case OS.WINDOWS_MOBILE:
    case OS.ANDROID:
    case OS.ANDROID_X86:
    case OS.BADA:
    case OS.BLACKBERRY:
    case OS.CHROME_OS:
    case OS.CHROMECAST:
    case OS.CHROMECAST_ANDROID:
    case OS.CHROMECAST_FUCHSIA:
    case OS.CHROMECAST_LINUX:
    case OS.CHROMECAST_SMARTSPEAKER:
    case OS.CONTIKI:
    case OS.DEEPIN:
    case OS.FUCHSIA:
    case OS.HAIKU:
    case OS.HARMONYOS:
    case OS.IOS:
    case OS.PALM:
    case OS.PICO:
    case OS.RIM_TABLET_OS:
    case OS.SAILFISH:
    case OS.SYMBIAN:
    case OS.TIZEN:
    case OS.UBUNTU_TOUCH:
    case OS.WATCHOS:
    case OS.WINDOWS_PHONE:
      return ''
    //legacy
    case OS.BEOS:
    case OS.AMIGA_OS:
    case OS.JOLI:
    case OS.KAIOS:
    case OS.MAEMO:
    case OS.MORPH_OS:
    case OS.QNX:
    case OS.OS2:
    case OS.PC_BSD:
    case OS.PLAN9:
    case OS.RISC_OS:
    case OS.SERIES40:
    case undefined:
      return ''
    default:
      return osType satisfies never
  }
}
