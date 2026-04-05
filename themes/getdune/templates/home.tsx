/** @jsxImportSource preact */
import { h } from "preact";
import Layout from "../components/layout.tsx";

const features = [
  {
    icon: "📄",
    title: "Markdown content",
    desc: "Write pages in Markdown or MDX — embedding Fresh islands directly in your content for interactive components right in the prose.",
  },
  {
    icon: "⚡",
    title: "TSX themes",
    desc: "Themes are Preact components — the same model Fresh uses. Full TypeScript, zero build step, Deno compiles TSX on the fly.",
  },
  {
    icon: "🔌",
    title: "Plugin system",
    desc: "Extend Dune with hooks for rendering, routing, and content — and ship interactive UI as islands that hydrate where you need them.",
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
    body: "Run dune serve. Point a domain at it. Done. No database, no build pipeline, no CMS vendor lock-in.",
  },
];

const cliCode = `<span class="tok-cm"># Install the CLI</span>
<span class="tok-id">deno</span> <span class="tok-fn">install</span> -A -n dune jsr:@dune/core/cli

<span class="tok-cm"># Create a new site</span>
<span class="tok-id">dune</span> <span class="tok-fn">new</span> my-site
<span class="tok-kw">cd</span> my-site

<span class="tok-cm"># Start the dev server</span>
<span class="tok-id">dune</span> <span class="tok-fn">dev</span>

<span class="tok-cm"># Build for production</span>
<span class="tok-id">dune</span> <span class="tok-fn">serve</span>`;

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
  <span class="tok-str">"tasks"</span>: {
    <span class="tok-str">"dev"</span>: <span class="tok-str">"dune dev"</span>,
    <span class="tok-str">"serve"</span>: <span class="tok-str">"dune serve"</span>
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
        {/* Dark overlay with SVG mask — the text shape cuts transparent holes
            through which the fixed video background shows */}
        <div class="hero-overlay">
          {/* SVG handles the masked overlay natively — avoids Safari's CSS mask bugs */}
          <svg aria-hidden="true" focusable="false" class="hero-mask-svg">
            <defs>
              <mask id="heroTextMask">
                <rect width="100%" height="100%" fill="white" />
                <text x="50%" y="26%" text-anchor="middle"
                      dominant-baseline="middle"
                      class="hero-mask-text" fill="black">Dune</text>
              </mask>
            </defs>
            {/* Dark overlay rect with mask applied — cross-browser including Safari */}
            <rect width="100%" height="100%" fill="rgba(13,17,23,0.7)" mask="url(#heroTextMask)" />
          </svg>
        </div>
        <div class="hero-content">
          <div class="hero-badge">v0.6 · now on JSR</div>
          <h1>The flat-file CMS<br />for <em>Deno</em> and <em>Fresh</em></h1>
          <p class="hero-subtitle">
            Markdown content. TSX themes. Zero database.<br />
            Ships as a singleDeno module — no build pipeline required.
          </p>
          <div class="hero-actions">
            <a href="/docs/getting-started" class="btn btn-primary">Get started →</a>
            <a href="https://github.com/duneorg/dune" class="btn btn-outline" target="_blank" rel="noopener">
              View on GitHub
            </a>
          </div>
          <div class="hero-install">
            <span class="prompt">$</span>
            <code>dune new my-site</code>
            <button class="copy-btn" onclick="navigator.clipboard.writeText('dune new my-site');this.textContent='✓';setTimeout(()=>this.textContent='copy',1500)">copy</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section class="section features">
        <div class="section-inner">
          <div class="section-label" style="color:var(--dark)">What's included</div>
          <h2 class="section-title" style="color:#fff">Markdown served the Fresh way</h2>
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
            Two files to a working site: a deno.json and a site config.
          </p>
          <div class="code-tabs" id="codeTabs">
            <div class="code-tab-bar">
              <button class="active" onclick="showTab('cli')">CLI</button>
              <button onclick="showTab('deno')">deno.json</button>
              <button onclick="showTab('yaml')">config/site.yaml</button>
            </div>
            <div class="code-pane active" id="tab-cli">
              <pre dangerouslySetInnerHTML={{ __html: cliCode }} />
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

      {/* Tab switching + Dune mask alignment */}
      <script dangerouslySetInnerHTML={{
        __html: `
        function showTab(name) {
          document.querySelectorAll('.code-pane').forEach(p => p.classList.remove('active'));
          document.querySelectorAll('.code-tab-bar button').forEach(b => b.classList.remove('active'));
          document.getElementById('tab-' + name).classList.add('active');
          event.currentTarget.classList.add('active');
        }
        document.getElementById('tab-cli').classList.add('active');

        /* Position the SVG mask text in the visual midpoint between
           the badge's bottom edge and the h1's top edge.
           Runs on load and whenever the hero resizes (content wrap, font load, etc.) */
        function alignDuneMask() {
          var hero = document.querySelector('.hero');
          var badge = document.querySelector('.hero-badge');
          var h1El = document.querySelector('.hero h1');
          var maskText = document.querySelector('.hero-mask-text');
          if (!hero || !badge || !h1El || !maskText) return;
          var heroTop = hero.getBoundingClientRect().top;
          var badgeBottom = badge.getBoundingClientRect().bottom - heroTop;
          var h1Top = h1El.getBoundingClientRect().top - heroTop;
          maskText.setAttribute('y', String((badgeBottom + h1Top) / 2));
        }

        alignDuneMask();
        var ro = new ResizeObserver(alignDuneMask);
        ro.observe(document.querySelector('.hero'));
      `}} />
    </Layout>
  );
}
