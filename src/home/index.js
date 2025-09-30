import Navbar from "../navbar/navbar.js";
import courseCards from "./courseCards.js";
import broKodBanner from "./broKodBanner.js";
import practiceCards from "./practiceCards.js";
import attendanceCards from "./attendanceCards.js";
import pendingCards from "./pendingCards.js";
import footer from "./footer.js";
import placementCards from "./placementCards.js";
import applyMutationObsToPage from "../utils/applyMutationObsToPage.js";
import attentionCards from "./attentionCards.js";
// TODO: Not able to figure out footer
// TODO: Skipping ArrowButtons for now. Will do it later
// TODO: Community button got camouflaged.
// TODO: Styles are being injected in /home and some places in /practiceList. This is not the standard way to do. .style.setProperty() should be used everywhere in this project.
// TODO: Add style for self paced cards.
export default function Home() {
    
    const dashboard = document.querySelector("#dashboard-column");
    if (dashboard) {
        dashboard.style.backgroundColor = "#000000";
    }

    Navbar();

    [
        courseCards,
        broKodBanner,
        practiceCards,
        attendanceCards,
        pendingCards,
        footer,
        placementCards,
        attentionCards,
    ].forEach(applyMutationObsToPage)

}