export interface IConfirmDecisionModal extends IActionConfirmDecisionModal {
  description: string;
}

export interface IActionConfirmDecisionModal {
  accept: string;
  cancel: string;
}
