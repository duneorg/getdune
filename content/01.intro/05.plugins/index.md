---
title: Plugins
description: Extend Dune with hooks for rendering, routing, and content.
template: docs
---

## Installing a plugin

Add the plugin to your `deno.json` import map:

```json
{
  "imports": {
    "@dune/core": "jsr:@dune/core@^0.6",
    "@my-org/my-dune-plugin": "jsr:@my-org/my-dune-plugin@^1.0"
  }
}
```

Then register it in `main.ts`:

```ts
import { createDuneEngine, loadConfig } from "@dune/core";
import myPlugin from "@my-org/my-dune-plugin";

const config = await loadConfig(ROOT);
const engine = await createDuneEngine({
  rootDir: ROOT,
  config,
  plugins: [myPlugin({ option: "value" })],
});
```

## Plugin API

A plugin is a function that returns a `DunePlugin` object:

```ts
import type { DunePlugin, HookEvent } from "@dune/core";
import { PLUGIN_API_VERSION } from "@dune/core/plugins";

export function myPlugin(options: { option: string } = {}): DunePlugin {
  return {
    name: "my-plugin",
    version: "1.0.0",
    apiVersion: PLUGIN_API_VERSION,

    hooks: {
      // Called after a page is loaded from disk, before rendering
      async "content:loaded"(event: HookEvent) {
        const { page } = event;
        // Mutate page.frontmatter, page.body, etc.
      },

      // Called before a response is sent
      async "response:before"(event: HookEvent) {
        const { response } = event;
        // Add headers, transform body, etc.
      },
    },
  };
}
```

## Available hooks

| Hook | When | Payload |
|------|------|---------|
| `content:loaded` | After a page is read from disk | `{ page }` |
| `content:rendered` | After markdown → HTML conversion | `{ page, html }` |
| `response:before` | Before the HTTP response is sent | `{ request, response }` |
| `route:resolve` | During URL → page resolution | `{ request, route }` |

## Publishing a plugin to JSR

1. Create a new Deno project
2. Implement the plugin following the API above
3. Add `@dune/core` as a peer dependency in `deno.json`
4. Publish with `deno publish`

Include **`dune-plugin`** in your package description so it appears in the
[Dune plugin library](/plugins).

```json
{
  "name": "@my-org/my-dune-plugin",
  "version": "1.0.0",
  "description": "A dune-plugin that does something useful",
  "exports": "./mod.ts"
}
```

> **Tip:** Check the `PLUGIN_API_VERSION` constant on install and warn if it
> doesn't match the version your plugin was built against.
