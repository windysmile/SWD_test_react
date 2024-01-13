
export interface IPerson {
    key: string;
    prefix: string;
    name: string;
    birthDate: string;
    nationality: string;
    idCard: string;
    gender: string;
    zoneNumber: string;
    phoneNumber: string;
    passport: string;
    expectedSalary: string;
}

export interface IPersonLists {
    persons: IPerson[];
}

export interface IIdCardInput {
    textLenght: number;
    text: string
}