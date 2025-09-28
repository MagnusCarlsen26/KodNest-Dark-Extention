console.log("Hello World from index.js");
import Home from "./home/index.js";
import practiceQuestion from "./practiceQuestion/practiceQuestion.js";

console.log("KodNest Dark Extension: Content script loaded.");
// TODO: Colors aren't changing when changing pages. 
// Probably because of SPA

// TODO: Dark theme for loading components.
// TODO: How will the errors handled?
export default function main() {

    const currentURL = window.location.href;
    const baseURL = "https://app.kodnest.com/my-learning";
    const path = currentURL.replace(baseURL, "");


    if (path === "/home") Home();
    else if (/^\/practice\/.+/.test(path)) practiceQuestion();
    else console.log("Unknown path: ", path);
}