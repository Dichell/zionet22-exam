import { Classroom, School, Student, Teacher } from "./r-entities";
import { fullName } from "../helpers";


export interface ISchool {
    school: School;
    createTeacher(firstName: string, lastPrepName: string, professions: string[]): Teacher;
    createStudent(firstName: string, lastPrepName: string, birthDate: Date): Student;
    createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom;
    getClassYoungestStudent(classroom: Classroom): string;
    transferStudent(fullName: string, fromClassroom: Classroom, toClassrom: Classroom): string;
    printSchool(school: School): void;
}


export class SchoolService implements ISchool {
    private _school: School;

    constructor(name?: string, address?: string, phone?: number, classes?: Classroom[]) {
        this._school = {
            name: name || "Default School Interface",
            address: address || "Default Neskiy-2",
            phone: phone || 78121703000,
            classes: classes || []
        };
    }

    public get school(): School {
        return this._school;
    }

    public createSchool (name: string, address: string, phone: number, classes: Classroom[]){
        this._school = {
            name,
            address,
            phone,
            classes
        }
    }

    public createTeacher(firstName: string, lastPrepName: string, professions: string[]): Teacher {
        let lastFinishName: string = lastPrepName;
        firstName.charAt(firstName.length - 1) == "a" ? lastFinishName = lastPrepName + "a" : lastFinishName = lastPrepName;  // add "a" ending of last name for girls
        return {
            firstName: firstName,
            lastName: lastFinishName,
            professions: professions,
            fullName: function (): string {
                return firstName + " " + lastFinishName;
            }
        }
    };


    public createStudent(firstName: string, lastPrepName: string, birthDate: Date): Student {
        let lastFinishName: string = "";
        firstName.charAt(firstName.length - 1) == "a" ? lastFinishName = lastPrepName + "a" : lastFinishName = lastPrepName;  // add "a" ending of last name for girls
        return {
            firstName,
            lastName: lastFinishName,
            birthDate,
            age: function (): number {
                const ageDiffMs = Date.now() - birthDate.getTime();
                const ageDate = new Date(ageDiffMs);
                return Math.abs(ageDate.getFullYear() - 1970);
            },
            fullName: function (): string {
                return firstName + " " + lastFinishName;
            }
        };
    }

    public createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
        return {
            name,
            teacher,
            students
        };
    }


    public getClassYoungestStudent(classroom: Classroom): string {
        const sortedStudents: Student[] = classroom.students.sort((a: Student, b: Student) => a.birthDate < b.birthDate ? 1 : -1)
        return fullName(sortedStudents[0]);
    }


    public transferStudent(fullName: string, fromClassroom: Classroom, toClassrom: Classroom): string {
        if (toClassrom) {
            const findFullnameIndex: number = fromClassroom.students.findIndex((a: Student) => a.fullName() === fullName);
            if (findFullnameIndex != -1) {
                const extractedStudent: Student[] = fromClassroom.students.splice(findFullnameIndex, 1);
                toClassrom.students = toClassrom.students.concat(extractedStudent);
                return `${fullName} transfered from ${fromClassroom.name} to ${toClassrom.name}`;
            } return `${fullName} not found`;
        } return "We have only 1 class";
    }


    public printSchool(school: School): void {
        console.log("School data:\n============");
        console.log(school.name);
        console.log(school.address);
        console.log(school.phone);
        console.log("\nClasses:\n============");

        let numberClass: number = 1;
        const sortedClasses: Classroom[] = school.classes.sort((a: Classroom, b: Classroom) => a.name < b.name ? -1 : 1)
        for (const classes of sortedClasses) {
            console.log(`\nClass ${numberClass}:`, classes.name);
            console.log("Teacher:", classes.teacher.fullName() + ", " + classes.teacher.professions);
            console.log("Students:");
            numberClass++;

            let numberStudent: number = 1;
            const sortedStudentsByLastName: Student[] = classes.students.sort((a: Student, b: Student) => (
                a.lastName + a.firstName).toLowerCase() < (b.lastName + b.firstName).toLowerCase() ? -1 : 1)

            for (const students of sortedStudentsByLastName) {
                console.log(`${numberStudent}: ${students.fullName()}: ${students.age()}`);
                numberStudent++;
            }
        }
        console.log("============\n");
    }
}