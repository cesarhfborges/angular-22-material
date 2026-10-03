import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.routes';
import { SessionService } from './core/services/session.service';

export const appConfig: ApplicationConfig = {
  providers: [
    SessionService,
    provideBrowserGlobalErrorListeners(),
    // provideRouter(routes),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation(),
    ),
  ],
};
