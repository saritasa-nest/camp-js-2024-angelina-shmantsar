import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { NavigationService } from '@js-camp/angular/core/services/navigation.service';

import { ErrorComponent } from '../error/error.component';

/** Registration form. */
type RegistrationForm = {

	/** Email. */
	readonly email: FormControl<string>;

	/** First name. */
	readonly firstName: FormControl<string>;

	/** Last name. */
	readonly lastName: FormControl<string>;

	/** Password. */
	readonly password: FormControl<string>;

	/** Retyped password. */
	readonly retypedPassword: FormControl<string>;
};

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
		MatIconModule,
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

	private readonly destroyRef = inject(DestroyRef);

	private readonly formBuilder = inject(FormBuilder);

	/** Registration form. */
	protected readonly registrationForm: FormGroup<RegistrationForm> = this.formBuilder.nonNullable.group(
		{
			email: this.formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
			firstName: this.formBuilder.nonNullable.control('', [Validators.required]),
			lastName: this.formBuilder.nonNullable.control('', [Validators.required]),
			password: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(8)]),
			retypedPassword: this.formBuilder.nonNullable.control('', [Validators.required]),
		},
		{ validators: this.validationService.passwordIdentityValidator },
	);

	/** Has password error (password is weak). */
	protected readonly hasPasswordError$ = new BehaviorSubject(false);

	/** Is password visible. */
	protected readonly isPasswordVisible$ = new BehaviorSubject(false);

	/** Has password mismatch error. */
	protected readonly hasPasswordMismatchError$ = new BehaviorSubject(false);

	/** Error messages. */
	protected readonly errorMessages = {
		mismatch: 'The passwords must match',
		weakPassword: 'Check password. It must contain numeric and alphabetic symbols',
	};

	/** Form controls. */
	protected get controls(): RegistrationForm {
		return this.registrationForm.controls;
	}

	private get isPasswordVisible(): boolean {
		let isVisible = false;
		this.isPasswordVisible$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(value => {
				isVisible = value;
			});
		return isVisible;
	}

	/** Change password visibility. */
	protected changePasswordVisibility(): void {
		this.isPasswordVisible$.next(!this.isPasswordVisible);
	}

	/** On form change. */
	protected onFormChange(): void {
		this.navigationService.navigate('login');
	}

	/** On submit. */
	protected onSubmit(): void {
		if (this.registrationForm.valid) {
			const credentials = this.registrationForm.getRawValue();
			this.authService
				.register(credentials)
				.pipe(
					tap(() => this.navigationService.navigate('')),
					takeUntilDestroyed(this.destroyRef),
					catchError((error: unknown) => {
						if (this.validationService.isPasswordError(error)) {
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
		this.registrationForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.hasPasswordError$.next(false);
			this.hasPasswordMismatchError$.next(this.registrationForm.errors?.['passwordMismatch'] &&
				(this.registrationForm.touched || this.registrationForm.dirty));
		});
	}
}
