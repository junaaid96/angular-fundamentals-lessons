# 08-routing-recap

In this activity, you'll learn

- how to leverage the RouterLink directive to make the most use of Angular Router.
- how to get paremeters from the dynamic urls

## Run this example

From the command line at the root of the project:

```bash
ng serve 08-routing-recap
```

## Instructions

### Define Routes & add `<router-outlet />`

1. In `app.routes.ts`, define a route for `HomeComponent` as the default route.

1. Define routes for `DetailsComponent`, add a URL parameter to the path for `DetailComponent` called `id` -

   ```
   /details/:id
   ```

1. In `app.component.ts`, add the `<router-outlet />` to component template.

### Update components

1. In `app.component.ts`, dynamically generate a list of links for products in `productTitles`.

   - Generate a link and use the `routerLink` attribute.

   - Use the index of the `productTitles` element

   _Hint, you can access ` $index`` in the context of the  `@for` [@for documentation](https://angular.dev/api/core/@for)_

1. In, `details.component.ts`, create a property called `productId` of type `number`.

1. In `app.config.ts`, enable route-param-to-input binding: `provideRouter(routes, withComponentInputBinding())`.

1. In the details component define a signal input called `id` (it receives the `:id` route parameter) and derive the product from it:

   ```typescript
   readonly id = input.required<string>();
   readonly product = computed(() => this.productList[Number(this.id())]);
   ```

1. Update the `DetailsComponent` template to reference the product from the product list that at the indeces for `productId`.

1. Save your changes.

1. Confirm that you can now route between products in the browser.

## Concept guide: Route params & links

`routerLink="/details/{{ $index }}"` navigates without reloads; `{ path: 'details/:id', component: DetailsComponent }` declares a param; `withComponentInputBinding()` passes params straight into signal inputs.

**Tip:** Use `routerLinkActive` to style the current link.

**Check your work:** `ng build 08-routing-recap` and `ng test 08-routing-recap --watch=false` (Vitest smoke test in `src/app/app.component.spec.ts`).
