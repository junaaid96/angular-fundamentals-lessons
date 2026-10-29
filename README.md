# Angular Fundamentals Lessons

Hands-on lesson workspace for learning modern Angular, upgraded to **Angular 22** (standalone components, signals, zoneless change detection, built-in control flow, esbuild/Vite tooling and Vitest).

> Learning code based on the Frontend Masters course [Angular Fundamentals](https://frontendmasters.com/courses/angular-fundamentals/) by Mark Thompson. The lesson exercises and instructions come from that course material; this repo contains my coursework plus an upgrade to the latest Angular and extra concept notes.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) 22.12+ or 24 LTS (recommended)
- npm 10+
- [VS Code](https://code.visualstudio.com/) with the [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) extension (optional)

## Getting started

```bash
git clone https://github.com/junaaid96/angular-fundamentals-lessons.git
cd angular-fundamentals-lessons
npm install
npx ng serve 01-hello-angular   # open http://localhost:4200
```

Every lesson is its own Angular application in `projects/<lesson>`:

| Command | What it does |
| --- | --- |
| `npx ng serve <lesson>` | Run a lesson with live reload |
| `npx ng build <lesson>` | Production build to `dist/<lesson>` |
| `npx ng test <lesson> --watch=false` | Run the lesson's Vitest tests |
| `npm run build:all` | Build every lesson |
| `npm run test:all` | Test every lesson |

## Learning path

Work through the lessons in order. Each lesson README has the exercise steps and a short concept guide.

| # | Lesson | Concept |
| --- | --- | --- |
| 00 | [00-basic-app](projects/00-basic-app) | Workspace & bootstrapping |
| 01 | [01-hello-angular](projects/01-hello-angular) | Templates & component styles |
| 02 | [02-displaying-dynamic-data](projects/02-displaying-dynamic-data) | Interpolation & property binding |
| 03 | [03-component-composition](projects/03-component-composition) | Component composition |
| 04 | [04-control-flow-if](projects/04-control-flow-if) | Built-in control flow: @if |
| 05 | [05-control-flow-for](projects/05-control-flow-for) | Built-in control flow: @for |
| 06 | [06-input-output](projects/06-input-output) | Signal inputs & outputs |
| 07 | [07-routing-basics](projects/07-routing-basics) | Routing basics |
| 08 | [08-routing-recap](projects/08-routing-recap) | Route params & links |
| 09 | [09-template-driven-forms](projects/09-template-driven-forms) | Template-driven forms |
| 10 | [10-reactive-forms](projects/10-reactive-forms) | Reactive forms |
| 11 | [11-dependency-injection](projects/11-dependency-injection) | Dependency injection |
| 12 | [12-angular-signals](projects/12-angular-signals) | Signals |
| 13 | [13-deferrable-views](projects/13-deferrable-views) | Deferrable views |

## Stack

| Tool | Version |
| --- | --- |
| Angular (core, router, forms) | 22.2 |
| Angular CLI / `@angular/build` | 22.2 (esbuild + Vite dev server) |
| TypeScript | 6.0 |
| Test runner | Vitest 5 + jsdom |
| Change detection | Zoneless (`provideZonelessChangeDetection`, no zone.js) |

## What changed in the Angular 22 upgrade

- Angular 17 → 22; `@angular-devkit/build-angular` replaced by `@angular/build`.
- Karma/Jasmine replaced by the CLI's Vitest runner, with a smoke test in every lesson.
- zone.js removed; apps are zoneless and use signals where state changes asynchronously.
- `standalone: true` and unused `CommonModule` imports removed (standalone is the default).
- Signal `input()` / `output()` instead of `@Input` / `@Output` decorators.
- TypeScript 6 config with `"module": "preserve"` (bundler-style resolution).

## Helpful links

- [angular.dev](https://angular.dev) docs and [playground](https://angular.dev/playground)
- [Course slides](https://goo.gle/fem-slides) · [Original course code](https://goo.gle/fem-code)

## License

[MIT](LICENSE)
