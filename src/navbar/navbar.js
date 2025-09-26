import mentorConnectButton from "./mentorConnectButton.js";
import kodNestLogo from "./kodNestLogo.js";


export default function Navbar() {

    // Top level HTML for navbar
    const navbar = document.querySelectorAll("#app-header")[0];
    navbar.style.setProperty("background-color", "#000", "important");
        
    // Navbar buttons
    document.querySelectorAll("[id^='header-item-'] span").forEach(el => {
        el.style.setProperty("color", "#fff", "important");
    });

    // Kodnest logo
    kodNestLogo();
    
    mentorConnectButton();
    
    // TODO: Dark theme the bottom border
}

