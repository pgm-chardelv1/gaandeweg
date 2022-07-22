import { Component } from '@angular/core';

@Component({
  selector: 'gaandeweg-ws-loading-spinner',
  template:
    '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {}
