import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { RegisterCredentials } from '@js-camp/angular/core/models/register-credentials';
import { LoginCredentials } from '@js-camp/angular/core/models/login-credentials';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { HAS_LOGIN_ERROR, HAS_PASSWORD_ERROR } from '@js-camp/angular/core/interceptors/auth-error.interceptor';

/** Form field. */
type FormField = {

	/** Title. */
	readonly title: string;

	/** Placeholder. */
	readonly placeholder: string;

	/** Type. */
	readonly type: string;

	/** Name. */
	readonly name: string;
};

/** Current from. */
enum CurrentForm {
	Register = 'Register',
	Login = 'Login',
}

const CHANGE_FORM_BUTTON_TEXT: Readonly<Record<CurrentForm, string>> = {
	[CurrentForm.Login]: 'Not registered yet? Register',
	[CurrentForm.Register]: 'Already registered? Login',
};

/** Auth component. */
@Component({
	selector: 'camp-auth',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	private readonly authService = inject(AuthService);

	/** Validation service. */
	protected readonly validationService = inject(ValidationService);

	/** Current form enum. */
	protected readonly currentFormEnum = CurrentForm;

	/** Current form. */
	protected readonly currentForm = signal<CurrentForm>(CurrentForm.Login);

	/** Change form button text. */
	protected readonly changeFormButtonText = signal<string>(CHANGE_FORM_BUTTON_TEXT[this.currentForm()]);

	/** Registration form. */
	protected readonly registrationForm = new FormGroup({
		email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
		firstName: new FormControl<string | null>(null, Validators.required),
		lastName: new FormControl<string | null>(null, Validators.required),
		password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
		retypedPassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
	}, { validators: this.validationService.passwordIdentityValidator });

	/** Login form. */
	protected readonly loginForm = new FormGroup({
		email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
		password: new FormControl<string | null>(null, Validators.required),
	});

	private readonly registerFields: readonly FormField[] = [
		{ title: 'Email', placeholder: 'example@example.com', type: 'email', name: 'email' },
		{ title: 'First name', placeholder: 'Alex', type: 'text', name: 'firstName' },
		{ title: 'Last name', placeholder: 'Brown', type: 'text', name: 'lastName' },
		{ title: 'Password', placeholder: '123456', type: 'password', name: 'password' },
		{ title: 'Retyped password', placeholder: '123456', type: 'password', name: 'retypedPassword' },
	];

	private readonly loginFields: readonly FormField[] = [
		{ title: 'Email', placeholder: 'example@example.com', type: 'email', name: 'email' },
		{ title: 'Password', placeholder: '123456', type: 'password', name: 'password' },
	];

	/** Form fields. */
	protected readonly fields = signal<readonly FormField[]>(this.loginFields);

	/** Has login error. */
	protected readonly hasLoginError = HAS_LOGIN_ERROR;

	/** Has password error. */
	protected readonly hasPasswordError = HAS_PASSWORD_ERROR;

	/** On form change. */
	protected onFormChange(): void {
		if (this.currentForm() === CurrentForm.Login) {
			this.currentForm.set(CurrentForm.Register);
			this.changeFormButtonText.set(CHANGE_FORM_BUTTON_TEXT[CurrentForm.Register]);
			this.fields.set(this.registerFields);
		} else {
			this.currentForm.set(CurrentForm.Login);
			this.changeFormButtonText.set(CHANGE_FORM_BUTTON_TEXT[CurrentForm.Login]);
			this.fields.set(this.loginFields);
		}
	}

	/** On submit. */
	protected onSubmit(): void {
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
			this.authService.register(credentials as RegisterCredentials).subscribe();
		}
	}

	private onLogin(): void {
		if (this.loginForm.valid) {
			const credentials = {
				...this.loginForm.value,
			};
			this.authService.login(credentials as LoginCredentials).subscribe();
		}
	}
}
