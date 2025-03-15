import type { IAsset } from '@/lib/types.ts'

export const testCases = [
  {
    name: 'Windows Firefox',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
    expectedMatches: {
      'fzf-0.60.3-windows_amd64.zip': ['OS', 'Architecture', 'Extension'],
      'fzf-0.60.3-darwin_amd64.tar.gz': ['Architecture'],
      'fzf-0.60.3-windows_armv6.zip': ['OS', 'Extension'],
      'fzf-0.60.3-windows_armv5.zip': ['OS', 'Extension'],
      'fzf-0.60.3-windows_armv7.zip': ['OS', 'Extension'],
      'fzf-0.60.3-windows_arm64.zip': ['OS', 'Extension'],
      'fzf-0.60.3-darwin_arm64.tar.gz': [],
    },
  },
  {
    name: 'Mac Safari',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
    expectedMatches: {
      'fzf-0.60.3-darwin_arm64.tar.gz': ['OS'],
      'fzf-0.60.3-darwin_amd64.tar.gz': ['OS'],
    },
  },
  {
    name: 'Linux',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36',
    expectedMatches: {
      'fzf-0.60.3-linux_amd64.tar.gz': ['OS', 'Architecture'],
      'fzf-0.60.3-linux_s390x.tar.gz': ['OS'],
      'fzf-0.60.3-linux_ppc64le.tar.gz': ['OS'],
      'fzf-0.60.3-linux_loong64.tar.gz': ['OS'],
      'fzf-0.60.3-linux_armv6.tar.gz': ['OS'],
      'fzf-0.60.3-linux_armv5.tar.gz': ['OS'],
      'fzf-0.60.3-linux_armv7.tar.gz': ['OS'],
      'fzf-0.60.3-linux_arm64.tar.gz': ['OS'],
    },
  },
]

