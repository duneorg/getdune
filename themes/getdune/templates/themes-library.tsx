/** @jsxImportSource preact */
import { h } from "preact";
import Layout from "../components/layout.tsx";

export default function ThemesLibrary({ page, pageTitle, site, config, nav, pathname }: any) {
  return (
    <Layout site={site} config={config} nav={nav} page={page} pageTitle={pageTitle} pathname={pathname}>
      <div class="library-header">
        <h1>Theme Library</h1>
        <p>
          Starter themes and community themes for Dune. Install from JSR, customise with CSS
          or inherit and extend.
        </p>
      </div>

      <div class="library-body">
        <div class="library-filter">
          <label>From JSR</label>
        </div>
        <div class="package-grid" id="themeGrid">
          {[1,2,3].map((i) => (
            <div key={i} class="skeleton-card">
              <div class="sk-line sk-medium skeleton" />
              <div class="sk-line sk-full skeleton" />
              <div class="sk-line sk-short skeleton" />
            </div>
          ))}
        </div>
      </div>

      <div class="library-publish-cta">
        <p>
          Built a Dune theme? Publish it to JSR and include{" "}
          <code>dune-theme</code> in your package description to appear here.
        </p>
        <a href="/docs/themes" class="btn btn-secondary">Theme guide →</a>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (async function loadThemes() {
          const grid = document.getElementById('themeGrid');

          // A package is listed if it is in the @dune scope (always curated)
          // OR published to any scope with "dune-theme" in the description.
          // This is the convention — include "dune-theme" in your JSR description.
          function isEligible(p) {
            if (p.scope === 'dune' && p.name !== 'core') return true;
            return (p.description ?? '').toLowerCase().includes('dune-theme');
          }

          try {
            const [scopeRes, searchRes] = await Promise.all([
              fetch('https://api.jsr.io/scopes/dune/packages'),
              fetch('https://api.jsr.io/packages?query=dune-theme'),
            ]);
            const scopeData = await scopeRes.json();
            const searchData = await searchRes.json();

            const all = [...(scopeData.items ?? []), ...(searchData.items ?? [])];
            const seen = new Set();
            const packages = all.filter(p => {
              const key = p.scope + '/' + p.name;
              if (seen.has(key)) return false;
              seen.add(key);
              return isEligible(p);
            });

            grid.innerHTML = '';

            if (packages.length === 0) {
              grid.innerHTML = \`
                <div class="empty-state">
                  <div class="empty-state-icon">🎨</div>
                  <h3>No themes published yet</h3>
                  <p>Be the first — publish your theme to JSR with
                     <code>dune-theme</code> in the description and it will appear here.</p>
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
