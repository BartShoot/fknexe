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

export interface IRepoSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IRepoSearchResultItem[];
}

export interface IRepoSearchResultItem {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: IGitHubUser | null;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  master_branch: string;
  default_branch: string;
  score: number;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  forks: number;
  open_issues: number;
  watchers: number;
  topics?: string[];
  mirror_url: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_pages: boolean;
  has_wiki: boolean;
  has_downloads: boolean;
  has_discussions?: boolean;
  archived: boolean;
  disabled: boolean;
  visibility?: string;
  license: ILicenseSimple | null;
  permissions?: IPermissions;
  text_matches?: ISearchResultTextMatch[];
  temp_clone_token?: string;
  allow_merge_commit?: boolean;
  allow_squash_merge?: boolean;
  allow_rebase_merge?: boolean;
  allow_auto_merge?: boolean;
  delete_branch_on_merge?: boolean;
  allow_forking?: boolean;
  is_template?: boolean;
  web_commit_signoff_required?: boolean;
}

export interface ILicenseSimple {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string;
}

export interface IPermissions {
  admin: boolean;
  maintain?: boolean;
  push: boolean;
  triage?: boolean;
  pull: boolean;
}

export interface ISearchResultTextMatch {
  object_url: string;
  object_type: string | null;
  property: string;
  fragment: string;
  matches: {
    text: string;
    indices: number[];
  }[];
}

export interface IUserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IUserSearchResultItem[];
}

export interface IUserSearchResultItem {
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
  score: number;
  // Optional fields
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
  name?: string | null;
  bio?: string | null;
  email?: string | null;
  location?: string | null;
  hireable?: boolean | null;
  blog?: string | null;
  company?: string | null;
  suspended_at?: string | null;
  user_view_type?: string;
  text_matches?: ISearchResultTextMatch[];
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
