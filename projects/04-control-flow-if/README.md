Deciding what to display on the screen for a user is a common task in application development. Many times, the decision is made programmatically using conditions.

To express conditional displays in templates, Angular uses the @if template syntax.

In this activity you'll learn how to use conditionals in templates.

## Run this example

From the command line at the root of the project:

```bash
ng serve 04-control-flow-if
```

# Instructions

1. Add the user information to the credit card using the `Account Info` class.

1. Update `app.component.ts` template to conditionally display the correct badge representing the credit card using the `membershipStatus` property.

1. Save your changes.

1. Confirm that your changes are correctly updated in the browser

(BONUS) there may be a better way to write this conditionally? Which control flow command would you use for this?

## Concept guide: Built-in control flow: @if

`@if (cond) { ... } @else if (other) { ... } @else { ... }` replaces `*ngIf` and needs no imports.

**Tip:** Use `@if (user(); as u)` to alias a value; `@switch` is cleaner when matching one value against many cases.

**Check your work:** `ng build 04-control-flow-if` and `ng test 04-control-flow-if --watch=false` (Vitest smoke test in `src/app/app.component.spec.ts`).
