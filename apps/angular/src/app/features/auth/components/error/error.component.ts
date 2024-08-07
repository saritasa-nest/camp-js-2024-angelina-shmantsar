import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, merge } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** Error component. */
@Component({
	selector: 'camp-error',
	standalone: true,
	imports: [CommonModule, MatInputModule, AsyncPipe],
	templateUrl: './error.component.html',
	styleUrl: './error.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
	/** Form. */
	@Input()
	public control: FormControl<string> = new FormControl('', { nonNullable: true });

	/** Error message. */
	protected readonly errorMessage$ = new BehaviorSubject('');

	private readonly destroyRef = inject(DestroyRef);

	/** @inheritdoc */
	public ngOnInit(): void {
		merge(this.control.events)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => this.updateErrorMessage());
	}

	private updateErrorMessage(): void {
		if (this.control.hasError('required')) {
			this.errorMessage$.next('This field is required');
		} else if (this.control.hasError('email')) {
			this.errorMessage$.next('This field should be valid email');
		} else if (this.control.hasError('minlength')) {
			this.errorMessage$.next('The password must be at least 8 characters long');
		} else {
			this.errorMessage$.next('');
		}
	}
}
