import { GitHubClient as client } from "@/clients/GithubClient.ts";
import type { IAsset } from "@/lib/types";
import { UAParser } from "ua-parser-js";

class PackageService {
  async getRankedPackages(user: string, repo: string, userAgent: string) {
    const latestRelease = await client.getLatestRelease(user, repo);
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
    delete (latestRelease as { assets?: IAsset[] }).assets;
    return { latestRelease, rankedPackages };
  }

  rankPackages(packages: IAsset[], ua: UAParser.IResult) {
    return packages.map((pkg) => {
      const matchInfo = this.matchInfo(pkg, ua);
      return { package: pkg, matchInfo };
    });
  }

  matchInfo(p: IAsset, ua: UAParser.IResult) {
    let score = 0;
    const matches = {
      exact_match: [] as string[],
      partial_match: [] as string[],
      conflicts: [] as string[],
    };
    if (p.name.includes(ua.os.name?.toLowerCase() || "")) {
      score++;
      matches.exact_match.push("OS");
    }
    if (p.name.includes(ua.cpu.architecture?.toLowerCase() || "")) {
      score++;
      matches.exact_match.push("Architecture");
    }
    // TODO: file extensions, fuzzy search/synonyms
    return {
      score,
      matches,
    };
  }
}

const defaultPackageService = new PackageService();
export { defaultPackageService as PackageService };
