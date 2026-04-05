---
title: Deployment
description: Run Dune in production on a VPS, Deno Deploy, or behind a reverse proxy.
template: docs
---

## VPS / Linux server

The simplest production setup. Run Dune with systemd:

### 1. Transfer your site

```bash
rsync -av --exclude '.git' ./my-site/ user@server:/home/user/my-site/
```

### 2. Install the CLI on the server

```bash
deno install -A -n dune jsr:@dune/core/cli
```

### 3. Create a systemd service

`/etc/systemd/system/my-site.service`:

```ini
[Unit]
Description=My Dune site
After=network.target

[Service]
Type=simple
User=user
WorkingDirectory=/home/user/my-site
Environment=PORT=8080
Environment=DUNE_ENV=production
ExecStart=/home/user/.deno/bin/dune serve --root /home/user/my-site --port 8080
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now my-site
```

### 4. Reverse proxy with nginx

```nginx
server {
    listen 443 ssl;
    server_name mysite.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Static site (Netlify, Cloudflare Pages, S3…)

Generate a fully static site and deploy anywhere:

```bash
dune build --static --base-url https://example.com
netlify deploy --dir=dist --prod
```

## Deno Deploy

Sync your content to Deno KV, then deploy via GitHub integration or `deployctl`:

```bash
dune sync
deployctl deploy --project=my-site src/main.ts
```

## Docker

```dockerfile
FROM denoland/deno:2.0

WORKDIR /app
COPY . .
RUN deno install -A -n dune jsr:@dune/core/cli

ENV PORT=8080
ENV DUNE_ENV=production
EXPOSE 8080

CMD ["dune", "serve", "--root", "/app", "--port", "8080"]
```

```bash
docker build -t my-site .
docker run -p 8080:8080 my-site
```

## Production checklist

- Set `DUNE_ENV=production` — enables secure cookies for the admin panel
- Set a strong `auth.password` in `config/site.yaml`
- Use a reverse proxy (nginx / Caddy) for TLS termination
- Point `--root` to the absolute path of your site directory
