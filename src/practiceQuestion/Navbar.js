export default function Navbar() {
    // Function to apply dark header styles
    const applyStyles = () => {
        const header = document.querySelector(".v2-header");

        if (header) {
            // Header base
            header.style.setProperty("background-color", "#121212", "important");
            header.style.setProperty("color", "#ffffff", "important");

            // Override all white/light elements inside header
            header.querySelectorAll(".bg-white, [class*='bg-[#fff]']").forEach(el => {
                el.style.setProperty("background-color", "#1e1e1e", "important");
                el.style.setProperty("color", "#ffffff", "important");
                el.style.setProperty("border-color", "#333", "important");
            });
        }
    };

    applyStyles(); // Apply initial styles

    // Ensure only one observer is created and active for practice pages
    if (!window.darkHeaderObserver) {
        const observer = new MutationObserver((mutations) => {
            applyStyles(); // Re-apply styles on mutation

            // Disconnect if no longer on a practice page
            if (!window.location.href.includes("/practice/")) {
                observer.disconnect();
                window.darkHeaderObserver = null; // Clear global reference
                console.log("MutationObserver disconnected for practice page.");
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        window.darkHeaderObserver = observer; // Store globally
        console.log("MutationObserver started for practice page.");
    }
}