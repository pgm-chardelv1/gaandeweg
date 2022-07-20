import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * A directive that sanitizes the innerHTML of an element.
 * @param {DomSanitizer} sanitizer - the sanitizer to use to sanitize the innerHTML
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[trustHtml]',
})
export class SanitizeHtmlDirective {
  /**
   * Set the HTML to be trusted.
   * @param {string} trustHtml - the HTML to be trusted.
   * @returns None
   */
  @Input() public set trustHtml(trustHtml: string) {
    if (this._trustHtml !== trustHtml) {
      this._trustHtml = trustHtml;
      this.innerHtml = this.sanitizer.bypassSecurityTrustHtml(this._trustHtml);
    }
  }

  @HostBinding('innerHTML') innerHtml?: SafeHtml;

  /**
   * A string that is used to trust HTML.  This is used to trust the HTML that is injected into the page.
   * @private
   */
  private _trustHtml!: string;

  /**
   * A DomSanitizer that can be used to sanitize HTML.
   */
  constructor(readonly sanitizer: DomSanitizer) {}
}
