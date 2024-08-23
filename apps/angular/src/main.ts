import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { appRoutes } from './app/app.routes';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([apiKeyInterceptor])),
		{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
	],
}).catch(err => console.error(err));
