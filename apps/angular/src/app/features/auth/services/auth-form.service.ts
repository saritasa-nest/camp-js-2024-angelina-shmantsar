import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HAS_LOGIN_ERROR, HAS_PASSWORD_ERROR } from '../../../../core/interceptors/auth-error.interceptor';
import { RegisterCredentials } from '../models/register-credentials';
import { LoginCredentials } from '../models/login-credentials';

import { ValidationService } from '../../../../core/services/validation.service';

import { AuthService } from '../../../../core/services/auth.service';

/** Form field. */
export type FormField = {

	/** Title. */
	readonly title: string;

	/** Placeholder. */
	readonly placeholder: string;

	/** Input type. */
	readonly type: string;

	/** Name. */
	readonly name: string;
};

/** Current form. */
export enum CurrentForm {
	Register = 'Register',
	Login = 'Login',
}

const CHANGE_FORM_BUTTON_TEXT: Readonly<Record<CurrentForm, string>> = {
	[CurrentForm.Login]: 'Not registered yet? Register',
	[CurrentForm.Register]: 'Already registered? Login',
};

/** Auth form service. */
@Injectable({ providedIn: 'root' })
export class AuthFormService {
	private readonly validationService = inject(ValidationService);

	private readonly authService = inject(AuthService);

	private readonly destroyReference = inject(DestroyRef);

	/** Current form. */
	public readonly currentForm = signal<CurrentForm>(CurrentForm.Login);

	/** Text on change form button . */
	public readonly changeFormButtonText = signal<string>(CHANGE_FORM_BUTTON_TEXT[this.currentForm()]);

	/** Registration form. */
	public readonly registrationForm = new FormGroup(
		{
			email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
			firstName: new FormControl<string | null>(null, Validators.required),
			lastName: new FormControl<string | null>(null, Validators.required),
			password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
			retypedPassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
		},
		{ validators: this.validationService.passwordIdentityValidator },
	);

	/** Login form. */
	public readonly loginForm = new FormGroup({
		email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
		password: new FormControl<string | null>(null, Validators.required),
	});

	private readonly registerFields: readonly FormField[] = [
		{ title: 'Email', placeholder: 'example@example.com', type: 'email', name: 'email' },
		{ title: 'First name', placeholder: 'Alex', type: 'text', name: 'firstName' },
		{ title: 'Last name', placeholder: 'Brown', type: 'text', name: 'lastName' },
		{ title: 'Password', placeholder: 'er123456', type: 'password', name: 'password' },
		{ title: 'Retyped password', placeholder: '123456', type: 'password', name: 'retypedPassword' },
	];

	private readonly loginFields: readonly FormField[] = [
		{ title: 'Email', placeholder: 'example@example.com', type: 'email', name: 'email' },
		{ title: 'Password', placeholder: 'er123456', type: 'password', name: 'password' },
	];

	/** Form fields. */
	public readonly fields = signal<readonly FormField[]>(this.loginFields);

	/** Has login error (invalid credentials entered). */
	public readonly hasLoginError = HAS_LOGIN_ERROR;

	/** Has password error (password is weak). */
	public readonly hasPasswordError = HAS_PASSWORD_ERROR;

	/** On form change. */
	public onFormChange(): void {
		if (this.currentForm() === CurrentForm.Login) {
			this.changeForm(CurrentForm.Register, this.registerFields);
		} else {
			this.changeForm(CurrentForm.Login, this.loginFields);
		}
		this.hasLoginError.set(false);
		this.hasPasswordError.set(false);
	}

	private changeForm(currentForm: CurrentForm, fields: readonly FormField[]): void {
		this.currentForm.set(currentForm);
		this.changeFormButtonText.set(CHANGE_FORM_BUTTON_TEXT[currentForm]);
		this.fields.set(fields);
	}

	/** On submit. */
	public onSubmit(): void {
		if (this.currentForm() === CurrentForm.Login) {
			this.onLogin();
		} else {
			this.onRegister();
		}
	}

	private onRegister(): void {
		if (this.registrationForm.valid) {
			const credentials = {
				...this.registrationForm.value,
			};
			this.authService
				.register(credentials as RegisterCredentials)
				.pipe(takeUntilDestroyed(this.destroyReference))
				.subscribe();
		}
	}

	private onLogin(): void {
		if (this.loginForm.valid) {
			const credentials = {
				...this.loginForm.value,
			};
			this.authService
				.login(credentials as LoginCredentials)
				.pipe(takeUntilDestroyed(this.destroyReference))
				.subscribe();
		}
	}

	/**
	 * On input value change.
	 * @param fieldName - Field name.
	 */
	public onValueChange(fieldName: string): void {
		if (fieldName === 'password' || fieldName === 'retypedPassword') {
			this.hasPasswordError.set(false);
		}
		this.hasLoginError.set(false);
	}
}
