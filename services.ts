// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date

import { match } from "assert";
import { firstNames, Geography, lastNames, Mathematics } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { fullName, getRandomBirthDate, getRandomValueFromArray } from "./helpers";


export function initializeSchool(): School {
    const student1: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student2: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student3: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student4: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher1: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Mathematics]);

    const student5: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student6: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student7: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student8: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher2: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Geography]);

    const mathClass: Classroom = createClassroom("Math", teacher1, [student1, student2, student3, student4]);
    const geographyClass: Classroom = createClassroom("Geography", teacher2, [student5, student6, student7, student8]);

    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            mathClass,
            geographyClass
        ]
    }
}


function createTeacher(firstName: string, lastName: string, professions: string[]): Teacher {
    return {
        firstName,
        lastName,
        professions,
        fullName: function ():string {
                return firstName + " " + lastName;
        }
    };
}


function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName,
        lastName,
        birthDate,
        age: function ():number {
                const ageDiffMs = Date.now() - birthDate.getTime();
                const ageDate = new Date(ageDiffMs);
                return Math.abs(ageDate.getFullYear() - 1970);
            },
        fullName: function ():string {
                return firstName + " " + lastName;
        }
    };
}


function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name,
        teacher,
        students
    };
}


export function getClassYoungestStudent(classroom: Classroom): string {
    const sortedStudents: Student[] = classroom.students.sort((a, b) => a.birthDate < b.birthDate ? 1 : -1)
    return fullName(sortedStudents[0]);
}


export function transferStudent(fullName: string, fromClassroom: Classroom, toClassrom: Classroom): Student[] | string {
    const findFullnameIndex: number = fromClassroom.students.findIndex(a => a.firstName === fullName);

    if (findFullnameIndex !== -1) {
        const extractedStudents: Student[] = fromClassroom.students.splice(findFullnameIndex, 1);
        return toClassrom.students = toClassrom.students.concat(extractedStudents);
    } return `${fullName} not found`;
}


export function printSchool(school: School): void {
    console.log("School data:\n============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);
    console.log("\nClasses:\n============");
    
    let numberClass: number = 1;
    const sortedClasses: Classroom[] = school.classes.sort((a, b) => a.name < b.name ? -1 : 1)
    for (const classes of sortedClasses) {
        console.log(`Class ${numberClass}:`, classes.name);
        console.log("Teacher:", classes.teacher.fullName() + ", " + classes.teacher.professions);
        console.log("Students:");
        numberClass++;

        let numberStudent: number = 1;
        const sortedStudentsByLastName: Student[] = classes.students.sort((a, b) => (
            a.lastName + a.firstName).toLowerCase() < (b.lastName + b.firstName).toLowerCase() ? -1 : 1)

        for (const students of sortedStudentsByLastName) {
            console.log(`${numberStudent}: ${students.fullName()}: ${students.age()}`);
            numberStudent++;
        }
    }
}

