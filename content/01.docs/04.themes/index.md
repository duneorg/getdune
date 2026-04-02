---
title: Themes
description: Build and customise themes using Preact TSX components.
template: docs
---

## Theme structure

A theme is a directory under `themes/`:

```
themes/
└── my-theme/
    ├── theme.yaml          # metadata
    ├── components/
    │   └── layout.tsx      # shared layout wrapper
    ├── templates/
    │   ├── default.tsx     # used when no template is specified
    │   ├── home.tsx        # used for template: home
    │   └── blog.tsx        # used for template: blog
    ├── locales/
    │   ├── en.yaml         # translation strings
    │   └── de.yaml
    └── static/
        ├── style.css
        └── logo.svg        # served at /themes/my-theme/static/logo.svg
```

### theme.yaml

```yaml
name: my-theme
description: My custom Dune theme
version: "1.0.0"
parent: starter           # optional: inherit templates from parent
```

## Templates

Templates are Preact components. They receive these props:

| Prop | Type | Description |
|------|------|-------------|
| `page` | `Page` | Current page (frontmatter, route, content) |
| `pageTitle` | `string` | Resolved `<title>` string |
| `site` | `SiteConfig` | site.yaml contents |
| `config` | `DuneConfig` | Full config including theme settings |
| `nav` | `NavItem[]` | Top-level navigation items |
| `pathname` | `string` | Request pathname |
| `children` | `JSX.Element` | Rendered markdown as HTML |
| `t` | `(key: string) => string` | i18n translation function |

```tsx
/** @jsxImportSource preact */
import { h } from "preact";

export default function BlogTemplate({ page, site, nav, children }: any) {
  return (
    <html lang="en">
      <head>
        <title>{page.frontmatter.title} — {site.title}</title>
        <link rel="stylesheet" href="/themes/my-theme/static/style.css" />
      </head>
      <body>
        <nav>
          {nav.map((item: any) => (
            <a key={item.route} href={item.route}>{item.navTitle ?? item.title}</a>
          ))}
        </nav>
        <main>
          <h1>{page.frontmatter.title}</h1>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
```

## Theme inheritance

Set `parent` in `theme.yaml` to inherit templates from another theme:

```yaml
name: my-theme
parent: starter
```

Dune resolves templates from your theme first, then falls back to the parent.
Override only the templates you need to change.

## Static assets

Files in `themes/my-theme/static/` are served under
`/themes/my-theme/static/`. Reference them with absolute paths in your TSX.

## Custom theme values

Pass arbitrary values in `config/site.yaml`:

```yaml
theme:
  name: my-theme
  custom:
    primaryColor: "#C9943A"
    heroImage: "/static/hero.jpg"
```

Access them in templates via `config.theme.custom`:

```tsx
const accent = config?.theme?.custom?.primaryColor ?? "#000";
```

## i18n in themes

Create locale files in `themes/my-theme/locales/`:

```yaml
# locales/en.yaml
nav.home: Home
nav.about: About
footer.copyright: "© {year} {author}"
```

Use the `t` prop to look up translations:

```tsx
<footer><p>{t("footer.copyright").replace("{year}", String(new Date().getFullYear()))}</p></footer>
```
