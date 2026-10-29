# 01-hello-angular

Time to get some experience updating component templates and component styles.

## Run this example

From the command line at the root of the project:

```bash
ng serve 01-hello-angular
```

## Instructions

1. In `01-hello-angular/src/app.component.ts`, update the code as follows:

   1. Create an ordered list with your 3 of your favorite books, movies, or songs.

   2. In the same file, update the styles so that the list uses Roman numerals. Here's the css

   ```css
   list-style-type: upper-roman;
   ```

2. Save your changes.

3. Make sure your app is running (`ng serve 01-hello-angular`) and confirm the output in the browser.

Hints: use back tick characters for multi-line strings.

## Concept guide: Templates & component styles

Inline `template` and `styles` live in the component file. Styles are scoped to the component by default (emulated view encapsulation).

**Tip:** Use backticks for multi-line templates; `:host` targets the component element itself.

**Check your work:** `ng build 01-hello-angular` and `ng test 01-hello-angular --watch=false` (Vitest smoke test in `src/app/app.component.spec.ts`).
