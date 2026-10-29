// Lesson 00-basic-app: Workspace & bootstrapping
// Starter code for the exercise in ../../README.md; follow the steps there to complete it.
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '00-basic-app';
}
