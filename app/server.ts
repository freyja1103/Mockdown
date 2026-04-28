import { inertia } from '@hono/inertia';
import { Hono } from 'hono';
import { generate } from './routes/generate';
import { rootView } from './root-view';
import { absoluteUrl } from '@/lib/site-url';

const siteTitle = 'Mockdown - ASCII Wireframe Editor';
const siteDescription =
  'Free browser-based ASCII wireframe editor. Design UI mockups, lo-fi prototypes, and text diagrams with drag-and-drop components - no signup required.';

const app = new Hono();

app.use(
  inertia({
    version: '1',
    rootView,
  }),
);

const routes = app
  .get('/', (c) =>
    c.render('Home', {
      metaTitle: siteTitle,
      metaDescription: siteDescription,
      canonicalPath: '/',
      generateEndpoint: '/api/generate',
    }),
  )
  .get('/about', (c) =>
    c.render('About', {
      metaTitle: 'About Mockdown - Free ASCII Wireframe Editor',
      metaDescription:
        'Mockdown is a free ASCII wireframe editor built for AI-assisted coding. Sketch UI with 20+ components, export as Markdown, paste into Claude Code or Cursor.',
      canonicalPath: '/about',
    }),
  )
  .post('/api/generate', generate)
  .get('/robots.txt', (c) =>
    c.text(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
        '',
      ].join('\n'),
      200,
      { 'Content-Type': 'text/plain; charset=utf-8' },
    ),
  )
  .get('/sitemap.xml', (c) => {
    const now = new Date().toISOString();
    return c.body(
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `  <url><loc>${absoluteUrl('/')}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n` +
        `  <url><loc>${absoluteUrl('/about')}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n` +
        `</urlset>\n`,
      200,
      { 'Content-Type': 'application/xml; charset=utf-8' },
    );
  })
  .get('/manifest.webmanifest', (c) =>
    c.json({
      name: 'Mockdown - ASCII Wireframe Editor',
      short_name: 'Mockdown',
      description: siteDescription,
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#2979FF',
      icons: [
        {
          src: '/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
        },
      ],
    }),
  );

export type AppType = typeof routes;
export default routes;
