import { RequestError } from '@octokit/request-error'
import { Octokit } from '@octokit/rest'
import type { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse'
import { base64decode } from '@/lib/utils/base64/decode'

type Instance = InstanceType<typeof Octokit>
type Rest = Instance['rest']

interface ApiMethods {
  getLatestRelease: Rest['repos']['getLatestRelease']
  getReleases: Rest['repos']['listReleases']
  getReadme: Rest['repos']['getReadme']
  searchUsers: Rest['search']['users']
  searchRepositories: Rest['search']['repos']
}

export type GithubResponse = {
  [K in keyof ApiMethods]: Awaited<ReturnType<ApiMethods[K]>>['data']
}

const methodMap = {
  getLatestRelease: { namespace: 'repos', method: 'getLatestRelease' },
  getReleases: { namespace: 'repos', method: 'listReleases' },
  getReadme: { namespace: 'repos', method: 'getReadme' },
  searchUsers: { namespace: 'search', method: 'users' },
  searchRepositories: { namespace: 'search', method: 'repos' },
} as const satisfies Record<keyof ApiMethods, { namespace: keyof Rest; method: string }>

export class GithubApi {
  static #instance: Octokit
  static init(options?: ConstructorParameters<typeof Octokit>[0]) {
    this.#instance = new Octokit(options)
  }

  static async #call<M extends keyof ApiMethods>(
    methodName: M,
    ...params: Parameters<ApiMethods[M]>
  ): Promise<GithubResponse[M]> {
    try {
      const { namespace, method } = methodMap[methodName]
      const result: OctokitResponse<GithubResponse[M]> =
        // @ts-expect-error - TS doesn't know that `namespace` and `method` are valid keys
        await this.#instance.rest[namespace][method](...params)

      if (!result.status.toString().startsWith('2')) {
        throw new Error(`GitHub API returned status ${result.status}`)
      }

      if (!result.data) {
        throw new Error(`No data found`)
      }

      return result.data
    } catch (error) {
      if (error instanceof RequestError) {
        // Existing message modification
        error.message = `${error.message.replace(/[\W]*https:\/\/.*$/, '')}`

        // New rate limit detection
        const isRateLimit =
          error.status === 403 &&
          (error.response?.data?.message?.toLowerCase().includes('api rate limit exceeded') ||
            error.response?.headers?.['x-ratelimit-remaining'] === '0')

        if (isRateLimit) {
          ;(error as any).isRateLimitError = true
          const resetTimestampHeader = error.response?.headers?.['x-ratelimit-reset']
          if (resetTimestampHeader) {
            ;(error as any).rateLimitResetTime = parseInt(resetTimestampHeader as string, 10)
          }
        }
      }
      throw error
    }
  }

  static getLatestRelease = (...params: Parameters<ApiMethods['getLatestRelease']>) =>
    this.#call('getLatestRelease', ...params)

  static searchRepositories = (...params: Parameters<ApiMethods['searchRepositories']>) =>
    this.#call('searchRepositories', ...params)

  static getReleases = (...params: Parameters<ApiMethods['getReleases']>) =>
    this.#call('getReleases', ...params)

  static searchUsers = (...params: Parameters<ApiMethods['searchUsers']>) =>
    this.#call('searchUsers', ...params)

  static getReadme = (...params: Parameters<ApiMethods['getReadme']>) =>
    this.#call('getReadme', ...params).then((data) => {
      if (data.content) {
        if (data.encoding !== 'base64') throw new Error(`Unexpected encoding: ${data.encoding}`)
        data.content = base64decode(data.content)
      }
      return data
    })
}

GithubApi.init({
  ...(import.meta.env.DEV && {
    log: {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    },
  }),
})
