import { School } from "./entities";
import { fullName } from "./helpers";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool, transferStudent } from "./services";

const school: School = initializeSchool();

printSchool(school);

console.log("\nExam 4 - FullName:", fullName(school.classes[0].students[0]), "\n")

console.log("Exam 5 - Yongest Student:", getClassYoungestStudentFullName(school.classes[0]), "\n");

console.log("Transfer:", transferStudent("Ivan", school.classes[0], school.classes[1]), "\n");
printSchool(school);
