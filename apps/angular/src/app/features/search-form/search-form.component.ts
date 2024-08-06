import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	EventEmitter,
	Input,
	Output,
	inject,
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
	@Input() public value: string | undefined = undefined;

	/** Search value. */
	@Output() public readonly searchValueEmitter = new EventEmitter<string | null>();

	private readonly destroyReference = inject(DestroyRef);

	/** Form. */
	protected readonly searchControl = new FormControl<string | null>(this.value ?? null);

	/**
	 * Form submit.
	 * @param event - Event.
	 */
	protected onSubmit(event: Event): void {
		event.preventDefault();
		this.searchValueEmitter.emit(this.searchControl.value);
	}
}
