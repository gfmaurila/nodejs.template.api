// src/domain/enums/EGender.ts

export enum EGender {
  None = 0,
  Male = 1,
  Female = 2,
}

export function getGenderDescription(gender: EGender): string {
  switch (gender) {
    case EGender.Male:
      return 'Male';
    case EGender.Female:
      return 'Female';
    case EGender.None:
      return 'Não informar';
    default:
      return 'Unknown';
  }
}
