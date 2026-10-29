import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';

// Smoke test (Vitest via `ng test 05-control-flow-for`): the lesson's starter app boots
// with the same zoneless providers used in main.ts and renders its template.
describe('05-control-flow-for AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: appConfig.providers,
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the starter template', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    // @for renders one <article class="listing"> per car in carList.
    expect(el.querySelectorAll('article.listing').length).toBe(4);
  });
});
