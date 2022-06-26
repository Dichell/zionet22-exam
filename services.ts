// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date

import { firstNames, Geography, lastNames, Mathematics } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { getRandomBirthDate, getRandomValueFromArray } from "./helpers";

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
        firstName: firstName,
        lastName: lastName,
        professions: professions
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        age: () => {
            return 0;
        }
    };
}

function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name: name,
        teacher: teacher,
        students: students
    };
}

export function getClassYoungestStudent(classroom: Classroom): string {
    return classroom.students[1].firstName;
}

export function getAge(student: Student): number {
    const ageDifferentMs: number = Date.now() - student.birthDate.getTime();
    let ageDate: Date = new Date(ageDifferentMs)
    return Math.abs(ageDate.getUTCFullYear() - 1969);
};

export function printSchool(school: School): void {

    console.log("School data:");
    console.log("============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);
    console.log("");
    console.log("Classes:");
    console.log("============");
    let numClass: number = 1;
    for (let i = 0; i < school.classes.length; i++) {
        console.log(`Class ${numClass}:`, school.classes[i].name);
        console.log("Teacher:", school.classes[i].teacher.firstName + " " + school.classes[i].teacher.lastName + ", " + school.classes[i].teacher.professions);
        console.log("Students:");
        numClass++;
        let numStudent: number = 1;
        for (let j = 0; j < school.classes[i].students.length; j++){
            console.log(`${numStudent}: ${school.classes[i].students[j].firstName} ${school.classes[i].students[j].lastName}:`,getAge(school.classes[i].students[j]));
            numStudent++;
        }
    }


}
