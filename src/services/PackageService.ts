import { GitHubClient as client } from "@/clients/GithubClient.ts";
import type { IAsset } from "@/lib/types";
import { UAParser } from "ua-parser-js";
import { OS, Browser, CPU } from "ua-parser-js/enums";

class PackageService {
  async getRankedPackages(user: string, repo: string, userAgent: string) {
    const latestRelease = await client.getLatestRelease(user, repo);
    const parsedUA = UAParser(userAgent);
    console.log(parsedUA);
    console.log(OS);
    console.log(Browser);
    console.log(CPU);
    const rankedPackages = this.rankPackages(
      latestRelease.assets,
      parsedUA,
    ).sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });
    return { ...latestRelease, ...rankedPackages };
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
    // TODO: file extensions, fuzzy search
    return {
      score,
      matches,
    };
  }
}

const defaultPackageService = new PackageService();
export { defaultPackageService as PackageService };
