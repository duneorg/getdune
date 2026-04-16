// Shared JSR version resolution — Deno caches this module, so state is shared
// across all importers (home.tsx, layout.tsx, etc.)
//
// Resolution cascade:
//   1. In-memory cache (TTL 1h)
//   2. JSR API → also writes disk cache
//   3. Disk cache (data/jsr-version.json)
//   4. deno.json import map
//   5. null → callers render gracefully without a version

const DISK_CACHE = new URL("../../../../data/jsr-version.json", import.meta.url).pathname;
const DENO_JSON  = new URL("../../../../deno.json", import.meta.url).pathname;
const TTL = 60 * 60 * 1000; // 1 hour

let _cached: string | null = null;
let _expiry = 0;

async function resolve(): Promise<string | null> {
  // 1. Memory cache
  if (_cached && Date.now() < _expiry) return _cached;

  // 2. JSR API
  try {
    const res = await fetch("https://jsr.io/api/scopes/dune/packages/core");
    if (res.ok) {
      const { latestVersion } = await res.json();
      if (latestVersion) {
        _cached = latestVersion;
        _expiry = Date.now() + TTL;
        try { await Deno.writeTextFile(DISK_CACHE, JSON.stringify({ version: latestVersion })); } catch { /* ignore */ }
        return _cached;
      }
    }
  } catch { /* API unreachable */ }

  // 3. Disk cache
  try {
    const { version } = JSON.parse(await Deno.readTextFile(DISK_CACHE));
    if (version) { _cached = version; _expiry = Date.now() + TTL; return _cached; }
  } catch { /* no disk cache yet */ }

  // 4. deno.json import map
  try {
    const dj = JSON.parse(await Deno.readTextFile(DENO_JSON));
    const m = (dj.imports?.["@dune/core"] ?? "").match(/@\^?([\d.]+)/);
    if (m) { _cached = m[1]; _expiry = Date.now() + TTL; return _cached; }
  } catch { /* no deno.json */ }

  // 5. Give up
  return null;
}

// Fetch on module load, then refresh hourly in background
export let jsrVersion: string | null = await resolve();
setInterval(async () => { _expiry = 0; jsrVersion = await resolve(); }, TTL);

// ^major.minor for use in import map snippets (e.g. "0.6.2" → "0.6")
export const jsrMinorVersion: string | null = jsrVersion?.split(".").slice(0, 2).join(".") ?? null;
