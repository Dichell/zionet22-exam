import { School } from "./entities";
import { fullName } from "./helpers";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool } from "./services";

const school: School = initializeSchool();

printSchool(school);

console.log("\nExam 4:", fullName(school.classes[0].students[0]))

console.log("\nExam 5:", getClassYoungestStudentFullName(school.classes[0]));

