import mentorConnectButton from "./mentorConnectButton.js";
import kodNestLogo from "./kodNestLogo.js";

function onElementReady(selector, callback) {
    const existing = document.querySelector(selector);
    if (existing) {
        callback(existing);
        return;
    }
    const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
            observer.disconnect();
            callback(el);
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

export default function Navbar() {

    onElementReady("#app-header", (navbar) => {
        // Top level HTML for navbar
        navbar.style.setProperty("background-color", "#000", "important");
            
        // Navbar buttons
        document.querySelectorAll("[id^='header-item-'] span").forEach(el => {
            el.style.setProperty("color", "#fff", "important");
        });

        // Kodnest logo
        kodNestLogo();
        
        mentorConnectButton();
    });
    
    // TODO: Dark theme the bottom border
}

