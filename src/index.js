console.log("Hello World from index.js");
import Navbar from "./home/navbar/navbar.js";
import courseCards from "./home/courseCards.js";
import broKodBanner from "./home/broKodBanner.js";
import arrowButtons from "./home/arrowButtons.js";
import practiceCards from "./home/practiceCards.js";
import attendanceCards from "./home/attendanceCards.js";
import pendingCards from "./home/pendingCards.js";
import footer from "./home/footer.js";

console.log("KodNest Dark Extension: Content script loaded.");

document.querySelectorAll("#dashboard-column")[0].style.backgroundColor = "#000000";

// TODO: Colors aren't changing when changing pages. 
// Probably because of SPA

// TODO: Add border for various elements
// TODO: Update color for section headers
// TODO: SQL Live clas card has red border. Fix it
export default function main() {
    
    Navbar();
    courseCards();
    broKodBanner();
    practiceCards();
    attendanceCards();
    pendingCards();
    footer();
    // TODO: The below button doesnt make any change.
    arrowButtons(
        "#practice-section .flex.space-x-2 > button:first-child",
        "button[aria-label='Next practice item']",
        // {
        //     bg: "#0f1115",     // dark bg
        //     fg: "#f5f5f5",     // white text
        //     border: "#333",    // subtle border
        //     hoverBg: "#1e293b",// slightly lighter on hover
        //     hoverFg: "#fff",   // pure white hover text
        // }
    );

}