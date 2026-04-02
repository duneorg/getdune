/** @jsxImportSource preact */
import { h } from "preact";
import Layout from "../components/layout.tsx";

export default function PluginsLibrary({ page, pageTitle, site, config, nav, pathname }: any) {
  return (
    <Layout site={site} config={config} nav={nav} page={page} pageTitle={pageTitle} pathname={pathname}>
      <div class="library-header">
        <h1>Plugin Library</h1>
        <p>Extend Dune with community plugins. Published to JSR, installed in seconds.</p>
      </div>

      <div class="library-body">
        <div class="library-filter">
          <label>From JSR</label>
        </div>
        <div class="package-grid" id="pluginGrid">
          {/* Skeleton cards shown while loading */}
          {[1,2,3].map((i) => (
            <div key={i} class="skeleton-card">
              <div class="sk-line sk-medium skeleton" />
              <div class="sk-line sk-full skeleton" />
              <div class="sk-line sk-short skeleton" />
            </div>
          ))}
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (async function loadPlugins() {
          const grid = document.getElementById('pluginGrid');

          try {
            // Fetch all packages from the @dune scope + keyword search
            const [scopeRes, searchRes] = await Promise.all([
              fetch('https://api.jsr.io/scopes/dune/packages'),
              fetch('https://api.jsr.io/packages?query=dune+plugin'),
            ]);
            const scopeData = await scopeRes.json();
            const searchData = await searchRes.json();

            // Combine and deduplicate
            const all = [...(scopeData.items ?? []), ...(searchData.items ?? [])];
            const seen = new Set();
            const packages = all.filter(p => {
              const key = p.scope + '/' + p.name;
              if (seen.has(key)) return false;
              seen.add(key);
              // Filter: include if name contains 'plugin' OR description contains 'dune plugin'
              // OR it's in the @dune scope and not named 'core'
              const isPlugin = p.name.includes('plugin') ||
                (p.description ?? '').toLowerCase().includes('dune plugin');
              const isDuneScope = p.scope === 'dune' && p.name !== 'core';
              return isPlugin || isDuneScope;
            });

            grid.innerHTML = '';

            if (packages.length === 0) {
              grid.innerHTML = \`
                <div class="empty-state">
                  <div class="empty-state-icon">🔌</div>
                  <h3>No plugins published yet</h3>
                  <p>Be the first to build a Dune plugin and publish it to JSR.
                     Name your package with <code>plugin</code> in the name so it
                     shows up here automatically.</p>
                  <a href="/docs/plugins" class="btn btn-primary">Read the plugin API →</a>
                </div>
              \`;
              return;
            }

            packages.forEach(pkg => {
              const install = \`jsr:@\${pkg.scope}/\${pkg.name}@^\${pkg.latestVersion ?? '0.1'}\`;
              const jsrUrl = \`https://jsr.io/@\${pkg.scope}/\${pkg.name}\`;
              const ghUrl = pkg.githubRepository
                ? \`https://github.com/\${pkg.githubRepository.owner}/\${pkg.githubRepository.name}\`
                : null;
              grid.insertAdjacentHTML('beforeend', \`
                <div class="package-card">
                  <div class="package-card-header">
                    <div class="package-name">
                      <span class="package-scope">@\${pkg.scope}/</span>\${pkg.name}
                    </div>
                    \${pkg.latestVersion ? \`<span class="package-version">v\${pkg.latestVersion}</span>\` : ''}
                  </div>
                  <p class="package-desc">\${pkg.description ?? 'No description.'}</p>
                  <div class="package-install">
                    <span class="pi-cmd">import</span>
                    <span>\${install}</span>
                  </div>
                  <div class="package-links">
                    <a href="\${jsrUrl}" target="_blank" rel="noopener">JSR ↗</a>
                    \${ghUrl ? \`<a href="\${ghUrl}" target="_blank" rel="noopener">GitHub ↗</a>\` : ''}
                  </div>
                </div>
              \`);
            });
          } catch (err) {
            grid.innerHTML = \`
              <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <h3>Could not load packages</h3>
                <p>Failed to query the JSR API. Try refreshing, or browse
                   <a href="https://jsr.io/@dune" target="_blank" rel="noopener">jsr.io/@dune</a> directly.</p>
              </div>
            \`;
          }
        })();
      `}} />
    </Layout>
  );
}
