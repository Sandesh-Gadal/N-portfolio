import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './app/App.tsx';

/** Renders the page to HTML at build time; scripts/prerender.mjs puts it into dist/index.html. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
