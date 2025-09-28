import Navbar from "../navbar/navbar.js";
import courseCards from "./courseCards.js";
import broKodBanner from "./broKodBanner.js";
import practiceCards from "./practiceCards.js";
import attendanceCards from "./attendanceCards.js";
import pendingCards from "./pendingCards.js";
import footer from "./footer.js";
import placementCards from "./placementCards.js";
import ArrowButtons from "./arrowButtons.js";

// TODO: Not able to figure out footer
export default function Home() {
    
    const dashboard = document.querySelector("#dashboard-column");
    if (dashboard) {
        dashboard.style.backgroundColor = "#000000";
    }
    
    Navbar();
    courseCards();
    broKodBanner();
    practiceCards();
    attendanceCards();
    pendingCards();
    footer();
    placementCards();
    // TODO: The below button doesnt make any change.
    ArrowButtons(
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