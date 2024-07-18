import { Pipe, PipeTransform } from '@angular/core';

/** Remove underscores from string. */
@Pipe({
	name: 'removeUnderscore',
	standalone: true,
})
export class RemoveUnderscorePipe implements PipeTransform {
	/** @inheritdoc */
	public transform(value: string): string {
		return value.replace(/_/g, ' ');
	}
}
