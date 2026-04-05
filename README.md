# getdune.org

The project site for [Dune CMS](https://github.com/duneorg/dune) — built with Dune itself.

## What's in here

- **Home** — hero, feature overview, quick-start code samples
- **Intro** (`/intro`) — 6-page orientation guide for new users
- **Docs** (`/docs`) — full reference documentation, pulled in from [duneorg/dune-docs](https://github.com/duneorg/dune-docs) as a git submodule
- **Plugins** (`/plugins`) — JSR-curated list of community plugins (`dune-plugin` keyword)
- **Themes** (`/themes`) — JSR-curated list of community themes (`dune-theme` keyword)

## Running locally

Requires [Deno](https://deno.land/) 2.x and the Dune CLI.

```bash
# Clone with submodules (includes the docs content)
git clone --recurse-submodules git@github.com:duneorg/getdune.git
cd getdune

# Start the dev server
deno task dev
```

The site runs on [http://localhost:8090](http://localhost:8090) by default.

## Structure

```
getdune/
├── config/
│   └── site.yaml               # Site title, URL, theme
├── content/
│   ├── index.md                # Home page
│   ├── 01.intro/               # Quick-start guide (6 pages)
│   ├── 02.docs/                # Full reference docs (submodule → duneorg/dune-docs)
│   ├── 03.plugins/             # Plugins library page
│   └── 04.themes/              # Themes library page
└── themes/getdune/
    ├── components/layout.tsx   # Shared layout, nav, footer
    ├── templates/              # Page templates (home, docs, plugins-library, themes-library)
    └── static/                 # CSS, video background, favicon
```

## Docs submodule

The `/docs` content lives in a separate repo so both this site and the `dune` repo can share it:

```bash
# Update to latest docs content
git submodule update --remote content/02.docs
git add content/02.docs
git commit -m "Update docs submodule"
```

## License

MIT — © 2026 [zumbrunn](https://zumbrunn.com)
