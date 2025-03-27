import { type components } from '@octokit/openapi-types'
import type { OS } from 'ua-parser-js/enums'

export type ISyncFunction = (...args: any[]) => any
export type IASyncFunction = (...args: any[]) => Promise<any>
export type IFunction = ISyncFunction | IASyncFunction
export type IAsset = components['schemas']['release-asset']
export type IMatchResult ={
  score: number;
  matches: {
    exact_match: string[];
    partial_match: string[];
    conflicts: string[];
  };
}
export type OSType = (typeof OS)[keyof typeof OS]