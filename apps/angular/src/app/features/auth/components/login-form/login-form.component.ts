import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { BehaviorSubject, EMPTY, catchError, tap, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { NavigationService } from '@js-camp/angular/core/services/navigation.service';

import { ErrorComponent } from '../error/error.component';

/** Login form. */
type LoginForm = {

	/** Email. */
	readonly email: FormControl<string>;

	/** Password. */
	readonly password: FormControl<string>;
};

/** Login form component. */
@Component({
	selector: 'camp-login-form',
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		ErrorComponent,
		AsyncPipe,
		MatIconModule,
	],
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
	private readonly authService = inject(AuthService);

	private readonly navigationService = inject(NavigationService);

	private readonly destroyRef = inject(DestroyRef);

	/** Validation service. */
	protected readonly validationService = inject(ValidationService);

	private readonly formBuilder = inject(FormBuilder);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.loginForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.hasLoginError$.next(false);
		});
	}

	/** Change password visibility. */
	protected changePasswordVisibility(): void {
		// eslint-disable-next-line rxjs/no-subject-value
		this.isPasswordVisible$.next(!this.isPasswordVisible$.value);
	}

	/** On submit. */
	protected onSubmit(): void {
		if (this.loginForm.valid) {
			const credentials = this.loginForm.getRawValue();
			this.authService
				.login(credentials)
				.pipe(
					tap(() => this.navigationService.navigate('')),
					takeUntilDestroyed(this.destroyRef),
					catchError((error: unknown) => {
						if (this.validationService.isLoginError(error)) {
							this.hasLoginError$.next(true);
							return EMPTY;
						}
						return throwError(() => error);
					}),
				)
				.subscribe();
		}
	}

	/** On form change. */
	protected onFormChange(): void {
		this.navigationService.navigate('register');
	}

	/** Form controls. */
	protected get controls(): LoginForm {
		return this.loginForm.controls;
	}

	/** Has login error (invalid credentials entered). */
	protected readonly hasLoginError$ = new BehaviorSubject(false);

	/** Is password visible. */
	protected readonly isPasswordVisible$ = new BehaviorSubject(false);

	/** Login form. */
	protected readonly loginForm: FormGroup<LoginForm> = this.formBuilder.nonNullable.group({
		email: this.formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
		password: this.formBuilder.nonNullable.control('', [Validators.required]),
	});

	/** Error messages. */
	protected readonly loginError = 'No active account found with given credentials';
}
