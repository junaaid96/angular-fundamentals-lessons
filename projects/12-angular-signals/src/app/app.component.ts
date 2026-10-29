// Lesson 12-angular-signals: Signals
// Starter code for the exercise in ../../README.md; follow the steps there to complete it.
import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  template: ` <h1>Building a TODO List</h1> `,
  styles: `label { display: block }`,
})
export class AppComponent {
  updateTodo(todo: Todo) {}
}
