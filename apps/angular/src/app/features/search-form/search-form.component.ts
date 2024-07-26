import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

/** Search form. */
@Component({
	selector: 'search-form',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
	templateUrl: './search-form.component.html',
	styleUrl: './search-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
	/** Search value. */
	@Output() public readonly searchValue = new EventEmitter<string | null>();

	/** Form. */
	protected readonly form = new FormGroup({
		search: new FormControl<string | null>(null),
	});

	/**
	 * Form submit.
	 * @param event - Event.
	 */
	protected onSubmit(): void {
		this.searchValue.emit(this.form.value.search);
	}
}
