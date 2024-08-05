import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { TokensDto } from '../../app/features/auth/dtos/tokens.dto';
import { RegisterCredentials } from '../../app/features/auth/models/register-credentials';
import { RegisterCredentialsMapper } from '../../app/features/auth/mappers/register-credentials.mapper';
import { LoginCredentials } from '../../app/features/auth/models/login-credentials';
import { LoginCredentialsMapper } from '../../app/features/auth/mappers/login-credentials.mapper';

import { ApiUrlService } from './api-url.service';
import { NavigationService } from './navigation.service';

/** Auth service. */
@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly cookieService = inject(CookieService);

	private readonly navigationService = inject(NavigationService);

	/**
	 * Register user.
	 * @param credentials - Credentials.
	 */
	public register(credentials: RegisterCredentials): Observable<TokensDto> {
		const registerUrl = this.urlService.auth.register;
		return this.httpClient.post<TokensDto>(registerUrl, RegisterCredentialsMapper.toDto(credentials)).pipe(
			tap(value => {
				this.saveTokens(value.access, value.refresh);
				this.navigationService.navigate('');
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
				this.navigationService.navigate('');
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
