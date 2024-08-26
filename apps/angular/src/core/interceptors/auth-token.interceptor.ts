import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, switchMap, take, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { HttpErrors } from '../models/http-errors';
import { StorageService } from '../services/storage.service';

const IS_REFRESHING$ = new BehaviorSubject(false);

/**
 * Add authorization header.
 * @param req Request.
 * @param next Next interceptor.
 */
export function authTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const storageService = inject(StorageService);
	const authService = inject(AuthService);

	const tokens = storageService.getItem('authTokens');

	let isRefreshing = false;

	if (tokens === null) {
		return next(req);
	}

	const { access, refresh } = JSON.parse(tokens);

	IS_REFRESHING$.pipe(take(1)).subscribe(value => {
		isRefreshing = value;
	});

	if (isRefreshing) {
		return refreshToken({
			authService,
			storageService,
			request: req,
			next,
			refresh: refresh ?? '',
			isRefreshing,
		});
	}

	const authTokenRequest = addAuthorizationHeader(req, access ?? '');
	return next(authTokenRequest).pipe(
		catchError((error: unknown) => {
			const httpError = error as HttpErrorResponse;
			if (httpError.status === HttpErrors.Unauthorized) {
				return refreshToken({
					authService,
					storageService,
					request: req,
					next,
					refresh: refresh ?? '',
					isRefreshing,
				});
			}
			return throwError(() => error);
		}),
	);
}

type HandleRefreshData = {

	/** Auth service. */
	readonly authService: AuthService;

	/** Cookie service. */
	readonly storageService: StorageService;

	/** Request. */
	readonly request: HttpRequest<unknown>;

	/** Next interceptor. */
	readonly next: HttpHandlerFn;

	/** Refresh token. */
	readonly refresh: string;

	/** Is refreshing. */
	readonly isRefreshing: boolean;
};

/**
 * Do refreshing and repeat request.
 * @param handleRefreshData Handle refresh data.
 */
function refreshToken({
	authService,
	storageService,
	request,
	next,
	refresh,
	isRefreshing,
}: HandleRefreshData): Observable<HttpEvent<unknown>> {
	if (!isRefreshing) {
		IS_REFRESHING$.next(true);
		return authService.refreshToken(refresh).pipe(
			switchMap(tokens => {
				IS_REFRESHING$.next(false);
				return next(addAuthorizationHeader(request, tokens.access));
			}),
		);
	}
	return next(addAuthorizationHeader(request, storageService.getItem('accessToken') ?? ''));
}

/**
 * Adds the specified token to the request header.
 * @param request Request.
 * @param accessToken Access token.
 */
function addAuthorizationHeader(request: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
	return request.clone({
		headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
	});
}
