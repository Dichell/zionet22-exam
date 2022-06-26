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
    const sortedStudents: Student[] = classroom.students.sort((a, b) => getAge(a) - getAge(b))
    return fullName(sortedStudents[0]);
}


export function getAge(student: Student): number {
    const ageDifferentMs: number = Date.now() - student.birthDate.getTime();
    let ageDate: Date = new Date(ageDifferentMs)
    return Math.abs(ageDate.getUTCFullYear() - 1969);
};


export function transferStudent(fullName: string, fromClassroom: Classroom, toClassrom: Classroom): void {
    
}


export function printSchool(school: School): void {
    console.log("School data:\n============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);
    console.log("\nClasses:\n============");
    
    let orderClass: number = 1;
    const sortedClasses: Classroom[] = school.classes.sort((a, b) => a.name < b.name ? -1 : 1)
    for (const classes of sortedClasses) {
        console.log(`Class ${orderClass}:`, classes.name);
        console.log("Teacher:", classes.teacher.firstName + " " + classes.teacher.lastName + ", " + classes.teacher.professions);
        console.log("Students:");
        orderClass++;

        let orderStudents: number = 1;
        const sortedStudentsByLastName: Student[] = classes.students.sort((a, b) => (
            a.lastName + a.firstName).toLowerCase() < (b.lastName + b.firstName).toLowerCase() ? -1 : 1)
        for (const students of sortedStudentsByLastName) {
            console.log(`${orderStudents}: ${students.firstName} ${students.lastName}:`, getAge(students));
            orderStudents++;
        }
    }
}

