import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[trustHtml]',
})
export class SanitizeHtmlDirective {
  @Input() public set trustHtml(trustHtml: string) {
    if (this._trustHtml !== trustHtml) {
      this._trustHtml = trustHtml;
      this.innerHtml = this.sanitizer.bypassSecurityTrustHtml(this._trustHtml);
    }
  }

  @HostBinding('innerHTML') innerHtml?: SafeHtml;

  private _trustHtml!: string;

  constructor(readonly sanitizer: DomSanitizer) {}
}
