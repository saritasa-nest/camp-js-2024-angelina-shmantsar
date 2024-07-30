import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

/** Current from. */
enum CurrentForm {
	Registration = 'Registration',
	Login = 'Login',
}

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
	protected readonly currentForm = signal<CurrentForm>(CurrentForm.Registration);

	/** Registration form. */
	protected readonly registrationForm = new FormGroup({
		email: new FormControl<string>(''),
		firstName: new FormControl<string>(''),
		lastName: new FormControl<string>(''),
		password: new FormControl<string>(''),
		retypedPassword: new FormControl<string>(''),
	});

	/** Login form. */
	protected readonly loginForm = new FormGroup({
		email: new FormControl<string>(''),
		password: new FormControl<string>(''),
	});

	/** Form. */
	protected readonly form = this.currentForm() === CurrentForm.Login ? this.loginForm : this.registrationForm;
}
