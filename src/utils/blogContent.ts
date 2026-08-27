export function blogContentToHtml(content: string | string[] | null | undefined): string {
  if (Array.isArray(content)) return content.join('\n\n');
  return content || '';
}