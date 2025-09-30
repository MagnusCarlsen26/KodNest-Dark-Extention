export default function Navbar() {

    const header = document.querySelector(".v2-header");

    if (!header) return false;

    // Header base
    header.style.setProperty("background-color", "#121212", "important");
    header.style.setProperty("color", "#ffffff", "important");

    // Override all white/light elements inside header
    header.querySelectorAll(".bg-white, [class*='bg-\\[\\#fff\\]']").forEach(el => {
        el.style.setProperty("background-color", "#1e1e1e", "important");
        el.style.setProperty("color", "#ffffff", "important");
        el.style.setProperty("border-color", "#333", "important");
    });
    
    return true;

}