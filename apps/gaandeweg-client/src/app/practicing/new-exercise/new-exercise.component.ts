import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../../logging.service';

@Component({
  selector: 'gaandeweg-ws-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss'],
  providers: [LoggingService],
})
export class NewExerciseComponent {
  @Output() newExercise = new EventEmitter<any>();

  constructor(private loggingService: LoggingService) {}

  onCreateExercise(data: any) {
    this.newExercise.emit(data);
  }
}
