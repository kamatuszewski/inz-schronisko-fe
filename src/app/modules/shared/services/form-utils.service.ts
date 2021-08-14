import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { digitalRegexp, emailRegexp, peselRegexp, phoneNumberRegexp } from '../../core/commons/regexp.common';

export class FormUtilsService {
  public static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }
      return !emailRegexp.test(control.value) ? {email: control.value} : null;
    }
  }

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
      return !digitalRegexp.test(control.value) ? {onlyDigits: control.value} : null;
    }
  }

  public static peselValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }
      return !peselRegexp.test(control.value) ? {pesel: control.value} : null;
    }
  }

  public static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }
      return !phoneNumberRegexp.test(control.value) ? {phone: control.value} : null;
    }
  }
}
