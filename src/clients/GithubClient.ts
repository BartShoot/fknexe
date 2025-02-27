// src/lib/githubClient.ts

/**
 * GitHub API response types
 */

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
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
}

export interface GitHubAsset {
  url: string;
  id: number;
  node_id: string;
  name: string;
  label: string | null;
  uploader: GitHubUser;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

export interface GitHubRelease {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: GitHubUser;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: GitHubAsset[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

export interface GitHubReadme {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
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
  request<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T>;
  
  /**
   * Get the latest release for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with the latest release data
   */
  getLatestRelease(user: string, repo: string): Promise<GitHubRelease>;
  
  /**
   * Get all releases for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with an array of releases
   */
  getReleases(user: string, repo: string): Promise<GitHubRelease[]>;
  
  /**
   * Get the README for a repository
   * @param user GitHub username or organization
   * @param repo Repository name
   * @returns Promise with the README data
   */
  getReadme(user: string, repo: string): Promise<String>;
}

/**
 * GitHub API client implementation
 */
export class GitHubClient implements GitHubApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  
  constructor(options: GitHubClientOptions = {}) {
    this.baseUrl = options.baseUrl || 'https://api.github.com';
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'astro-github-client'
    };
    
    if (options.token) {
      this.headers['Authorization'] = `token ${options.token}`;
    }
  }
  
  async request<T>(
    endpoint: string, 
    params: Record<string, string | number | boolean> = {}
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    
    try {
      const response = await fetch(url.toString(), { headers: this.headers });
      
      if (!response.ok) {
        const errorData: GitHubErrorResponse = await response.json().catch(() => ({ 
          message: `HTTP error ${response.status}` 
        }));
        throw new Error(errorData.message || `GitHub API error: ${response.status}`);
      }
      
      return await response.json() as T;
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  }
  
  async getLatestRelease(user: string, repo: string): Promise<GitHubRelease> {
    return this.request<GitHubRelease>(`/repos/${user}/${repo}/releases/latest`);
  }
  
  async getReleases(user: string, repo: string): Promise<GitHubRelease[]> {
    return this.request<GitHubRelease[]>(`/repos/${user}/${repo}/releases`);
  }
  
  async getReadme(user: string, repo: string): Promise<String> {
    const response = await this.request<GitHubReadme>(`/repos/${user}/${repo}/readme`);
    
    const content = new TextDecoder().decode(Uint8Array.from(atob(response.content), c => c.charCodeAt(0)));
    const formatted = content.replace(/\n/g, '<br>');
    console.log(formatted)
    return formatted 
  }
}

// Export a default client instance for easy imports
const defaultClient = new GitHubClient();
export default defaultClient;
