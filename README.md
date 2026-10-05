# monamoureuse

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_pnJuZZSFxCNWGQE2w4TsA8xHuBRo)

## Public site

The site is published with GitHub Pages at [blindvrong.github.io/monamoureuse](https://blindvrong.github.io/monamoureuse/). Changes pushed to `main` are built and deployed automatically by the `Deploy to GitHub Pages` workflow.

## E-mail alerts when a letter is read

The alert service runs as a Cloudflare Worker and sends mail through Web3Forms, so it does not require owning a domain. The Web3Forms access key is stored only as a Worker secret; never add it to the site or this repository.

1. Create a Web3Forms access key at [web3forms.com](https://web3forms.com/) using the e-mail address where you want to receive alerts. Retrieve the key from the e-mail they send you.
2. From `notification-worker/`, run `npx wrangler login`, then set the Worker secret:

   ```sh
   npx wrangler secret put WEB3FORMS_ACCESS_KEY
   ```

   Enter the Web3Forms access key when prompted. The key is linked to the recipient address used to create it.
3. Deploy the Worker:

   ```sh
   npx wrangler deploy
   ```

4. In the repository's GitHub settings, add the Actions repository variable `LETTER_NOTIFICATION_URL` with the deployed Worker URL. The Pages workflow embeds this public endpoint URL at build time; it is not a secret.
5. Push or manually run the Pages workflow to rebuild the site with the alert endpoint.

The Worker only accepts requests from this site's origin and rate-limits requests by client IP. On each “Lettre suivante” click it emails the number and title of the letter just completed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
