import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
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
export class SearchFormComponent implements OnChanges {
	/** Value of search input. */
	@Input()
	public value = '';

	/** Search value. */
	@Output()
	public readonly searchValueEmitter = new EventEmitter<string>();

	/** Form. */
	protected readonly searchControl = new FormControl<string>(this.value);

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		this.searchControl.patchValue(changes['value'].currentValue);
	}

	/**
	 * Form submit.
	 * @param event - Event.
	 */
	protected onSubmit(): void {
		this.searchValueEmitter.emit(this.searchControl.value ?? '');
	}
}
