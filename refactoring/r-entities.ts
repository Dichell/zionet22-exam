export interface School {
    name: string;
    address: string;
    phone: number;
    classes: Classroom[];
}


export interface Classroom {
    name: string;
    teacher: Teacher;
    students: Student[];
};


export interface Teacher {
    firstName: string;
    lastName: string;
    professions: string[];
    fullName: string;
};


export interface Student {
    firstName: string;
    lastName: string;
    birthDate: Date;
    age: () => number;
    fullName: string;
};

