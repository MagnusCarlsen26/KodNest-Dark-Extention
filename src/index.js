console.log("Hello World from index.js");
import Home from "./home/index.js";

console.log("KodNest Dark Extension: Content script loaded.");
// TODO: Colors aren't changing when changing pages. 
// Probably because of SPA

// TODO: Dark theme for loading components.
// TODO: How will the errors handled?
export default function main() {
    
    Home();

}