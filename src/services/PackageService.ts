// import { GitHubClient as client } from "@/clients/GithubClient.ts";
// import type { IAsset } from "@/lib/types";
import { GithubApi, type GithubResponse } from "@/clients/github/api";
import { UAParser } from "ua-parser-js";
import { OS, CPU } from "ua-parser-js/enums";

const osSynonyms: Record<string, string[]> = {
  [OS.WINDOWS.toLowerCase()]: [
    "windows",
    "win",
    "win32",
    "win64",
    "winnt",
    "win10",
    "win11",
    "msie",
    "msedge",
  ],
  [OS.MACOS.toLowerCase()]: [
    "darwin",
    "mac",
    "macos",
    "osx",
    "mac os x",
    "apple",
    "mac_powerpc",
    "macintosh",
    "apple",
    "catalina",
    "monterey",
    "ventura",
    "sonoma",
  ],
  [OS.LINUX.toLowerCase()]: [
    "linux",
    "gnu linux",
    "ubuntu",
    "debian",
    "fedora",
    "centos",
    "redhat",
    "rhel",
    "opensuse",
    "suse",
    "arch",
    "gentoo",
    "x11",
  ],
};

const archSynonyms: Record<string, string[]> = {
  [CPU.X86_64.toLowerCase()]: ["x86_64", "x64", "amd64"],
  [CPU.ARM_64.toLowerCase()]: ["arm64", "aarch64"],
  [CPU.X86.toLowerCase()]: ["x86", "ia32"],
  [CPU.ARM_HF.toLowerCase()]: ["armhf", "armv7"],
};

const exclusiveExtensions: Record<string, string[]> = {
  [OS.WINDOWS.toLowerCase()]: [".exe", ".msi", ".bat", ".cmd"],
  [OS.MACOS.toLowerCase()]: [".dmg", ".pkg", ".app"],
  [OS.LINUX.toLowerCase()]: [".deb", ".rpm", ".appimage"],
};
// TODO introduce proper package type
class PackageService {
  async getRankedPackages(owner: string, repo: string, userAgent: string) {
       
    const latestRelease = await GithubApi.getLatestRelease({ owner, repo });
    const parsedUA = UAParser(userAgent);
    const rankedPackages = this.rankPackages(
      latestRelease.assets,
      parsedUA,
    ).sort((a, b) => {
      const bHasOS = b.matchInfo.matches.exact_match.includes("OS");
      const aHasOS = a.matchInfo.matches.exact_match.includes("OS");
      return (
        b.matchInfo.score - a.matchInfo.score ||
        ((bHasOS && !aHasOS) || (!bHasOS && aHasOS) ? 1 : -1) ||
        b.package.downloadCount - a.package.downloadCount
      );
    });
    delete (latestRelease as { assets?: any[] }).assets;
    return { latestRelease, rankedPackages };
  }

  rankPackages(packages: any[], ua: UAParser.IResult) {
    return packages.map((pkg) => {
      const matchInfo = this.matchInfo(pkg, ua);
      return { package: pkg, matchInfo };
    });
  }

  matchInfo(p: any, ua: UAParser.IResult) {
    let score = 0;
    const matches = {
      exact_match: [] as string[],
      partial_match: [] as string[],
      conflicts: [] as string[],
    };
    const packageName = p.name.toLowerCase();
    const osName = ua.os.name?.toLowerCase() || "";
    const currentOsSynonyms = osSynonyms[osName];
    if (currentOsSynonyms) {
      for (const synonym of currentOsSynonyms) {
        if (packageName.includes(synonym)) {
          score++;
          matches.exact_match.push("OS");
        }
      }
    } else {
      if (packageName.includes(osName)) {
        score++;
        matches.exact_match.push("OS");
      }
    }

    const archName = ua.cpu.architecture?.toLowerCase() || "";
    const currentArchSynonyms = archSynonyms[archName];
    if (currentArchSynonyms) {
      for (const synonym of currentArchSynonyms) {
        if (packageName.includes(synonym)) {
          score++;
          matches.exact_match.push("Architecture");
        }
      }
    } else {
      if (packageName.includes(archName)) {
        score++;
        matches.exact_match.push("Architecture");
      }
    }

    const currentOsExtensions = exclusiveExtensions[osName];
    if (currentOsExtensions) {
      for (const extension of currentOsExtensions) {
        if (packageName.includes(extension)) {
          score++;
          matches.exact_match.push("Extension");
        }
      }
    }
    return {
      score,
      matches,
    };
  }
}

const defaultPackageService = new PackageService();
export { defaultPackageService as PackageService };
