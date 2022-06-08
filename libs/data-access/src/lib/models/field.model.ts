export interface ExerciseFormFieldDefaultTemplate {
  fieldId: number;
  fieldType: string;
  fieldName: string;
  fieldText: string;
  fieldInfo?: string;
}

export interface ExerciseFormFieldRangeTemplate
  extends ExerciseFormFieldDefaultTemplate {
  fieldType: 'RANGE';
  fieldOptions: {
    min: 0 | 1;
    max: number;
    step: number;
    snaps: boolean;
    icons: RangeLabel[];
  };
}

export interface ExerciseOption {
  fieldLabel: string;
  fieldValue: string;
}

export interface RangeLabel {
  slot: string;
  icon: boolean;
  value: string;
}

export interface ExerciseFormFieldSelectTemplate
  extends ExerciseFormFieldDefaultTemplate {
  fieldType: 'SELECT';
  fieldValues: ExerciseOption[];
  fieldRepeatable: boolean;
  fieldRepeat?: number;
}

export interface ExerciseFormFieldTextTemplate
  extends ExerciseFormFieldDefaultTemplate {
  fieldType: 'TEXT';
}

export interface ExerciseFormFieldRadioTemplate
  extends ExerciseFormFieldDefaultTemplate {
  fieldType: 'RADIO';
  fieldValues: ExerciseOption[];
}

export interface ExerciseFormFieldDateTemplate
  extends ExerciseFormFieldDefaultTemplate {
  fieldType: 'DATE';
}

export interface ExerciseFormFieldNumberTemplate
  extends ExerciseFormFieldDefaultTemplate {
  fieldType: 'NUMBER';
}

export interface ExerciseFormFIeldTimeTemplate
  extends ExerciseFormFieldDefaultTemplate {
  fieldType: 'TIME';
}

export type ExerciseFormFieldTemplate =
  | ExerciseFormFieldDefaultTemplate
  | ExerciseFormFIeldTimeTemplate
  | ExerciseFormFieldRangeTemplate
  | ExerciseFormFieldSelectTemplate
  | ExerciseFormFieldTextTemplate
  | ExerciseFormFieldRadioTemplate
  | ExerciseFormFieldDateTemplate
  | ExerciseFormFieldNumberTemplate;
