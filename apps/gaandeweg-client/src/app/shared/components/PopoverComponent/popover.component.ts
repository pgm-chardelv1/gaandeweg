import { Component, Input, OnInit } from '@angular/core';
import { LoggingService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-popover-component',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() content = 'Hello World';
  @Input() props: { content: string } = { content: 'Hello World' };
  constructor(private logger: LoggingService) {}

  ngOnInit() {
    if (this.content)
      this.logger.log(
        'client',
        `PopoverComponent.ngOnInit content = ${this.content}`
      );
    else this.logger.log('client', 'PopoverComponent.ngOnInit props is null');
  }
}
