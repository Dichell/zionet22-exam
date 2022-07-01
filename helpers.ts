import { Student, Teacher } from "./entities";

export function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomBirthDate(): Date {
    const year: number = 2011 - (Math.floor(Math.random() * 3));
    const month: number = Math.floor(Math.random() * 12);
    const day: number = Math.floor(Math.random() * 29);
    return new Date(year, month, day);
}


export function fullName(fName: string, lName: string): string {
    return fName + " " + lName;
}

export function ifFirstNameIsGirls (fName: string, lName: string): string{
    let lastFinishName: string = lName;
    fName.charAt(fName.length - 1) == "a" ? lastFinishName = lName + "a"  : lastFinishName = lName;  // add "a" ending of last name for girls
    return lastFinishName;
}
