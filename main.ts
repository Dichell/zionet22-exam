import { School } from "./entities";
import { fullName } from "./helpers";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool } from "./services";

const school: School = initializeSchool();

printSchool(school);

// console.log("Exam 4:", fullName("Kole", "Dow"))

console.log(getClassYoungestStudentFullName(school.classes[0]));

