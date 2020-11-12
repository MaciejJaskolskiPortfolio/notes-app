import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function matchValuesValidator(value: string, matched: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {
    const originalValue = group.get(value).value;
    const testedValue = group.get(matched).value;
    const conditions = originalValue !== testedValue && originalValue !== '' && testedValue !== '';
    if (!conditions) {
      group.get(matched).setErrors({ matchedValue: true });
      return { 'matchedValue': `${value} controlName and ${matched} controlName values do not match` };
    }
    return null;
  }
}
