import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { digitalRegexp } from '../../core/commons/regexp.common';

export class FormUtilsService {
  public static markAllAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markAllAsTouched(control as FormGroup);
      }
    })
  }

  public static onlyDigitalValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }
      return !digitalRegexp.test(control.value) ? {onlyDigits: control.value, onlyDigits2: control.value} : null;
    }
  }
}
