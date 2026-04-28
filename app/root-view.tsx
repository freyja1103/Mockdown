import { serializePage, type PageObject, type RootView } from '@hono/inertia';
import { renderToString } from 'react-dom/server';
import { Link, ReactRefresh, Script } from 'vite-ssr-components/react';
import { absoluteUrl } from '@/lib/site-url';

const defaultTitle = 'Mockdown - ASCII Wireframe Editor';
const defaultDescription =
  'Free browser-based ASCII wireframe editor. Design UI mockups, lo-fi prototypes, and text diagrams with drag-and-drop components - no signup required.';

function stringProp(page: PageObject, key: string): string | undefined {
  const value = (page.props as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : undefined;
}

function metaFor(page: PageObject) {
  const title = stringProp(page, 'metaTitle') ?? defaultTitle;
  const description = stringProp(page, 'metaDescription') ?? defaultDescription;
  const canonicalPath = stringProp(page, 'canonicalPath') ?? '/';
  const canonicalUrl = absoluteUrl(canonicalPath);

  return {
    title,
    description,
    canonicalUrl,
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mockdown',
  url: absoluteUrl('/'),
  description: defaultDescription,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  browserRequirements: 'Requires a modern web browser',
};

const Document = ({ page }: { page: PageObject }) => {
  const meta = metaFor(page);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2979FF" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta
          name="keywords"
          content="ASCII wireframe, wireframe editor, ASCII mockup, text wireframe, lo-fi prototype, UI mockup tool, ASCII diagram, wireframe tool, rapid prototyping, free wireframe"
        />
        <meta name="application-name" content="Mockdown" />
        <link rel="canonical" href={meta.canonicalUrl} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mockdown" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonicalUrl} />
        <meta property="og:image" content={absoluteUrl('/og.png?v=2')} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={meta.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={absoluteUrl('/og.png?v=2')} />
        <ReactRefresh />
        <Script src="/src/client.tsx" />
        <Link href="/src/styles/globals.css" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          data-page="app"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: serializePage(page) }}
        />
        <div id="app" />
      </body>
    </html>
  );
};

export const rootView: RootView = (page) =>
  '<!DOCTYPE html>' + renderToString(<Document page={page} />);
