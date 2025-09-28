import Navbar from "./Navbar.js";
import taskHeader from "./taskHeader.js";
import taskDescription from "./taskDescription.js";
import Footer from "./footer.js";
import CompileLanguage from "./CompileLanguage.js";
import TestResults from "./testResults.js";

// TODO: One of the functions is throwing selector not fouund
// error. Probably in taskDescription() 
export default function practiceQuestion() {

    Navbar();
    taskHeader();
    taskDescription();
    CompileLanguage();
    TestResults();
    Footer();
}