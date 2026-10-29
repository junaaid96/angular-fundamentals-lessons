// Lesson 05-control-flow-for: Built-in control flow: @for
// Starter code for the exercise in ../../README.md; follow the steps there to complete it.
import { Component } from '@angular/core';
import { carList } from '../data/car-list';

@Component({
  selector: 'app-root',
  template: `
    <section class="container">
      <!-- This article element represents and entire listing -->
      @for (car of carList; track car.id) {
      <article class="listing">
        <div class="image-parent">
          <img class="product-image" src="https://placehold.co/100x100" />
        </div>
        <section class="details">
          <p class="title">{{ car.make }}</p>
          <hr />
          <p class="detail">
            <span>Year</span>
            <span>{{ car.year }}</span>
          </p>
          <div class="detail">
            <span>Transmission</span>
            <span>{{ car.transmission }}</span>
          </div>
          <p class="detail">
            <span>Mileage</span>
            <span>{{ car.miles }}</span>
          </p>
          <p class="detail">
            <span>Price</span>
            <span>{{ car.price }}</span>
          </p>
        </section>
      </article>
      }@empty {
      <p>There are no cars to display</p>
      }
    </section>
  `,
  styleUrl: 'app.component.css',
})
export class AppComponent {
  carList = carList;
}
