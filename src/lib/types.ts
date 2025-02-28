/**
 * GitHub API response types
 */
export interface IGitHubUser {
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

export interface IGitHubAsset {
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
  uploader: IGitHubUser | null;
}

export interface IGitHubRelease {
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
  reactions?: IReactionRollup;
  author: IGitHubUser;
  assets: IGitHubAsset[];
}

export interface IGitHubReadme {
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
  _links: IContentFileLinks;
  target?: string;
  submodule_git_url?: string;
}
export interface IContentFileLinks {
  git: string | null;
  html: string | null;
  self: string;
}

export interface IReactionRollup {
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
export interface IGitHubClientOptions {
  token?: string;
  baseUrl?: string;
}

export interface IAsset {
  name: string;
  downloadCount: number;
  size: number;
  browserDownloadUrl: string;
}

export interface ILatestRelease {
  id: number;
  htmlUrl: string;
  tagName: string;
  publishedAt: string | null;
  description: string | null;
  sourceZip: string | null;
  sourceTar: string | null;
  assets: IAsset[];
}

export interface IRelease {
  id: number;
  tagName: string;
  publishedAt: string | null;
}
