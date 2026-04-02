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

### 2. Create a systemd service

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
ExecStart=/home/user/.deno/bin/deno run -A \
  --config=/home/user/my-site/deno.json \
  jsr:@dune/core/cli serve \
  --root /home/user/my-site \
  --port 8080
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now my-site
```

### 3. Reverse proxy with nginx

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

## Deno Deploy

Deno Deploy runs Deno natively — but it doesn't support the local filesystem.
Dune's file-based content system doesn't work directly on Deploy without
mounting external storage. This is on the roadmap.

For now, use a VPS or container for production Dune deployments.

## Docker

```dockerfile
FROM denoland/deno:2.0

WORKDIR /app
COPY . .
RUN deno cache --config=deno.json main.ts

ENV PORT=8080
ENV DUNE_ENV=production
EXPOSE 8080

CMD ["run", "-A", "--config=/app/deno.json", "main.ts", "serve"]
```

```bash
docker build -t my-site .
docker run -p 8080:8080 my-site
```

## Production checklist

- Set `DUNE_ENV=production` — enables secure cookies for the admin panel
- Set a strong `auth.password` in `config/site.yaml`
- Use a reverse proxy (nginx / Caddy) for TLS termination
- Point the `--root` flag to the absolute path of your site directory
- Include `--config=/path/to/deno.json` so theme imports resolve correctly
