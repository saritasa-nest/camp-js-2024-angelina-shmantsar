import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { RegisterCredentials } from '@js-camp/core/models/register-credentials';
import { RegisterCredentialsMapper } from '@js-camp/core/mappers/register-credentials.mapper';
import { LoginCredentials } from '@js-camp/core/models/login-credentials';
import { LoginCredentialsMapper } from '@js-camp/core/mappers/login-credentials.mapper';

import { TokensDto } from '../dtos/tokens.dto';

import { ApiUrlService } from './api-url.service';

/** Auth service. */
@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly cookieService = inject(CookieService);

	/**
	 * Register user.
	 * @param credentials - Credentials.
	 */
	public register(credentials: RegisterCredentials): Observable<TokensDto> {
		const registerUrl = this.urlService.auth.register;
		return this.httpClient.post<TokensDto>(registerUrl, RegisterCredentialsMapper.toDto(credentials)).pipe(
			tap(value => {
				this.saveTokens(value.access, value.refresh);
			}),
		);
	}

	/**
	 * Login.
	 * @param credentials - Credentials.
	 */
	public login(credentials: LoginCredentials): Observable<TokensDto> {
		const loginUrl = this.urlService.auth.login;
		return this.httpClient.post<TokensDto>(loginUrl, LoginCredentialsMapper.toDto(credentials)).pipe(
			tap(value => {
				this.saveTokens(value.access, value.refresh);
			}),
		);
	}

	/**
	 * Refresh token.
	 * @param refreshToken - Refresh token.
	 */
	public refreshToken(refreshToken: string): Observable<TokensDto> {
		const tokenRefreshUrl = this.urlService.auth.tokenRefresh;
		return this.httpClient.post<TokensDto>(tokenRefreshUrl, { refresh: refreshToken }).pipe(
			tap(value => {
				this.saveTokens(value.access, value.refresh);
			}),
		);
	}

	private saveTokens(accessToken: string, refreshToken: string): void {
		this.cookieService.set('accessToken', accessToken);
		this.cookieService.set('refreshToken', refreshToken);
	}
}
