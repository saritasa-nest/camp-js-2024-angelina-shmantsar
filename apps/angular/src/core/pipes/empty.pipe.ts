import { Pipe, PipeTransform } from '@angular/core';

/** Return customized empty value. */
@Pipe({
	name: 'empty',
	standalone: true,
})
export class EmptyPipe implements PipeTransform {
	/** @inheritdoc */
	public transform(value: string | null): string {
		if (value != null && value.length > 0) {
			return value;
		}
		return '—';
	}
}