export const assets: IAsset[] = [
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110380',
    id: 234110380,
    node_id: 'RA_kwDOANKv9s4N9D2s',
    name: 'fzf-0.60.3-darwin_amd64.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1699903,
    download_count: 615,
    created_at: '2025-03-03T08:18:34Z',
    updated_at: '2025-03-03T08:18:39Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-darwin_amd64.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110379',
    id: 234110379,
    node_id: 'RA_kwDOANKv9s4N9D2r',
    name: 'fzf-0.60.3-darwin_arm64.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1625616,
    download_count: 2557,
    created_at: '2025-03-03T08:18:34Z',
    updated_at: '2025-03-03T08:18:39Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-darwin_arm64.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110377',
    id: 234110377,
    node_id: 'RA_kwDOANKv9s4N9D2p',
    name: 'fzf-0.60.3-freebsd_amd64.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1598871,
    download_count: 71,
    created_at: '2025-03-03T08:18:34Z',
    updated_at: '2025-03-03T08:18:39Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-freebsd_amd64.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110387',
    id: 234110387,
    node_id: 'RA_kwDOANKv9s4N9D2z',
    name: 'fzf-0.60.3-linux_amd64.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1605884,
    download_count: 43207,
    created_at: '2025-03-03T08:18:39Z',
    updated_at: '2025-03-03T08:18:40Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-linux_amd64.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110374',
    id: 234110374,
    node_id: 'RA_kwDOANKv9s4N9D2m',
    name: 'fzf-0.60.3-linux_arm64.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1490901,
    download_count: 3543,
    created_at: '2025-03-03T08:18:34Z',
    updated_at: '2025-03-03T08:18:40Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-linux_arm64.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110390',
    id: 234110390,
    node_id: 'RA_kwDOANKv9s4N9D22',
    name: 'fzf-0.60.3-linux_armv5.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1565307,
    download_count: 33,
    created_at: '2025-03-03T08:18:39Z',
    updated_at: '2025-03-03T08:18:42Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-linux_armv5.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110388',
    id: 234110388,
    node_id: 'RA_kwDOANKv9s4N9D20',
    name: 'fzf-0.60.3-linux_armv6.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1556796,
    download_count: 49,
    created_at: '2025-03-03T08:18:39Z',
    updated_at: '2025-03-03T08:18:40Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-linux_armv6.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110389',
    id: 234110389,
    node_id: 'RA_kwDOANKv9s4N9D21',
    name: 'fzf-0.60.3-linux_armv7.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https:/t/api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1553861,
    download_count: 72,
    created_at: '2025-03-03T08:18:39Z',
    updated_at: '2025-03-03T08:18:41Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-linux_armv7.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110373',
    id: 234110373,
    node_id: 'RA_kwDOANKv9s4N9D2l',
    name: 'fzf-0.60.3-linux_loong64.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1559582,
    download_count: 36,
    created_at: '2025-03-03T08:18:34Z',
    updated_at: '2025-03-03T08:18:38Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-linux_loong64.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110378',
    id: 234110378,
    node_id: 'RA_kwDOANKv9s4N9D2q',
    name: 'fzf-0.60.3-linux_ppc64le.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1482066,
    download_count: 41,
    created_at: '2025-03-03T08:18:34Z',
    updated_at: '2025-03-03T08:18:38Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-linux_ppc64le.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110398',
    id: 234110398,
    node_id: 'RA_kwDOANKv9s4N9D2-',
    name: 'fzf-0.60.3-linux_s390x.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1573200,
    download_count: 36,
    created_at: '2025-03-03T08:18:41Z',
    updated_at: '2025-03-03T08:18:42Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-linux_s390x.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110393',
    id: 234110393,
    node_id: 'RA_kwDOANKv9s4N9D25',
    name: 'fzf-0.60.3-openbsd_amd64.tar.gz',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/octet-stream',
    state: 'uploaded',
    size: 1602896,
    download_count: 40,
    created_at: '2025-03-03T08:18:40Z',
    updated_at: '2025-03-03T08:18:42Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-openbsd_amd64.tar.gz',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110394',
    id: 234110394,
    node_id: 'RA_kwDOANKv9s4N9D26',
    name: 'fzf-0.60.3-windows_amd64.zip',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/zip',
    state: 'uploaded',
    size: 1827868,
    download_count: 10100,
    created_at: '2025-03-03T08:18:41Z',
    updated_at: '2025-03-03T08:18:42Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-windows_amd64.zip',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110392',
    id: 234110392,
    node_id: 'RA_kwDOANKv9s4N9D24',
    name: 'fzf-0.60.3-windows_arm64.zip',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/zip',
    state: 'uploaded',
    size: 1701164,
    download_count: 162,
    created_at: '2025-03-03T08:18:40Z',
    updated_at: '2025-03-03T08:18:41Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-windows_arm64.zip',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110391',
    id: 234110391,
    node_id: 'RA_kwDOANKv9s4N9D23',
    name: 'fzf-0.60.3-windows_armv5.zip',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/zip',
    state: 'uploaded',
    size: 1798746,
    download_count: 40,
    created_at: '2025-03-03T08:18:40Z',
    updated_at: '2025-03-03T08:18:42Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-windows_armv5.zip',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110375',
    id: 234110375,
    node_id: 'RA_kwDOANKv9s4N9D2n',
    name: 'fzf-0.60.3-windows_armv6.zip',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/zip',
    state: 'uploaded',
    size: 1785909,
    download_count: 41,
    created_at: '2025-03-03T08:18:34Z',
    updated_at: '2025-03-03T08:18:38Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-windows_armv6.zip',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110376',
    id: 234110376,
    node_id: 'RA_kwDOANKv9s4N9D2o',
    name: 'fzf-0.60.3-windows_armv7.zip',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'application/zip',
    state: 'uploaded',
    size: 1780541,
    download_count: 58,
    created_at: '2025-03-03T08:18:34Z',
    updated_at: '2025-03-03T08:18:38Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf-0.60.3-windows_armv7.zip',
  },
  {
    url: 'https://api.github.com/repos/junegunn/fzf/releases/assets/234110399',
    id: 234110399,
    node_id: 'RA_kwDOANKv9s4N9D2_',
    name: 'fzf_0.60.3_checksums.txt',
    label: '',
    uploader: {
      login: 'junegunn',
      id: 700826,
      node_id: 'MDQ6VXNlcjcwMDgyNg==',
      avatar_url: 'https://avatars.githubusercontent.com/u/700826?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/junegunn',
      html_url: 'https://github.com/junegunn',
      followers_url: 'https://api.github.com/users/junegunn/followers',
      following_url: 'https://api.github.com/users/junegunn/following{/other_user}',
      gists_url: 'https://api.github.com/users/junegunn/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/junegunn/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/junegunn/subscriptions',
      organizations_url: 'https://api.github.com/users/junegunn/orgs',
      repos_url: 'https://api.github.com/users/junegunn/repos',
      events_url: 'https://api.github.com/users/junegunn/events{/privacy}',
      received_events_url: 'https://api.github.com/users/junegunn/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false,
    },
    content_type: 'text/plain; charset=utf-8',
    state: 'uploaded',
    size: 1637,
    download_count: 715,
    created_at: '2025-03-03T08:18:41Z',
    updated_at: '2025-03-03T08:18:42Z',
    browser_download_url:
      'https://github.com/junegunn/fzf/releases/download/v0.60.3/fzf_0.60.3_checksums.txt',
  },
]
