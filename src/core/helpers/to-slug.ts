export function toSlug(value: string): string {
  return value.replaceAll(' ', '-').toLowerCase()
}
