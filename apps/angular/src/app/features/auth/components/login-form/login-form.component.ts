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
import { HttpErrors } from '@js-camp/angular/core/interceptors/auth-error.interceptor';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthFormService } from '../../services/auth-form.service';
import { ErrorComponent } from '../error/error.component';

/** Login form component. */
@Component({
	selector: 'camp-login-form',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ErrorComponent, AsyncPipe],
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
	private readonly authService = inject(AuthService);

	private readonly destroyReference = inject(DestroyRef);

	/** Validation service. */
	protected readonly validationService = inject(ValidationService);

	/** Auth form service. */
	protected readonly authFormService = inject(AuthFormService);

	private readonly formBuilder = inject(FormBuilder);

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

	/** @inheritdoc */
	public ngOnInit(): void {
		this.loginForm.valueChanges
			.pipe(takeUntilDestroyed(this.destroyReference))
			.subscribe(() => {
				this.hasLoginError$.next(false);
			});
	}
}
