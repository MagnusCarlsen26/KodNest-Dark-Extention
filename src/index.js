console.log("Hello World from index.js");
import Home from "./home/index.js";
import ClassList from "./classList/classList.js";
import PracticeList from "./practiceList/practiceList.js";
import practiceQuestion from "./practiceQuestion/practiceQuestion.js";
console.log("KodNest Dark Extension: Content script loaded.");
// TODO: Colors aren't changing when changing pages. 
// Probably because of SPA

// TODO: Dark theme for loading components.
// TODO: How will the errors handled?
// --may be collect the errors from user via https? 
// TODO: Make a components file in src and put all code there. Rename /home/index.js to /home/home.js
export default function main() {

    const currentURL = window.location.href;
    const baseURL = "https://app.kodnest.com/my-learning";
    const path = currentURL.replace(baseURL, "");


    if (path === "/home") Home();
    else if (path === "/class/list") ClassList();
    else if (path === "/practice/list") PracticeList();
    // TODO: More specific paths should be checked here.
    else if (/^\/practice\/.+/.test(path)) practiceQuestion();
    else console.error("Unknown path: ", path);
}