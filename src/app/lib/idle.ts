/**
 * Runs `fn` once the browser is idle (after hydration and first paint), so work that isn't needed
 * for the first screen (ScrollTrigger's layout reads, the visit counter fetch) doesn't block startup.
 * Returns a cancel function. Safari has no requestIdleCallback, so it falls back to a short timeout.
 */
export function whenIdle(fn: () => void) {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 200);
  return () => window.clearTimeout(id);
}
