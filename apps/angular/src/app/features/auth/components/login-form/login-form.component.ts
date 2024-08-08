import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrors } from '@js-camp/angular/core/models/http-errors';

import { CurrentForm } from '@js-camp/angular/shared/constants/current-auth-form-enum';
import { CURRENT_AUTH_FORM$ } from '@js-camp/angular/shared/constants/current-auth-form';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';

import { ErrorComponent } from '../error/error.component';

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

	private readonly currentAuthForm$ = CURRENT_AUTH_FORM$;

	/** Has login error (invalid credentials entered). */
	protected readonly hasLoginError$ = new BehaviorSubject(false);

	/** Login form. */
	protected readonly loginForm = this.formBuilder.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	/** Error messages. */
	protected readonly errorMessages = {
		loginError: 'No active account found with given credentials',
		email$: new BehaviorSubject(''),
		password$: new BehaviorSubject(''),
	};

	/** 'email' control. */
	protected get email(): FormControl<string> {
		return this.loginForm.controls.email;
	}

	/** 'password' control. */
	protected get password(): FormControl<string> {
		return this.loginForm.controls.password;
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
						const httpError = error as HttpErrorResponse;
						if (httpError.status === HttpErrors.Forbidden) {
							this.hasLoginError$.next(true);
						}
						return throwError(error);
					}),
				)
				.subscribe();
		}
	}

	/** On form change. */
	protected onFormChange(): void {
		this.currentAuthForm$.next(CurrentForm.Register);
	}

	private updateEmailError(): void {
		const emailControl = this.loginForm.controls.email;
		if (emailControl.hasError('required')) {
			this.errorMessages.email$.next('This field is required');
		} else if (emailControl.hasError('email')) {
			this.errorMessages.email$.next('This field should be valid email');
		} else {
			this.errorMessages.email$.next('');
		}
	}

	private updatePasswordError(): void {
		const passwordControl = this.loginForm.controls.password;
		if (passwordControl.hasError('required')) {
			this.errorMessages.password$.next('This field is required');
		} else if (passwordControl.hasError('email')) {
			this.errorMessages.password$.next('The password must be at least 8 characters long');
		} else {
			this.errorMessages.password$.next('');
		}
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.loginForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.hasLoginError$.next(false);
			this.updateEmailError();
			this.updatePasswordError();
		});
	}
}
