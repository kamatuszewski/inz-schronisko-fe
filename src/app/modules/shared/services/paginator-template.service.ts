import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class PaginatorTemplateService extends MatPaginatorIntl {
  constructor(private translate: TranslocoService) {
    super();
    this.makeTranslations();
  }

  public getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    const start = page + 1;
    const end = Math.ceil(length / pageSize);
    return `${start} / ${end}`;
  }

  private makeTranslations(): void {
    this.nextPageLabel = this.translate.translate('COMMON.PAGINATION.NEXT')
    this.previousPageLabel = this.translate.translate('COMMON.PAGINATION.BACK')
  }
}
