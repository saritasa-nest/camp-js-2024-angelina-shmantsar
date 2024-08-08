import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrors } from '@js-camp/angular/core/models/http-errors';

import { CurrentForm } from '@js-camp/angular/shared/constants/current-auth-form-enum';
import { CURRENT_AUTH_FORM$ } from '@js-camp/angular/shared/constants/current-auth-form';

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

	private readonly destroyReference = inject(DestroyRef);

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

	/** On submit. */
	protected onSubmit(): void {
		if (this.loginForm.valid) {
			const credentials = this.loginForm.getRawValue();
			this.authService
				.login(credentials)
				.pipe(
					takeUntilDestroyed(this.destroyReference),
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

	/** @inheritdoc */
	public ngOnInit(): void {
		this.loginForm.valueChanges.pipe(takeUntilDestroyed(this.destroyReference)).subscribe(() => {
			this.hasLoginError$.next(false);
		});
	}
}
