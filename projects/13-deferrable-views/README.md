# 13-deferrable-views

Deferrable views can be used in component template to defer the loading of select dependencies within that template. Those dependencies include components, directives, and pipes, and any associated CSS. To use this feature, you can declaratively wrap a section of your template in a @defer block which specifies the loading conditions.

## Run this example

From the command line at the root of the project:

```bash
ng serve 13-deferrable-views
```

## Instructions

1. Add a `@defer` block that defers the loading of the `<app-posts />` component.
1. Try out other triggers:

   - `on idle`
   - `on immediate`
   - `on timer(...)`
   - `on viewport(...)`
   - `on interaction(...)`
   - `on hover(...)`

1. Implement other blocks:
   - `@placeholder`, also try `(minimum 500ms)`
   - `@loading`, also try `(after 500ms; minimum 1s)`
   - `@error`
1. Save your changes.
1. Confirm the updates in the browser.

## Concept guide: Deferrable views

Wrap content in `@defer (on interaction(loadPosts)) { <app-posts /> } @placeholder { ... } @loading { ... }` to lazy-load a component's code only when needed.

**Tip:** Triggers include `on viewport`, `on idle`, `on timer(2s)`, `on hover` and `when cond`; `prefetch on idle` downloads early.

**Check your work:** `ng build 13-deferrable-views` and `ng test 13-deferrable-views --watch=false` (Vitest smoke test in `src/app/app.component.spec.ts`).
