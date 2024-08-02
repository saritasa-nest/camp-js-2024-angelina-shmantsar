import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { HttpErrors } from './auth-error.interceptor';

const IS_REFRESHING = signal<boolean>(false);

/**
 * Add authorization header.
 * @param req - Request.
 * @param next - Next interceptor.
 */
export function authTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const cookieService = inject(CookieService);
	const authService = inject(AuthService);
	const accessToken = cookieService.get('accessToken');
	const refreshToken = cookieService.get('refreshToken');

	if (accessToken.length === 0) {
		return next(req);
	}

	if (IS_REFRESHING()) {
		return handleRefresh({
			authService,
			cookieService,
			request: req,
			next,
			refreshToken,
		});
	}

	const authTokenRequest = addAuthorizationHeader(req, accessToken);
	return next(authTokenRequest).pipe(
		catchError((error: unknown) => {
			const httpError = error as HttpErrorResponse;
			if (httpError.status === HttpErrors.Unauthorized) {
				return handleRefresh({
					authService,
					cookieService,
					request: req,
					next,
					refreshToken,
				});
			}
			return throwError(() => new Error('Something bad happened; please try again later.'));
		}),
	);
}

type HandleRefreshData = {

	/** Auth service. */
	readonly authService: AuthService;

	/** Cookie service. */
	readonly cookieService: CookieService;

	/** Request. */
	readonly request: HttpRequest<unknown>;

	/** Next interceptor. */
	readonly next: HttpHandlerFn;

	/** Refresh token. */
	readonly refreshToken: string;
};

/**
 * Do refreshing and repeat request.
 * @param handleRefreshData - Handle refresh data.
 */
function handleRefresh(handleRefreshData: HandleRefreshData): Observable<HttpEvent<unknown>> {
	const { authService, cookieService, request, next, refreshToken } = handleRefreshData;
	if (!IS_REFRESHING()) {
		IS_REFRESHING.set(true);
		return authService.refreshToken(refreshToken).pipe(
			switchMap(tokens => {
				IS_REFRESHING.set(false);
				return next(addAuthorizationHeader(request, tokens.access));
			}),
		);
	}
	return next(addAuthorizationHeader(request, cookieService.get('accessToken')));
}

/**
 * Add 'Authorization' header.
 * @param request - Request.
 * @param accessToken - Access token.
 */
function addAuthorizationHeader(request: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
	return request.clone({
		headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
	});
}
