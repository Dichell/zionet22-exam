import { firstNames, lastNames, teacherProff } from "../constants";
import { getRandomValueFromArray } from "../helpers";


interface School {
    name: string;
    address: string;
    phone: number;
    classes: Classroom[];
}


interface Classroom {
    name: string;
    teacher: Teacher;
    students: Student[];
};


interface Teacher {
    firstName: string;
    lastName: string;
    professions: string[];
};


interface Student {
    firstName: string;
    lastName: string;
    birthDate: Date;
    age: () => number;
    fullName: () => string;
};
