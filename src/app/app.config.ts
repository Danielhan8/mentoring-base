import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersReducer } from './users-list/state/users.reducer';
import { todosReducer } from './todos-list/state-todos/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync('noop'),
    provideStore({
      users: usersReducer,
      todos: todosReducer
    }),
    provideStoreDevtools ({
        maxAge: 25, logOnly: !isDevMode()
    })
  ],
};

