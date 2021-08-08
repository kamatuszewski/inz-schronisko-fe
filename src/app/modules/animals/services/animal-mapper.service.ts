import { IAnimalDetailsAdoption, IGeneralAdoption } from '../interfaces/animals.interface';

export class AnimalMapperService {
  public static generalAdoptionToDetailsAdoption = (data: IGeneralAdoption): IAnimalDetailsAdoption => {
    return {
      id: data.id,
      adopterFullName: `${data.adopter.firstName} ${data.adopter.lastName}`,
      employeeFullName: `${data.employee.firstName} ${data.employee.lastName}`,
      adoptionDate: data.adoptionDate,
      controlDate: data.controlDate
    }
  }
}
