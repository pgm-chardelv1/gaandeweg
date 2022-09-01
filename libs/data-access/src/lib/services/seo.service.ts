import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  constructor(
    private titleSvc: Title,
    private metaSvc: Meta,
    @Inject(DOCUMENT) private dom: Document
  ) {}

  updateTitle(title: string) {
    this.titleSvc.setTitle(title);
  }

  updateDescription(desc: string) {
    this.metaSvc.updateTag({ name: 'description', content: desc });
  }

  updateCanonicalLink(url: string) {
    const link: HTMLLinkElement = this.dom.createElement('link');

    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.dom.head.appendChild(link);
  }
}
