---
title: Content
description: Markdown files, frontmatter, and how Dune routes content.
template: docs
---

## File structure

Content lives in the `content/` directory. Each markdown file becomes a page:

```
content/
├── index.md           → /
├── 01.about.md        → /about
├── 02.blog/
│   ├── index.md       → /blog
│   ├── 01.hello.md   → /blog/hello
│   └── 02.world.md   → /blog/world
└── 03.contact.md      → /contact
```

### Ordering prefix

The numeric prefix (`01.`, `02.`, …) controls:
- Navigation order
- Sort order within a section

The prefix is stripped from URLs. `01.about.md` → `/about`.

### Directories as sections

A directory with an `index.md` becomes a navigable section. Without
`index.md`, requests to the directory URL return 404.

## Frontmatter

Every page can have a YAML frontmatter block at the top:

```markdown
---
title: My Page
description: Used in meta tags and social cards.
template: blog        # which template to use (default: "default")
navTitle: Blog        # shorter title for nav links
date: 2025-01-15
---

Page content starts here.
```

### Common frontmatter fields

| Field | Description |
|-------|-------------|
| `title` | Page title — shown in `<title>` |
| `description` | Meta description and OG description |
| `template` | Template name from `themes/{name}/templates/` |
| `navTitle` | Shorter label for navigation items |
| `date` | ISO date string — available in templates as `page.frontmatter.date` |
| `heading` | Override the rendered `<h1>` (title is still used for nav/meta) |

You can add any custom fields — they're all accessible in templates via
`page.frontmatter.*`.

## TSX pages

Drop a `.tsx` file into `content/` and Dune renders it as a Preact component:

```tsx
/** @jsxImportSource preact */
import { h } from "preact";

export default function CustomPage({ page, site, nav, pathname }: any) {
  return (
    <html>
      <head><title>Custom</title></head>
      <body><h1>Hello from TSX</h1></body>
    </html>
  );
}
```

TSX pages bypass the theme template system — the component is the full page.
This is useful for API routes or highly custom pages.

## Images

Place images anywhere in `content/` or in `static/` at the root. Reference
them with absolute paths:

```markdown
![Alt text](/images/photo.jpg)
```

Dune serves anything in `static/` (and theme `static/` directories) as-is.
Images placed inside `content/` alongside their pages are also served
directly.

## Draft pages

Set `draft: true` in frontmatter to exclude a page from navigation and
render a 404 in production:

```yaml
---
title: Work in Progress
draft: true
---
```

In dev mode, draft pages are still accessible.
