import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

const INITIAL_PAGE_SIZE = 25;

const DEFAULT_PAGE_NUMBER = 0;

/** Paginator. */
@Component({
	selector: 'camp-paginator',
	standalone: true,
	imports: [CommonModule, MatPaginatorModule],
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
	/** Page event emitter. */
	@Output()
	public readonly pageEventEmitter = new EventEmitter<PageEvent>();

	/** Total count. */
	@Input()
	public totalCount = 0;

	/** Page number. */
	@Input()
	public pageNumber = DEFAULT_PAGE_NUMBER;

	/** Page size. */
	@Input()
	public pageSize = INITIAL_PAGE_SIZE;

	/** Page sizes. */
	@Input()
	public pageSizes: readonly number[] = [];

	/**
	 * On page event.
	 * @param event Page event.
	 */
	protected onPageEvent(event: PageEvent): void {
		this.pageEventEmitter.emit(event);
	}
}
