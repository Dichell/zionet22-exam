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

function createDynamoClass(): School {

    const arrayOfClass: Classroom[] = [];

    const randomNumClasses = Math.floor(Math.random() * (5 - 1 + 1) + 1)
    const randomNumStudents = Math.floor(Math.random() * (30 - 3 + 3) + 3)
    
    for (let numClasses = 0; numClasses < randomNumClasses; numClasses++) {
        const className: string = getRandomValueFromArray(classesNames);
        const teacher: Teacher = createTeacher(
            getRandomValueFromArray(firstNames), 
            getRandomValueFromArray(lastNames), 
            [getRandomValueFromArray(teacherProff)]);
            
        const arrayOfStudents: Student[] = [];
        for (let numStudents = 0; numStudents < randomNumStudents; numStudents++) {
            const students: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
            arrayOfStudents.push(students)
        }
        arrayOfClass.push(className, teacher, arrayOfStudents)
    
    }    return arrayOfClass;
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


console.log(createDynamoClass());
