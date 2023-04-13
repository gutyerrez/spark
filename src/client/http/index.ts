export type GetRequest = {
  url: string
  headers?: {
    [key: string]: any
  }
}

export type PostRequest<R extends string | object | undefined> = {
  url: string,
  headers?: {[key: string]: any}[]
  data?: R
}

export type PutRequest<R extends string | object | undefined> = {
  url: string,
  headers?: {[key: string]: any}[]
  data?: R
}

export type DeleteRequest<R extends string | object | undefined> = {
  url: string,
  headers?: {[key: string]: any}[]
  data?: R
}

export type Response<T> = {
  status: number;
  data: T
}