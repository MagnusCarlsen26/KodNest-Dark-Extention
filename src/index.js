console.log("Hello World from index.js");
import Navbar from "./home/navbar/navbar.js";

// content.js

console.log("KodNest Dark Extension: Content script loaded.");

document.querySelectorAll("#dashboard-column")[0].style.backgroundColor = "#000000";

export default function main() {
    
    Navbar();
    
}