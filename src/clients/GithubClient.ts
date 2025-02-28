// src/lib/githubClient.ts

/**
 * GitHub API response types
 */
export interface GitHubUser {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
  user_view_type?: string;
}

export interface GitHubAsset {
  url: string;
  browser_download_url: string;
  id: number;
  node_id: string;
  name: string;
  label: string | null;
  state: "uploaded" | "open";
  content_type: string;
  size: number;
  download_count: number;
  created_at: string; // ISO date-time string
  updated_at: string; // ISO date-time string
  uploader: GitHubUser | null;
}

export interface GitHubRelease {
  url: string;
  html_url: string;
  assets_url: string;
  upload_url: string;
  tarball_url: string | null;
  zipball_url: string | null;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string | null;
  body?: string | null;
  draft: boolean;
  prerelease: boolean;
  created_at: string; // ISO date-time string
  published_at: string | null;
  body_html?: string;
  body_text?: string;
  mentions_count?: number;
  discussion_url?: string; // Expected to be a URI
  reactions?: ReactionRollup;
  author: GitHubUser;
  assets: GitHubAsset[];
}

export interface GitHubReadme {
  type: "file";
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: ContentFileLinks;
  target?: string;
  submodule_git_url?: string;
}
export interface ContentFileLinks {
  git: string | null;
  html: string | null;
  self: string;
}

export interface ReactionRollup {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  confused: number;
  heart: number;
  hooray: number;
  eyes: number;
  rocket: number;
}

export interface GitHubErrorResponse {
  message: string;
  documentation_url?: string;
  status?: string;
  error?: string;
}

/**
 * Client configuration options
 */
export interface GitHubClientOptions {
  token?: string;
  baseUrl?: string;
}

/**
 * GitHub API client interface
 */
export interface GitHubApiClient {
  /**
   * Send a generic request to any GitHub API endpoint
   * @param endpoint The API endpoint path (starting with /)
   * @param params Optional query parameters
   * @returns Promise with the API response
   */
  request<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<T>;

  /**
   * Get the latest release for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with the latest release data
   */
  getLatestRelease(user: string, repo: string): Promise<LatestRelease>;

  /**
   * Get all releases for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with an array of releases
   */
  getReleases(user: string, repo: string): Promise<Release[]>;

  /**
   * Get the README for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with the README
   * */
  getReadme(user: string, repo: string): Promise<String>;
}

export interface Asset {
  name: string;
  downloadCount: number;
  size: number;
  browserDownloadUrl: string;
}

export interface LatestRelease {
  id: number;
  htmlUrl: string;
  tagName: string;
  publishedAt: string | null;
  description: string | null;
  sourceZip: string | null;
  sourceTar: string | null;
  assets: Asset[];
}

export interface Release {
  id: number;
  tagName: string;
  publishedAt: string | null;
}

export class GitHubClient implements GitHubApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(options: GitHubClientOptions = {}) {
    this.baseUrl = options.baseUrl || "https://api.github.com";
    this.headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "astro-github-client",
    };

    if (options.token) {
      this.headers["Authorization"] = `token ${options.token}`;
    }
  }

  async request<T>(
    endpoint: string,
    params: Record<string, string | number | boolean> = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    try {
      const response = await fetch(url.toString(), { headers: this.headers });

      if (!response.ok) {
        const errorData: GitHubErrorResponse = await response
          .json()
          .catch(() => ({
            message: `HTTP error ${response.status}`,
          }));
        throw new Error(
          errorData.message || `GitHub API error: ${response.status}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("GitHub API request failed:", error);
      throw error;
    }
  }

  async getLatestRelease(user: string, repo: string): Promise<LatestRelease> {
    const response = await this.request<GitHubRelease>(
      `/repos/${user}/${repo}/releases/latest`,
    );
    return {
      id: response.id,
      htmlUrl: response.html_url,
      tagName: response.tag_name,
      publishedAt: response.published_at,
      description: response.body?.replace(/\n/g, "<br>") ?? null,
      sourceTar: response.tarball_url,
      sourceZip: response.zipball_url,
      assets: response.assets.map((a) => ({
        name: a.name,
        downloadCount: a.download_count,
        size: a.size,
        browserDownloadUrl: a.browser_download_url,
      })),
    };
  }

  async getReleases(user: string, repo: string): Promise<Release[]> {
    const response = await this.request<GitHubRelease[]>(
      `/repos/${user}/${repo}/releases`,
    );
    return response.map((r) => ({
      id: r.id,
      tagName: r.tag_name,
      publishedAt: r.published_at,
    }));
  }

  async getReadme(user: string, repo: string): Promise<String> {
    const response = await this.request<GitHubReadme>(
      `/repos/${user}/${repo}/readme`,
    );
    const content = new TextDecoder().decode(
      Uint8Array.from(atob(response.content), (c) => c.charCodeAt(0)),
    );
    const formatted = content.replace(/\n/g, "<br>");
    console.log(formatted);
    return formatted;
  }
}

const defaultClient = new GitHubClient();
export default defaultClient;
