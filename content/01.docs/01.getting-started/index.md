---
title: Getting Started
description: Scaffold a new Dune site and have it running in under five minutes.
template: docs
---

## Requirements

- [Deno](https://deno.com) 1.40+

Install Deno if you haven't already:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

## Create a new site

Use the Dune CLI to scaffold a new site:

```bash
deno run -A jsr:@dune/core/cli new my-site
cd my-site
```

This creates:

```
my-site/
├── deno.json          # import map + compiler options
├── main.ts            # entry point
├── config/
│   └── site.yaml      # site title, theme, URL
├── content/
│   └── index.md       # your first page
└── themes/
    └── starter/       # starter theme (Preact TSX)
```

## Start the dev server

```bash
deno task dev
```

Open [http://localhost:8080](http://localhost:8080). Changes to content are
picked up on the next request — no restart required. Template changes require
a restart (Deno caches compiled TSX).

## Your first page

Open `content/index.md`:

```markdown
---
title: Hello, Dune
---

Welcome to my site!
```

The frontmatter key `title` becomes the page title. Any markdown below the
`---` is rendered as HTML and passed to your theme's `default` template.

## Add another page

Create `content/01.about.md`:

```markdown
---
title: About
---

This site is built with Dune.
```

The `01.` prefix controls the navigation order. Dune strips these prefixes
from the URL — the page will be served at `/about`.

## Next steps

- [Configure your site](/docs/configuration)
- [Learn about content structure](/docs/content)
- [Customise or create a theme](/docs/themes)
