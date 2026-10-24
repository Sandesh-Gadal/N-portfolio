// Puts the server-rendered page into dist/index.html so the first paint and crawlers that don't
// run JS get the real content. Runs after `vite build` and `vite build --ssr` (see package.json).
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

const MARKER = '<!--app-html-->';
const file = new URL('../dist/index.html', import.meta.url);
const template = readFileSync(file, 'utf8');

if (!template.includes(MARKER)) throw new Error(`prerender: ${MARKER} not found in dist/index.html`);

const { render } = await import('../dist-ssr/entry-server.js');
const html = render();
if (!html.includes('<h1')) throw new Error('prerender: rendered HTML has no <h1>');

writeFileSync(file, template.replace(MARKER, html));
rmSync(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true });
console.log(`prerender: wrote ${(html.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
