/** @jsxImportSource preact */
import { h } from "preact";
import Layout from "../components/layout.tsx";

const features = [
  {
    icon: "📄",
    title: "Markdown content",
    desc: "Write pages and blog posts in Markdown with YAML frontmatter. Ordered directories become the navigation.",
  },
  {
    icon: "⚡",
    title: "TSX themes",
    desc: "Themes are Preact components. Full TypeScript, zero build step — Deno compiles TSX on the fly.",
  },
  {
    icon: "🔌",
    title: "Plugin system",
    desc: "Extend Dune with hooks for rendering, routing, and content transformation. Publish to JSR.",
  },
  {
    icon: "🗂️",
    title: "Multisite",
    desc: "Serve multiple sites from a single process with shared themes. Ideal for hosting families of sites.",
  },
  {
    icon: "🌐",
    title: "i18n built-in",
    desc: "Multi-language routing, locale files, and language switcher — all wired up automatically.",
  },
  {
    icon: "🚀",
    title: "Deploy anywhere",
    desc: "Run as a standard Deno HTTP server. Deploy to Deno Deploy, fly.io, a VPS — whatever you prefer.",
  },
];

const steps = [
  {
    n: "01",
    title: "Create a site",
    body: "Run the CLI to scaffold a new site with a starter theme, sample content, and a ready-to-run deno.json.",
  },
  {
    n: "02",
    title: "Write your content",
    body: "Drop markdown files into content/. Directories become sections. Frontmatter controls templates, titles, and metadata.",
  },
  {
    n: "03",
    title: "Ship it",
    body: "Run deno task serve. Point a domain at it. Done. No database, no build pipeline, no CMS vendor lock-in.",
  },
];

const mainTsCode = `<span class="tok-kw">import</span> { <span class="tok-id">createDuneEngine</span>, <span class="tok-id">loadConfig</span> } <span class="tok-kw">from</span> <span class="tok-str">"@dune/core"</span>;

<span class="tok-kw">const</span> <span class="tok-id">config</span> = <span class="tok-kw">await</span> <span class="tok-fn">loadConfig</span>(<span class="tok-id">ROOT</span>);
<span class="tok-kw">const</span> <span class="tok-id">engine</span> = <span class="tok-kw">await</span> <span class="tok-fn">createDuneEngine</span>({ <span class="tok-id">rootDir</span>: <span class="tok-id">ROOT</span>, <span class="tok-id">config</span> });

<span class="tok-id">Deno</span>.<span class="tok-fn">serve</span>({ <span class="tok-id">port</span>: <span class="tok-num">8080</span> }, (<span class="tok-id">req</span>) =&gt; <span class="tok-id">engine</span>.<span class="tok-fn">handle</span>(<span class="tok-id">req</span>));`;

const siteYamlCode = `<span class="tok-y">title</span><span class="tok-op">:</span> <span class="tok-ys">My Site</span>
<span class="tok-y">description</span><span class="tok-op">:</span> <span class="tok-ys">Built with Dune</span>
<span class="tok-y">url</span><span class="tok-op">:</span> <span class="tok-ys">https://mysite.com</span>
<span class="tok-y">theme</span><span class="tok-op">:</span>
  <span class="tok-y">name</span><span class="tok-op">:</span> <span class="tok-ys">starter</span>`;

const denoJsonCode = `{
  <span class="tok-str">"imports"</span>: {
    <span class="tok-str">"preact"</span>: <span class="tok-str">"npm:preact@^10"</span>,
    <span class="tok-str">"preact/jsx-runtime"</span>: <span class="tok-str">"npm:preact@^10/jsx-runtime"</span>,
    <span class="tok-str">"@dune/core"</span>: <span class="tok-str">"jsr:@dune/core@^0.6"</span>
  },
  <span class="tok-str">"compilerOptions"</span>: {
    <span class="tok-str">"jsx"</span>: <span class="tok-str">"react-jsx"</span>,
    <span class="tok-str">"jsxImportSource"</span>: <span class="tok-str">"preact"</span>
  }
}`;

