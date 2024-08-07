import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
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
export class SearchFormComponent implements OnInit {
	/** Value of search input. */
	@Input() public value: string | null = null;

	/** Search value. */
	@Output() public readonly searchValueEmitter = new EventEmitter<string | null>();

	/** Form. */
	protected readonly searchControl = new FormControl<string | null>(this.value);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.searchControl.patchValue(this.value);
	}

	/**
	 * Form submit.
	 * @param event - Event.
	 */
	protected onSubmit(event: Event): void {
		event.preventDefault();
		this.searchValueEmitter.emit(this.searchControl.value);
	}
}
