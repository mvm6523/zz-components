export const mutable = <T extends readonly any[] | Record<string, unknown>>(
  val: T
) => val as Mutable<typeof val>
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type HTMLElementCustomized<T> = HTMLElement & T

export type Nullable<T> = T | null

export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T

export type CustomRequired<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & Omit<T, K>
