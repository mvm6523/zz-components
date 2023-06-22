export function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)))
}
