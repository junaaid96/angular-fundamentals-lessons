# 06-input-output (and recap)

Sometimes app development requires you to send data into a component. This data can be used to customize a component or perhaps send information from a parent component to a child component.

Angular uses a concept called Input. This is similar to props in other frameworks. To create an input, use the `input()` / `input.required()` function (signal inputs, the modern replacement for the `@Input` decorator).

When working with components it may be required to notify other components that something has happened. Perhaps a button has been clicked, an item has been added/removed from a list or some other important update has occured. In this scenario components need to communicate with parent components.

Angular uses the `output()` function (the modern replacement for `@Output` + `EventEmitter`) to enable this type of behavior.

In this activity you'll learn:

- how to use `input()` to send information to components.
- how to use `output()` to communicate with parent components.
- you may have to use multiple features of Angular that you have learned so far to complete this task.

## Run this example

From the command line at the root of the project:

```bash
ng serve 06-input-output
```

## Instructions

### Use the inputs feature to refactor the code

1. Move the listing component template structure to the `ListingComponent` template in `listing.component.ts`.

1. Add a required signal input called `car` of type `Car` to `ListingComponent`: `readonly car = input.required<Car>();` (the starter already includes it). Read it in the template as `car()`.

   _Note, don't forget to import `input` from `@angular/core`._

1. In `app.component.ts`, add a reference to the `ListingComponent` component via the selector, replacing the previous content that was moved to the `ListingComponent` template.

   _Note, be sure to add `ListingComponent` to the component `imports` array._

1. Next, iterate over the `carList` property of `AppComponent` with `@for` and pass in the refence `car` to the `input`.

   _Hint: Don't forget your brackets._

### Use outputs to add more interactivity

1. In `listing.component.ts` add a button to the `ListingComponent` with the label `Save`. This button will be used to save a car to a `savedCarList`` in the application.

1. Next, create an output called `carSaved` that emits a `Car`: `readonly carSaved = output<Car>();`

1. Add a `click` event handler to the `<button>Save</button>` element in the `ListingComponent` template assign it the value `handleCarSaved()`.

1. Implement the `handleCarSaved` method in the body of the `ListingComponent` and call `this.carSaved.emit(this.car())`.

1. In the template of `AppComponent` bind to the `carSaved` output from `ListingComponent`. Assign it the value `addCarToSaved($event)`.

1. In the body of `AppComponent` implement `addCarToSaved()` by adding the car to the `savedCarList` (of type `Car[]`) property of `AppComponent`. _Tip: with zoneless change detection, a signal such as `savedCarList = signal<Car[]>([])` updated via `.update(list => [...list, car])` is the most robust choice._

### Check the output

1. Save your changes.
1. Confirm the changes in the browser.

## Concept guide: Signal inputs & outputs

`input()`/`input.required()` receive data from a parent (read as `car()`); `output()` emits events upward (`carSaved.emit(car)`). The parent binds with `[car]="c"` and `(carSaved)="add($event)"`.

**Tip:** `model()` gives two-way binding (`[(value)]`) when a child must write back to the parent.

**Check your work:** `ng build 06-input-output` and `ng test 06-input-output --watch=false` (Vitest smoke test in `src/app/app.component.spec.ts`).