export default function HomeTemplate({ page, pageTitle, site, config, nav, pathname }: any) {
  return (
    <Layout site={site} config={config} nav={nav} page={page} pageTitle={pageTitle} pathname={pathname}>
      {/* Hero */}
      <section class="hero">
        <div class="hero-badge">v0.6 · now on JSR</div>
        <h1>The flat-file CMS<br />for <em>Deno</em> and <em>Fresh</em></h1>
        <p class="hero-subtitle">
          Markdown content. TSX themes. Zero database. Ships as a single
          Deno module — no build pipeline required.
        </p>
        <div class="hero-actions">
          <a href="/docs/getting-started" class="btn btn-primary">Get started →</a>
          <a href="https://github.com/duneorg/dune" class="btn btn-outline" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </div>
        <div class="hero-install">
          <span class="prompt">$</span>
          <code>deno run -A jsr:@dune/core/cli new my-site</code>
          <button class="copy-btn" onclick="navigator.clipboard.writeText('deno run -A jsr:@dune/core/cli new my-site');this.textContent='✓';setTimeout(()=>this.textContent='copy',1500)">copy</button>
        </div>
      </section>

      {/* Features */}
      <section class="section features">
        <video class="features-video" id="features-bg" autoplay muted loop playsinline></video>
        <div class="features-overlay" />
        <div class="section-inner features-content">
          <div class="section-label">What's included</div>
          <h2 class="section-title" style="color:#fff">Markdown served<br />the Fresh way</h2>
          <div class="features-grid">
            {features.map((f) => (
              <div key={f.title} class="feature-card">
                <div class="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section class="section how-it-works">
        <div class="section-inner">
          <div class="section-label">How it works</div>
          <h2 class="section-title">Up and running in minutes</h2>
          <p class="section-sub">
            No config files, no installers, no local databases. Dune is a Deno module
            you import and serve.
          </p>
          <div class="steps">
            {steps.map((s) => (
              <div key={s.n} class="step">
                <div class="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code example */}
      <section class="section code-section">
        <div class="section-inner">
          <div class="section-label">Under the hood</div>
          <h2 class="section-title" style="color:#fff">Minimal boilerplate</h2>
          <p class="section-sub">
            Three files to a working site: a deno.json, a site config, and an entry point.
          </p>
          <div class="code-tabs" id="codeTabs">
            <div class="code-tab-bar">
              <button class="active" onclick="showTab('main')">main.ts</button>
              <button onclick="showTab('deno')">deno.json</button>
              <button onclick="showTab('yaml')">config/site.yaml</button>
            </div>
            <div class="code-pane active" id="tab-main">
              <pre dangerouslySetInnerHTML={{ __html: mainTsCode }} />
            </div>
            <div class="code-pane" id="tab-deno">
              <pre dangerouslySetInnerHTML={{ __html: denoJsonCode }} />
            </div>
            <div class="code-pane" id="tab-yaml">
              <pre dangerouslySetInnerHTML={{ __html: siteYamlCode }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section class="cta-section">
        <h2>Ready to build?</h2>
        <p>Read the docs, scaffold your first site, and see how far a flat-file stack gets you.</p>
        <div class="hero-actions">
          <a href="/docs/getting-started" class="btn btn-primary">Read the docs →</a>
          <a href="/plugins" class="btn btn-outline">Browse plugins</a>
        </div>
      </section>

      {/* Video background loader — bypasses wrong MIME type from static server */}
      <script dangerouslySetInnerHTML={{ __html: `
        fetch('/themes/getdune/static/dune.mp4')
          .then(r => r.blob())
          .then(blob => {
            const v = document.getElementById('features-bg');
            if (!v) return;
            v.src = URL.createObjectURL(new Blob([blob], { type: 'video/mp4' }));
            v.play().catch(() => {});
          })
          .catch(() => {});
      `}} />

      {/* Tab switching script */}
      <script dangerouslySetInnerHTML={{ __html: `
        function showTab(name) {
          document.querySelectorAll('.code-pane').forEach(p => p.classList.remove('active'));
          document.querySelectorAll('.code-tab-bar button').forEach(b => b.classList.remove('active'));
          document.getElementById('tab-' + name).classList.add('active');
          event.currentTarget.classList.add('active');
        }
      `}} />
    </Layout>
  );
}
