export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-');
}