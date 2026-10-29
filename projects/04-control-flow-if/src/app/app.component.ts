// Lesson 04-control-flow-if: Built-in control flow: @if
// Starter code for the exercise in ../../README.md; follow the steps there to complete it.
import { Component } from '@angular/core';
import { AccountInfo } from './account-info';

@Component({
  selector: 'app-root',
  template: `
    <article class="card">
      <h1 class="card-title">Frontend Masters Express</h1>
      <p class="card-number">1234 2000 3000 4444</p>
      <section class="membership-info">
        <p>
          <!-- name -->
          {{ account.name }}
        </p>
        <p>Valid Thru: {{ account.validThru }}</p>
        <p>CVV: {{ account.CVV }}</p>
        <p>
          <!-- membership status -->
          @if(account.membershipStatus === 'gold') {
          <span class="badge gold">Gold</span>
          } @else if (account.membershipStatus === 'platinum') {
          <span class="badge platinum">Platinum</span>
          } @else {
          <span class="badge silver">Silver</span>
          }
        </p>
      </section>
    </article>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  account: AccountInfo = {
    name: 'Melisa Evan',
    membershipStatus: 'gold',
    validThru: '12/2022',
    CVV: '123',
  };
}
