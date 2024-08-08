import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrors } from '@js-camp/angular/core/models/http-errors';

import { CURRENT_AUTH_FORM$ } from '@js-camp/angular/shared/constants/current-auth-form';
import { CurrentForm } from '@js-camp/angular/shared/constants/current-auth-form-enum';
import { NavigationService } from '@js-camp/angular/core/services/navigation.service';

import { ErrorComponent } from '../error/error.component';

/** Registration form component. */
@Component({
	selector: 'camp-registration-form',
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
	templateUrl: './registration-form.component.html',
	styleUrl: './registration-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
	/** Validation service. */
	protected readonly validationService = inject(ValidationService);

	private readonly authService = inject(AuthService);

	private readonly navigationService = inject(NavigationService);

	private readonly destroyReference = inject(DestroyRef);

	private readonly formBuilder = inject(FormBuilder);

	private readonly currentAuthForm$ = CURRENT_AUTH_FORM$;

	/** Registration form. */
	protected readonly registrationForm = this.formBuilder.nonNullable.group(
		{
			email: ['', [Validators.required, Validators.email]],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(8)]],
			retypedPassword: ['', Validators.required],
		},
		{ validators: this.validationService.passwordIdentityValidator },
	);

	/** Has password error (password is weak). */
	protected readonly hasPasswordError$ = new BehaviorSubject(false);

	/** On form change. */
	protected onFormChange(): void {
		this.currentAuthForm$.next(CurrentForm.Login);
	}

	/** On submit. */
	protected onSubmit(): void {
		if (this.registrationForm.valid) {
			const credentials = this.registrationForm.getRawValue();
			this.authService
				.register(credentials)
				.pipe(
					tap(() => this.navigationService.navigate('')),
					takeUntilDestroyed(this.destroyReference),
					catchError((error: unknown) => {
						const httpError = error as HttpErrorResponse;
						if (httpError.status === HttpErrors.BadRequest) {
							this.hasPasswordError$.next(true);
						}
						return throwError(error);
					}),
				)
				.subscribe();
		}
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.registrationForm.valueChanges.pipe(takeUntilDestroyed(this.destroyReference)).subscribe(() => {
			this.hasPasswordError$.next(false);
		});
	}
}
