import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/** Search form. */
@Component({
	selector: 'camp-search-form',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
	templateUrl: './search-form.component.html',
	styleUrl: './search-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {

	/** Value of search input. */
	@Input()
	public set search(value: string) {
		this.searchControl.patchValue(value);
	}

	/** Search value. */
	@Output()
	public readonly searchValueChange = new EventEmitter<string>();

	/**
	 * Form submit.
	 * @param event - Event.
	 */
	protected onSubmit(): void {
		this.searchValueChange.emit(this.searchControl.value ?? '');
	}

	/** Form. */
	protected readonly searchControl = new FormControl<string>('');
}
