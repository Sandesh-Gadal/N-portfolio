// Page-visit counter backed by Abacus (https://v2.jasoncameron.dev/abacus): a free,
// account-less counter API with CORS. Counters expire after six months without access.
//
// Only the live site increments the count, once per browser session; local dev and
// previews just read it. Any failure resolves to null so the UI can hide the counter.

const BASE = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'sandeshgadal-com-np';
const KEY = 'visits';
const LIVE_HOSTS = ['sandeshgadal.com.np', 'www.sandeshgadal.com.np'];
const SESSION_FLAG = 'visit-counted';

function alreadyCounted() {
  try {
    return sessionStorage.getItem(SESSION_FLAG) === '1';
  } catch {
    return true; // Storage blocked: don't risk counting on every page load.
  }
}

function markCounted() {
  try {
    sessionStorage.setItem(SESSION_FLAG, '1');
  } catch {
    // Ignore; see alreadyCounted.
  }
}

let pending: Promise<number | null> | null = null;

/** Current visit count (incrementing once per session on the live site). Shared across callers. */
export function fetchVisitCount(): Promise<number | null> {
  if (pending) return pending;

  const shouldHit = LIVE_HOSTS.includes(window.location.hostname) && !alreadyCounted();
  const action = shouldHit ? 'hit' : 'get';

  pending = fetch(`${BASE}/${action}/${NAMESPACE}/${KEY}`)
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { value?: unknown } | null) => {
      if (!data || typeof data.value !== 'number') return null;
      if (shouldHit) markCounted();
      return data.value;
    })
    .catch(() => null);

  return pending;
}
