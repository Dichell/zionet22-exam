import { firstNames, lastNames, teacherProff } from "../constants";
import { getRandomValueFromArray } from "../helpers";

class Teacher {
    firstName: string;
    lastName: string;
    professions: string[];

    constructor(){
        this.firstName = getRandomValueFromArray(firstNames);
        this.lastName = this.firstName.charAt(this.firstName.length - 1) === "a" ? 
            getRandomValueFromArray(lastNames) + "a"
            : getRandomValueFromArray(lastNames);
        this.professions = [getRandomValueFromArray(teacherProff)];

    }

    fullName () {
        return this.firstName + " " + this.lastName
    };
};











export type Student = {
    firstName: string;
    lastName: string;
    birthDate: Date;
    age: () => number;
    fullName: () => string;
};

export type Classroom = {
    name: string;
    teacher: Teacher;
    students: Student[];
};

export type School = {
    name: string;
    address: string;
    phone: string;
    classes: Classroom[];
}
