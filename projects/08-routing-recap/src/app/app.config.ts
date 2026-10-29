import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * Application-wide providers.
 * - provideZonelessChangeDetection(): Angular 22 apps run without zone.js; change
 *   detection is driven by signals, template events and async pipe/markForCheck.
 * - provideBrowserGlobalErrorListeners(): reports uncaught errors and unhandled
 *   promise rejections to Angular's ErrorHandler.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
