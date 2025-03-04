import { GitHubClient as client } from "@/clients/GithubClient.ts";
import type { IAsset } from "@/lib/types";
import { UAParser } from "ua-parser-js";

class PackageService {
  async getRankedPackages(user: string, repo: string, userAgent: string) {
    const latestRelease = await client.getLatestRelease(user, repo);
    const parsedUA = UAParser(userAgent);
    const rankedPackages = {
      ranked_packages: this.rankPackages(latestRelease.assets, parsedUA).sort(
        (a, b) => {
          const bHasOS = b.matches.exact_match.includes("OS");
          const aHasOS = a.matches.exact_match.includes("OS");
          return (
            b.score - a.score ||
            ((bHasOS && !aHasOS) || (!bHasOS && aHasOS) ? 1 : -1) ||
            b.downloadCount - a.downloadCount
          );
        },
      ),
    };
    return { ...rankedPackages, ...latestRelease };
  }

  rankPackages(packages: IAsset[], ua: UAParser.IResult) {
    return packages.map((p) => {
      const matchInfo = this.matchInfo(p, ua);
      return { ...p, ...matchInfo };
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
