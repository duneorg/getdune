/** @jsxImportSource preact */
import { h } from "preact";

export default function Layout({ children, site, config, nav, page, pageTitle, pathname }: any) {
  const themeName = config?.theme?.name ?? "getdune";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const pageRoute = page?.route ?? "/";
  const canonicalPath = pathname ?? pageRoute;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const pageDescription = page?.frontmatter?.description
    ?? page?.frontmatter?.descriptor
    ?? site?.description
    ?? "";
  const resolvedTitle = pageTitle
    ? (pageRoute === "/" ? pageTitle : `${pageTitle} — Dune`)
    : (site?.title ?? "Dune");

  const isDocsPage = canonicalPath.startsWith("/docs");
  const isPluginsPage = canonicalPath.startsWith("/plugins");
  const isThemesPage = canonicalPath.startsWith("/themes");

  // Docs section nav
  const docsSections = [
    { href: "/docs", label: "Overview" },
    { href: "/docs/getting-started", label: "Getting Started" },
    { href: "/docs/configuration", label: "Configuration" },
    { href: "/docs/content", label: "Content" },
    { href: "/docs/themes", label: "Themes" },
    { href: "/docs/plugins", label: "Plugins" },
    { href: "/docs/deployment", label: "Deployment" },
  ];

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{resolvedTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href={`/themes/${themeName}/static/favicon.svg`} type="image/svg+xml" />
        <meta property="og:title" content={resolvedTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
      </head>
      <body class={isDocsPage ? "layout-docs" : "layout-page"}>
        <video class="page-video-bg" autoplay muted loop playsinline>
          <source src="/themes/getdune/static/dune-hd.webm" type="video/webm" />
          <source src="/themes/getdune/static/dune-hd.mp4" type="video/mp4" />
        </video>
        <header class="site-header">
          <div class="header-inner">
            <a href="/" class="wordmark" aria-label="Dune home">
              <svg width="80" height="24" viewBox="0 0 80 24" fill="none" aria-hidden="true">
                <text x="0" y="19" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
                  font-size="20" font-weight="700" fill="#C9943A" letter-spacing="-0.5">Dune</text>
              </svg>
            </a>
            <nav class="header-nav" aria-label="Site navigation">
              <a href="/docs" class={isDocsPage ? "active" : ""}>Docs</a>
              <a href="/plugins" class={isPluginsPage ? "active" : ""}>Plugins</a>
              <a href="/themes" class={isThemesPage ? "active" : ""}>Themes</a>
              <a href="https://jsr.io/@dune/core" class="nav-external" target="_blank" rel="noopener">
                JSR
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" style="margin-left:3px;opacity:0.6">
                  <path d="M3.5 3a.5.5 0 0 0 0 1H7.3L2.15 9.15a.5.5 0 1 0 .7.7L8 4.7V8.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5h-5z" />
                </svg>
              </a>
              <a href="https://github.com/duneorg/dune" class="nav-external" target="_blank" rel="noopener">
                GitHub
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" style="margin-left:3px;opacity:0.6">
                  <path d="M3.5 3a.5.5 0 0 0 0 1H7.3L2.15 9.15a.5.5 0 1 0 .7.7L8 4.7V8.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5h-5z" />
                </svg>
              </a>
            </nav>
          </div>
        </header>

        {isDocsPage ? (
          <div class="docs-layout">
            <aside class="docs-sidebar">
              <nav aria-label="Documentation">
                {docsSections.map((s) => {
                  const active = canonicalPath === s.href ||
                    (s.href !== "/docs" && canonicalPath.startsWith(s.href));
                  return (
                    <a key={s.href} href={s.href} class={active ? "active" : ""}>
                      {s.label}
                    </a>
                  );
                })}
              </nav>
            </aside>
            <main class="docs-content">
              {children}
            </main>
          </div>
        ) : (
          <main>
            {children}
          </main>
        )}

        <footer class="site-footer">
          <div class="footer-inner">
            <div class="footer-brand">
              <span class="footer-wordmark">Dune</span>
              <span class="footer-tagline">The flat-file CMS for Deno and Fresh</span>
            </div>
            <nav class="footer-nav" aria-label="Footer navigation">
              <a href="/docs">Docs</a>
              <a href="/plugins">Plugins</a>
              <a href="/themes">Themes</a>
              <a href="https://jsr.io/@dune/core" target="_blank" rel="noopener">JSR</a>
              <a href="https://github.com/duneorg/dune" target="_blank" rel="noopener">GitHub</a>
            </nav>
            <p class="footer-copy">
              &copy; {new Date().getFullYear()} <a href="https://zumbrunn.com" target="_blank" rel="noopener">zumbrunn</a> — MIT licensed
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
