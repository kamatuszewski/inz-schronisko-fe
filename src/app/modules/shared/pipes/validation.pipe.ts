import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'validation'
})
export class ValidationPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  public transform(validationErrors: ValidationErrors, translocoKey = 'COMMON.ERRORS'): string {
    if (!validationErrors) {
      return null;
    }

    return Object.keys(validationErrors)
      .map(validation => this.translocoService.translate(`${translocoKey}.${validation}`))
      .join('\n')
      .trim();
  }

}
