import { classesNames, firstNames, lastNames, teacherProff } from "../constants";
import { Student } from "../entities";
import { getRandomBirthDate, getRandomValueFromArray } from "../helpers";
import { Classroom, Teacher } from "./r-entities";
import { SchoolService } from "./r-services";

export function initialize(): void {

    initializeSchool();
}


function initializeSchool(): void {
    const school2: SchoolService = createInitialazingSchool();
    school2.printSchool(school2.school);
    console.log("Yongest student from class 1:", school2.getClassYoungestStudent(school2.school.classes[0]), "\n");
    console.log("Transfer:", school2.transferStudent("Olga Ivanova", school2.school.classes[0], school2.school.classes[1]), "\n");
    school2.printSchool(school2.school);
    console.log(school2.school.classes[0].students.length)
}


function createInitialazingSchool(): SchoolService {

    const school2: SchoolService = new SchoolService()
    school2.createSchool("REF-School", "REF-Nevskiy-2", 88121703002, arrayOfClasses())
    
    function arrayOfClasses(): Classroom[] {
        const arrayOfClasses: Classroom[] = [];

        const randomNumClasses = Math.floor(Math.random() * 5 + 1);

        for (let numClasses = 0; numClasses < randomNumClasses; numClasses++) {
            const className: string = getRandomValueFromArray(classesNames);
            const teacher: Teacher = school2.createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [getRandomValueFromArray(teacherProff)]);

            const arrayOfStudents: Student[] = [];
            const randomNumStudents = Math.floor(Math.random() * 30 + 3)

            for (let numStudents = 0; numStudents < randomNumStudents; numStudents++) {
                const students: Student = school2.createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
                arrayOfStudents.push(students)
            }

            const classIsReady: Classroom = school2.createClassroom(className, teacher, arrayOfStudents)
            arrayOfClasses.push(classIsReady)

        }
        return arrayOfClasses;
    }

    return school2;
}
