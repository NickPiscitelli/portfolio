This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), deployed as a static export to [Cloudflare Pages](https://pages.cloudflare.com/).

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Building

```bash
npm run build
```

This runs `next build && next export`, producing a static site in `out/`.

## Deploy to Cloudflare Pages

### One-time setup

1. Install Wrangler (already in `devDependencies`): `npm install`
2. Log in: `npx wrangler login`
3. Create the Pages project (first deploy will prompt to create it, or run): `npx wrangler pages project create nickpiscitellicom --production-branch=main`

### Deploying

From your machine:

```bash
npm run deploy
```

To preview the built site locally on the Pages runtime:

```bash
npm run preview
```

### CI deploys

`.github/workflows/nextjs.yml` deploys on every push to `main`. Set these GitHub secrets:

- `CLOUDFLARE_API_TOKEN` — a token with the **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID

### Custom domain

`CNAME` (`nickpiscitelli.com`) is bound to the Pages project via **Pages → nickpiscitellicom → Custom domains** in the Cloudflare dashboard.
