const DEFAULT_SITE_URL = 'https://www.mockdown.design';

function normalizeSiteUrl(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL,
) || DEFAULT_SITE_URL;

export function absoluteUrl(path = '/'): string {
  return new URL(path, `${siteUrl}/`).toString();
}
