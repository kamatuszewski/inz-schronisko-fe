import { IAnimalForm } from '../interfaces/animal-form.interface';
import { IAnimalDetailsAdoption, IGeneralAdoption, IGeneralAnimal } from '../interfaces/animals.interface';

export class AnimalMapperService {
  public static generalAdoptionToDetailsAdoption = (data: IGeneralAdoption): IAnimalDetailsAdoption => {
    return {
      id: data.id,
      adopterFullName: `${data.adopter.firstName} ${data.adopter.lastName}`,
      employeeFullName: `${data.employee.firstName} ${data.employee.lastName}`,
      adoptionDate: data.adoptionDate,
      details: {
        address: data.adopter.address,
        email: data.adopter.email,
        phoneNumber: data.adopter.phoneNumber
      }
    }
  }

  public static generalAnimalToFormAnimal = (data: IGeneralAnimal): IAnimalForm => {
    return {
      id: data.id,
      birthDate: data.birthDate,
      speciesId: data.species.id,
      foundDate: data.foundDate,
      foundPlace: data.foundPlace,
      name: data.name,
      sex: data.sex,
      statusId: data.status.id,
      chipNumber: data.chipNumber
    }
  }
}
