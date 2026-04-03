---
title: Configuration
description: Site config, deno.json setup, and environment variables.
template: docs
---

## config/site.yaml

The main configuration file for your site:

```yaml
title: My Site
description: A short description for SEO and social cards.
url: https://mysite.com

# Auth for the admin panel (optional)
auth:
  username: admin
  password: changeme

# Active theme
theme:
  name: starter
  # Optional: custom values passed to the theme as config.theme.custom
  custom:
    accent: "#C9943A"

# Taxonomy fields used across your content
taxonomies:
  - tag
  - category

# i18n (optional)
system:
  languages:
    default: en
    supported: [en, de, fr]
    include_default_in_url: false
```

### Required fields

| Field | Description |
|-------|-------------|
| `title` | Site name — shown in `<title>` and the nav |
| `url` | Canonical base URL (no trailing slash) |

### Optional fields

| Field | Default | Description |
|-------|---------|-------------|
| `description` | — | Used in `<meta name="description">` |
| `theme.name` | `"starter"` | Directory name under `themes/` |
| `auth.username` | — | Admin panel login |
| `auth.password` | — | Admin panel password |

## deno.json

```json
{
  "imports": {
    "preact": "npm:preact@^10",
    "preact/": "npm:preact@^10/",
    "preact/jsx-runtime": "npm:preact@^10/jsx-runtime",
    "preact-render-to-string": "npm:preact-render-to-string@^6",
    "@dune/core": "jsr:@dune/core@^0.6"
  },
  "tasks": {
    "dev": "dune dev",
    "serve": "dune serve"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

The import map is essential: theme TSX files import `preact` and
`preact/jsx-runtime` by name, so Deno needs these mapped to a concrete
version. The `--config` flag (or `deno task`) ensures Dune picks up the
site's import map when dynamically importing theme files.

## Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default: `8080`) |
| `DUNE_ENV` | `production` to enable secure cookies |
| `DUNE_DEBUG` | `1` for verbose logging |

## main.ts

The minimal entry point:

```ts
import { createDuneEngine, loadConfig } from "@dune/core";

const ROOT = new URL(".", import.meta.url).pathname.replace(/\/$/, "");
const PORT = parseInt(Deno.env.get("PORT") ?? "8080");

const config = await loadConfig(ROOT);
const engine = await createDuneEngine({ rootDir: ROOT, config });

Deno.serve({ port: PORT }, (req) => engine.handle(req));
```

Pass `dev: true` to enable hot-reload and disable secure-cookie enforcement:

```ts
const isDev = Deno.args.includes("dev");
const engine = await createDuneEngine({ rootDir: ROOT, config, dev: isDev });
```
