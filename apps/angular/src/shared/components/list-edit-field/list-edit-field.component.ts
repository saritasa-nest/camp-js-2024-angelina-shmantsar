import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';

/** Input data. */
export type InputData = {

	/** Name. */
	readonly name: string;
};

/** List edit field. */
@Component({
	selector: 'camp-list-edit-field',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatChipsModule, MatIconModule],
	templateUrl: './list-edit-field.component.html',
	styleUrl: './list-edit-field.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListEditFieldComponent {
	/** Input data. */
	@Input()
	public inputData: InputData[] | null = null;

	/** Form field label: "Studios" or "Genres". */
	@Input()
	public label = 'Studios';

	/**
	 * Remove item from the list.
	 * @param item List item.
	 */
	protected removeListItem(item: InputData): void {
		const index = this.inputData?.indexOf(item);
		if (index != null && index >= 0) {
			this.inputData?.splice(index, 1);
		}
	}

	/**
	 * Add new item to list.
	 * @param event Chip input event.
	 */
	protected addListItem(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value.length > 0) {
			this.inputData?.push({ name: value });
		}
		event.chipInput.clear();
	}
}
