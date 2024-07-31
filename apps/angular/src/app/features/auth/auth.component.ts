import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
	[CurrentForm.Login]: 'Don\'t have an account yet? Register',
	[CurrentForm.Register]: 'Already have an account? Login',
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
	/** Current form. */
	protected readonly currentForm = signal<CurrentForm>(CurrentForm.Register);

	/** Change form button text. */
	protected readonly changeFormButtonText = signal<string>('Already have an account? Login');

	private readonly registrationForm = new FormGroup({
		email: new FormControl<string>(''),
		firstName: new FormControl<string>(''),
		lastName: new FormControl<string>(''),
		password: new FormControl<string>(''),
		retypedPassword: new FormControl<string>(''),
	});

	private readonly loginForm = new FormGroup({
		email: new FormControl<string>(''),
		password: new FormControl<string>(''),
	});

	/** Form. */
	protected readonly form = this.currentForm() === CurrentForm.Login ? this.loginForm : this.registrationForm;

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
	protected readonly fields = signal<readonly FormField[]>(this.registerFields);

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
}
