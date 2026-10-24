// Puts the server-rendered page into dist/index.html so the first paint and crawlers that don't
// run JS get the real content, with its critical CSS inlined. Runs after `vite build` and
// `vite build --ssr` (see package.json).
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Beasties from 'beasties';

const MARKER = '<!--app-html-->';
const file = new URL('../dist/index.html', import.meta.url);
const template = readFileSync(file, 'utf8');

if (!template.includes(MARKER)) throw new Error(`prerender: ${MARKER} not found in dist/index.html`);

const { render } = await import('../dist-ssr/entry-server.js');
const html = render();
if (!html.includes('<h1')) throw new Error('prerender: rendered HTML has no <h1>');

// Inline the CSS the prerendered page needs for first paint; the full stylesheet then loads
// without blocking render.
// It keeps only rules whose selectors match this HTML, so evaluate it with <html class="theme-dark">
// (set at runtime by the inline theme script) to keep the dark-theme rules, then drop the class again.
const HTML_TAG = '<html lang="en">';
const DARK_TAG = '<html lang="en" class="theme-dark">';
if (!template.includes(HTML_TAG)) throw new Error(`prerender: ${HTML_TAG} not found in dist/index.html`);
const beasties = new Beasties({ path: fileURLToPath(new URL('../dist', import.meta.url)), preload: 'media', logLevel: 'warn' });
const page = await beasties.process(template.replace(MARKER, html).replace(HTML_TAG, DARK_TAG));
const out = page.replace(/<html\b[^>]*>/, HTML_TAG);
if (out.includes('class="theme-dark"')) throw new Error('prerender: theme-dark class left on <html>');
writeFileSync(file, out);
rmSync(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true });
console.log(`prerender: wrote ${(html.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
