import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';

// Smoke test (Vitest via `ng test 13-deferrable-views`): the lesson's starter app boots
// with the same zoneless providers used in main.ts and renders its template.
describe('13-deferrable-views AppComponent', () => {
  // PostsComponent fetches from the network; stub fetch so the test is offline and deterministic.
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ json: async () => [] })));
  });
  afterEach(() => vi.unstubAllGlobals());

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
    expect(el.querySelector('h1')?.textContent).toContain('Deferrable Views Example');
  });
});
