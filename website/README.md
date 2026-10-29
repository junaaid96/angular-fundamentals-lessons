# Docs website

VitePress site published at https://junaaid96.github.io/angular-fundamentals-lessons/.

The repo Markdown is the single source: `scripts/sync.mjs` copies the root `README.md` and every `projects/<lesson>/README.md` (plus the lesson's TypeScript and HTML source) into a git-ignored `content/` folder at build time. This folder is not part of the Angular workspace (`angular.json`), so `ng build` and `ng test` ignore it.

```bash
cd website
npm install
npm run dev      # http://localhost:5173/angular-fundamentals-lessons/
npm run build    # output in .vitepress/dist
```

Deployed by `.github/workflows/pages.yml` on every push to `main` that touches the lessons or docs.
