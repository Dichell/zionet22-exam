import { match } from "assert";
import { classesNames, firstNames, lastNames, teacherProff } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { fullName, getRandomBirthDate, getRandomValueFromArray, ifFirstNameIsGirls } from "./helpers";


export function createDynamoClass(): School {

    const arrayOfClasses: Classroom[] = [];
    const randomNumClasses = Math.floor(Math.random() * 5 + 1);

    for (let numClasses = 0; numClasses < randomNumClasses; numClasses++) {
        const className: string = getRandomValueFromArray(classesNames);
        const teacher: Teacher = createTeacher(
            getRandomValueFromArray(firstNames),
            getRandomValueFromArray(lastNames),
            [getRandomValueFromArray(teacherProff)]
            );

        const arrayOfStudents: Student[] = [];
        const randomNumStudents = Math.floor(Math.random() * 30 + 3)

        for (let numStudents = 0; numStudents < randomNumStudents; numStudents++) {
            const students: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
            arrayOfStudents.push(students)
        }
        
        const classIsReady: Classroom = createClassroom(className, teacher, arrayOfStudents) 
        arrayOfClasses.push(classIsReady)
    } 
    return {
        name: "School Dynamo",
        address: "Spb, Nevskiy-1D",
        phone: "+7-812-345-67-89",
        classes: arrayOfClasses
    };
};

function createTeacher(firstName: string, lastPrepName: string, professions: string[]): Teacher {
    const lastFinishName: string = ifFirstNameIsGirls(firstName,lastPrepName);
    return {
        firstName: firstName,
        lastName: lastFinishName,
        professions: professions,
        fullName: fullName(firstName, lastFinishName)
    };
}

function createStudent(firstName: string, lastPrepName: string, birthDate: Date): Student {
    const lastFinishName: string = ifFirstNameIsGirls(firstName,lastPrepName);
    return {
        firstName,
        lastName: ifFirstNameIsGirls(firstName,lastPrepName),
        birthDate,
        age: function (): number {
            const ageDiffMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDiffMs);
            return Math.abs(ageDate.getFullYear() - 1970);
        },
        fullName: fullName(firstName, lastFinishName)        
    };
}

function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name,
        teacher,
        students
    };
}

