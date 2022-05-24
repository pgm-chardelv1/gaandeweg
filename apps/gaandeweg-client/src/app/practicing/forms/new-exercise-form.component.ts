import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoggingService } from '../../logging.service';

@Component({
  selector: 'gaandeweg-ws-practicing-new-exercise-form',
  templateUrl: './new-exercise-form.component.html',
  styleUrls: ['./new-exercise-form.component.scss'],
  providers: [LoggingService],
})
export class NewExerciseFormComponent implements OnInit {
  formData: FormData = new FormData();
  exerciseForm!: FormGroup;

  ngOnInit(): void {
    this.exerciseForm = new FormGroup({
      date: new FormControl(null),
    });
  }
}
