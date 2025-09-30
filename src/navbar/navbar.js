import mentorConnectButton from "./mentorConnectButton.js";
import kodNestLogo from "./kodNestLogo.js";
import applyMutationObsToPage from "../utils/applyMutationObsToPage.js";

export default function Navbar() {

    [
        styleShellNavbar,
        mentorConnectButton,
        kodNestLogo,
    ].forEach(applyMutationObsToPage)
    
    // TODO: Dark theme the bottom border
}

function styleShellNavbar() {
    
    const navbar = document.querySelector("#app-header");
    if (!navbar) return false;

    // Top level HTML for navbar
    navbar.style.setProperty("background-color", "#000", "important");
        
    // Navbar buttons
    document.querySelectorAll("[id^='header-item-'] span").forEach(el => {
        el.style.setProperty("color", "#fff", "important");
    });
    
    return true;
}