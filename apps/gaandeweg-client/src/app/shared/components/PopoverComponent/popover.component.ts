import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gaandeweg-ws-popover-component',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() content = 'Hello World';
  @Input() props: { content: string } = { content: 'Hello World' };
  constructor() {}

  ngOnInit() {
    if (this.props) console.log(this.props);
    else console.log('No content');
  }
}
