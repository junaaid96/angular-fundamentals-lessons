// Lesson 13-deferrable-views: Deferrable views
// Starter code for the exercise in ../../README.md; follow the steps there to complete it.
import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts.component';

@Component({
  selector: 'app-root',
  imports: [PostsComponent],
  template: `
    <section class="container">
      <h1>Deferrable Views Example</h1>
      <button #loadPosts>Load Posts</button>
      <app-posts />
    </section>
  `,
})
export class AppComponent {}
