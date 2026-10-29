# 02-displaying-dynamic-data

In this example, you'll display dynamic data to the user with the power of [interpolation in Angular](https://angular.dev/guide/templates/interpolation).

## Run this example

From the command line at the root of the project:

```bash
ng serve 02-displaying-dynamic-data
```

## Instructions

1. In `app.component.ts`, update the `template` property to use interoplation to display real values from the `item` property defined in the component class.

2. Save your changes.

3. Stop any previous applications that may be running. Use the following command to display your application in the browser.

   ```bash
   ng serve 02-displaying-dynamic-data
   ```

4. Confirm that the `item` data is propertly being displayed in the browser window.

## Concept guide: Interpolation & property binding

`{{ value }}` renders class fields as text. `[src]="url"` binds a DOM property to an expression; `(click)="handler()"` listens to events.

**Tip:** Prefer `protected` fields for template-only state, and signals (`signal()`) for state that changes.

**Check your work:** `ng build 02-displaying-dynamic-data` and `ng test 02-displaying-dynamic-data --watch=false` (Vitest smoke test in `src/app/app.component.spec.ts`).
