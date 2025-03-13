import { type components } from '@octokit/openapi-types'

export type ISyncFunction = (...args: any[]) => any
export type IASyncFunction = (...args: any[]) => Promise<any>
export type IFunction = ISyncFunction | IASyncFunction
export type IAsset = components['schemas']['release-asset']
