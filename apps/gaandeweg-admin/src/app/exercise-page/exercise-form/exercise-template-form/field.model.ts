export interface ExerciseFormFieldTemplate {
  fieldId: number;
  fieldType: 'RANGE' | 'TEXT' | 'NUMBER' | 'TIME' | 'DATE' | 'SELECT' | 'RADIO';
  fieldName: string;
  fieldText: string;
  fieldInfo?: string;
  fieldOptions?: {
    min: 0 | 1;
    max: number;
    step: number;
    snaps: boolean;
    icons: RangeLabel[];
  };
  fieldValues?: ExerciseOption[];
  fieldRepeatable?: boolean;
  fieldRepeat?: number;
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
