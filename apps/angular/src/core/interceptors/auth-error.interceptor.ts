import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

/** Has login error (invalid credentials entered). */
export const HAS_LOGIN_ERROR = signal<boolean>(false);

/** Has password error (password is weak). */
export const HAS_PASSWORD_ERROR = signal<boolean>(false);

/** Http errors list. */
export enum HttpErrors {
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
}

/**
 * Handle auth error.
 * @param req - Request.
 * @param next - Next interceptor.
 */
export function authErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	return next(req)
		.pipe(
			catchError((error: unknown) => {
				const httpError = error as HttpErrorResponse;
				handleLoginError(httpError);
				handlePasswordError(httpError);
				return throwError(error);
			}),
		);
}

/**
 * Handle login error.
 * @param error - Error.
 */
function handleLoginError(error: HttpErrorResponse): void {
	if (error.status === HttpErrors.Forbidden) {
		HAS_LOGIN_ERROR.set(true);
	}
}

/**
 * Handle password error.
 * @param error - Error.
 */
function handlePasswordError(error: HttpErrorResponse): void {
	if (error.status === HttpErrors.BadRequest) {
		HAS_PASSWORD_ERROR.set(true);
	}
}
