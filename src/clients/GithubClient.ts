import type {
  GitHubErrorResponse,
  IGitHubClientOptions,
  IGitHubReadme,
  IGitHubRelease,
  ILatestRelease,
  IRelease,
  IRepoSearchResponse,
  IUserSearchResponse,
} from "../lib/types";

class GitHubClient {
  private baseUrl: string;
  private headers: Record<string, string> | null;

  constructor(options: IGitHubClientOptions = {}) {
    this.baseUrl = options.baseUrl || "https://api.github.com";
    this.headers = options.token
      ? { Authorization: `Bearer ${options.token}` }
      : null;
  }

  async request<T>(
    endpoint: string,
    params: Record<string, string | number | boolean> = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "astro-github-client",
      },
      ...this.headers,
    });

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
  }

  /**
   * Get the latest release for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with the latest release data
   */
  async getLatestRelease(user: string, repo: string): Promise<ILatestRelease> {
    const response = await this.request<IGitHubRelease>(
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

  /**
   * Get all releases for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with an array of releases
   */
  async getReleases(user: string, repo: string): Promise<IRelease[]> {
    const response = await this.request<IGitHubRelease[]>(
      `/repos/${user}/${repo}/releases`,
    );
    return response.map((r) => ({
      id: r.id,
      tagName: r.tag_name,
      publishedAt: r.published_at,
    }));
  }

  /**
   * Get the README for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with the README
   * */
  async getReadme(user: string, repo: string): Promise<String> {
    const response = await this.request<IGitHubReadme>(
      `/repos/${user}/${repo}/readme`,
    );
    return atob(response.content);
  }

  /**
   * Search for user accounts
   * @param query with GitHub username or organization
   * @returns Promise with any :)
   * */
  async searchUsers(query: string): Promise<IUserSearchResponse> {
    const response = await this.request<any>(`/search/users?q=${query}`);
    return response;
  }

  /**
   * Search for repositories
   * @param query with repository name
   * @param optional user GitHub username or organization
   * @returns Promise with any :)
   * */
  async searchRepositories(
    query: string,
    user: string | null,
  ): Promise<IRepoSearchResponse> {
    const userQuery = user ? `+user:${user}` : "";
    const response = await this.request<any>(
      `/search/repositories?q=${query}${userQuery}`,
    );
    return response;
  }
}

const defaultClient = new GitHubClient();
export { defaultClient as GitHubClient };
