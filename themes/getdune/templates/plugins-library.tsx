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
          {[1,2,3].map((i) => (
            <div key={i} class="skeleton-card">
              <div class="sk-line sk-medium skeleton" />
              <div class="sk-line sk-full skeleton" />
              <div class="sk-line sk-short skeleton" />
            </div>
          ))}
        </div>

        <div class="library-publish-cta">
          <p>
            Built a Dune plugin? Publish it to JSR and include{" "}
            <code>dune-plugin</code> in your package description to appear here.
          </p>
          <a href="/docs/plugins" class="btn btn-secondary">Plugin guide →</a>
        </div>
      </div>

      <div class="library-video-gap"></div>

      <script dangerouslySetInnerHTML={{ __html: `
        (async function loadPlugins() {
          const grid = document.getElementById('pluginGrid');

          // duneorg/dune-registry refreshes this daily from JSR (see that
          // repo's README for why it's not queried live here per-request).
          try {
            const res = await fetch('https://raw.githubusercontent.com/duneorg/dune-registry/main/plugins.json');
            const data = await res.json();
            const packages = data.plugins ?? [];

            grid.innerHTML = '';

            if (packages.length === 0) {
              grid.innerHTML = \`
                <div class="empty-state">
                  <div class="empty-state-icon">🔌</div>
                  <h3>No plugins published yet</h3>
                  <p>Be the first — publish your plugin to JSR with
                     <code>dune-plugin</code> in the description and it will appear here.</p>
                </div>
              \`;
              return;
            }

            packages.forEach(pkg => {
              grid.insertAdjacentHTML('beforeend', \`
                <div class="package-card">
                  <div class="package-card-header">
                    <div class="package-name">\${pkg.displayName}</div>
                    \${pkg.version ? \`<span class="package-version">v\${pkg.version}</span>\` : ''}
                  </div>
                  <p class="package-desc">\${pkg.description || 'No description.'}</p>
                  <div class="package-install">
                    <span class="pi-cmd">import</span>
                    <span>\${pkg.jsrInstall}</span>
                  </div>
                  <div class="package-links">
                    <a href="\${pkg.jsrUrl}" target="_blank" rel="noopener">JSR ↗</a>
                    \${pkg.githubUrl ? \`<a href="\${pkg.githubUrl}" target="_blank" rel="noopener">GitHub ↗</a>\` : ''}
                  </div>
                </div>
              \`);
            });
          } catch (err) {
            grid.innerHTML = \`
              <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <h3>Could not load packages</h3>
                <p>Try refreshing, or browse
                   <a href="https://jsr.io/@dune" target="_blank" rel="noopener">jsr.io/@dune</a> directly.</p>
              </div>
            \`;
          }
        })();
      `}} />
    </Layout>
  );
}
