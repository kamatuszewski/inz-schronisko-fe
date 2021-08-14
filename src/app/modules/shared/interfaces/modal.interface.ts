import { Observable } from 'rxjs';
import { IGenericDictionary } from './generic.interface';

export interface IConfirmDecisionModal extends IActionModal {
  description: string;
}

export interface IActionModal {
  accept: string;
  cancel: string;
}

export interface IAddChipModal extends IActionModal {
  additionalField?: string;
  additionalType?: string;
  list$: Observable<IGenericDictionary[]>,
  prefix?: string;
  translocoPrefix: string;
}
