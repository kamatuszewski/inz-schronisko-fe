export interface IVetDictionary {
  name: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IMedication extends IVetDictionary {}

// tslint:disable-next-line:no-empty-interface
export interface ITreatment extends IVetDictionary {}
