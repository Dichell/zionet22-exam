import { match } from "assert";
import { classesNames, firstNames, Geography, lastNames, Mathematics, teacherProff } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { fullName, getRandomBirthDate, getRandomValueFromArray } from "./helpers";

// export function createDynamoSchool ():School{
//     return{
//         name: "School Dynamo",
//         address: "Spb, Nevskiy-1",
//         phone: "+7-812-345-67-89",
//         classes: createDynamoClass()
//     }
// };

export function createDynamoClass(): School {

    const arrayOfClasses: Classroom[] = [];
    const randomNumClasses = Math.floor(Math.random() * (5 - 1 + 1) + 1);

    for (let numClasses = 0; numClasses < randomNumClasses; numClasses++) {
        const className: string = getRandomValueFromArray(classesNames);
        const teacher: Teacher = createTeacher(
            getRandomValueFromArray(firstNames),
            getRandomValueFromArray(lastNames),
            [getRandomValueFromArray(teacherProff)]);

        const arrayOfStudents: Student[] = [];
        const randomNumStudents = Math.floor(Math.random() * (30 - 3 + 3) + 3)

        for (let numStudents = 0; numStudents < randomNumStudents; numStudents++) {
            const students: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
            arrayOfStudents.push(students)
        }
        
        const classIsReady: Classroom = createClassroom(className, teacher, arrayOfStudents) 
        arrayOfClasses.push(classIsReady)
    } 
    return {
        name: "School Dynamo",
        address: "Spb, Nevskiy-1",
        phone: "+7-812-345-67-89",
        classes: arrayOfClasses
    };
};


function createTeacher(firstName: string, lastName: string, professions: string[]): Teacher {
    return {
        firstName,
        lastName,
        professions,
        fullName: function (): string {
            return firstName + " " + lastName;
        }
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName,
        lastName,
        birthDate,
        age: function (): number {
            const ageDiffMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDiffMs);
            return Math.abs(ageDate.getFullYear() - 1970);
        },
        fullName: function (): string {
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


console.log(createDynamoClass());
