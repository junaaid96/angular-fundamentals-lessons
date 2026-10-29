import { Component, OnInit, signal } from '@angular/core';
import { Post } from '../data';

@Component({
  selector: 'app-posts',
  template: `
    @for (post of postData(); track post.id) {
    <article class="post">
      <p class="title">{{ post.title }}</p>
      <p class="body">{{ post.body }}</p>
    </article>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .title {
      font-weight: bold;
    }
    .body {
      font-style: italic;
    }
    .post {
      padding: 20px;
      border-radius: 5px;
      margin: 10px 0;
      background: white;
      box-shadow: 1px 5px 4px 2px #00000017;
      width: 400px;

    }
  `,
})
export class PostsComponent implements OnInit {
  // A signal notifies Angular when the fetched posts arrive (required without zone.js).
  protected readonly postData = signal<Post[]>([]);

  ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data: Post[]) => this.postData.set(data));
  }
}
