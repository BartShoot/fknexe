export type ISyncFunction = (...args: any[]) => any
export type IASyncFunction = (...args: any[]) => Promise<any>
export type IFunction = ISyncFunction | IASyncFunction
