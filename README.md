# Portfolio

Source for [johannehesse.dev](https://johannehesse.dev), Johanne Hesse's personal site. It covers background, experience, featured projects, a resume viewer, and contact details. It also hosts a browser-only demo of the Metadata Privacy Scanner at `/metadata-scanner`.

## Stack

- React 18 and TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI primitives and lucide-react icons
- esbuild for bundling (`scripts/build.js`)
- Express for the local server (`server.js`)

Requires Node.js 18 or later.

## Local development

```bash
npm ci
npm start
```

The site runs at http://localhost:4000. `npm run dev` runs the same server under nodemon, which restarts it on file changes.

## Build

```bash
npm run build
```

The build writes `public/main.js`, `public/main.js.map`, and `public/styles.css`. These files are tracked, so commit them after changing source files.

## Project structure

```text
src/components/  Page sections and UI components
src/data/        Project and organization content
src/lib/         Shared utilities
src/pages/       Metadata Privacy Scanner demo page
public/          Static assets and built output
scripts/         Build scripts
```

## Deployment

Deployed on Vercel. `vercel.json` builds the site with `@vercel/static-build` and serves `public/`.
