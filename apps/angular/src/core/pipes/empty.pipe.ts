import { Pipe, PipeTransform } from '@angular/core';

/** Return customized empty value. */
@Pipe({
	name: 'empty',
	standalone: true,
})
export class EmptyPipe implements PipeTransform {
	/** @inheritdoc */
	public transform(value: string | null | number | undefined): string | number {
		if (value == null) {
			return '—';
		}
		if (typeof value === 'number') {
			return value;
		}
		if (value.length === 0) {
			return '—';
		}
		return value;
	}
}
