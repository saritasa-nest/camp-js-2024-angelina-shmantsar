import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Return customized empty value. */
@Pipe({
	name: 'safe',
	standalone: true,
})
export class SafePipe implements PipeTransform {
	private readonly sanitizer = inject(DomSanitizer);

	/** @inheritdoc */
	public transform(url: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
