import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFormsComponent } from './exercise-forms.component';

describe('FormsComponent', () => {
  let component: ExerciseFormsComponent;
  let fixture: ComponentFixture<ExerciseFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseFormsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
