This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Goals

Create a spoiler-free site to use information about games that have already completed to evaluate how "watchable" they are.  This is not intended to be _predictive_ of how watchable a game will be, but rather to evaluate how watchable it _was_ and show a number that you can use to decide whether to watch an already-recorded game without giving away the winner or how they won.

Intended sources: 
- <https://github.com/pseudo-r/Public-ESPN-API>

Intended criteria:
 - Win probability over time
   - average of losing team's WP
   - total of absolute value of all changes in WP (or maybe average?)
   - initial WP of eventual loser
   - max WP of losing team after X% of game remaining
 - Final score doesn't seem like it'd be helpful - WP should be much better and not subject to late-game scoring quirks or the power of possession.

Side goals:
- Learn more about how next 15's caching stuff works and how I can use it for custom stuff (ie. caching calls for already-complete games).
  - <https://nextjs.org/docs/app/api-reference/functions/unstable_cache>
  - ie. can we cache the content and invalidate it if we notice the game's not over yet (via `revalidateTag`), but otherwise keep it cached for a while?
- How much of this can I generate with Cursor?

Plan:
- [ ] Generate services and typings to call the ESPN APIs that look potentially useful
- [ ] Get lists of sports/leagues/events to display
- [ ] Identify complete/incomplete events
- [ ] Load game data via cache
- [ ] Calculate watchability score options
- [ ] Display several approaches to calculate watchability score on a list of games for a day
- [ ] Narrow down which approach works best and use it

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
