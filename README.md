This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Goals

Create a spoiler-free site to use information about games that have already completed to evaluate how "watchable" they are.  This is not intended to be _predictive_ of how watchable a game will be, but rather to evaluate how watchable it _was_ and show a number that you can use to decide whether to watch an arleady-recorded game without giving away the winner or how they won.

Intended sources: 
- <https://github.com/pseudo-r/Public-ESPN-API>

Intended criteria:
 - Win probability over time
   - average of losing team's WP
   - total of absolute value of all changes in WP
   - initial WP of eventual loser

Side goals:
- Learn more about how next 15's caching stuff works and how I can use it for custom stuff (ie. caching calls for already-complete games).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
