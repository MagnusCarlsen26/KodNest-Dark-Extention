export default function taskHeader() {
    // Function to apply dark styles
    const applyStyles = () => {
        // v2-header
        const header = document.querySelector(".v2-header");
        if (header) {
            header.style.setProperty("background-color", "#121212", "important");
            header.style.setProperty("color", "#ffffff", "important");

            header.querySelectorAll(".bg-white, [class*='bg-[#fff]']").forEach(el => {
                el.style.setProperty("background-color", "#1e1e1e", "important");
                el.style.setProperty("color", "#ffffff", "important");
                el.style.setProperty("border-color", "#333", "important");
            });
        }

        // task-header
        const taskHeader = document.querySelector("#task-header");
        if (taskHeader) {
            taskHeader.style.setProperty("background-color", "#121212", "important");
            taskHeader.style.setProperty("color", "#ffffff", "important");
            taskHeader.style.setProperty("border-color", "#333", "important");

            taskHeader.querySelectorAll("[id^='practice-tab-']").forEach(tab => {
                tab.style.setProperty("background-color", "#1e1e1e", "important");
                tab.style.setProperty("color", "#ffffff", "important");
                tab.style.setProperty("border-color", "#333", "important");
            });

            const activeTab = document.querySelector("#practice-tab-STATEMENT");
            if (activeTab) {
                activeTab.style.setProperty("background-color", "#2a2a2a", "important");
                activeTab.style.setProperty("border-color", "#feba01", "important");
                activeTab.style.setProperty("color", "#ffffff", "important");
            }
        }
    };

    applyStyles(); // initial run

    if (!window.taskHeader) {
        const observer = new MutationObserver(() => {
            applyStyles();

            // Disconnect if not on practice page
            if (!window.location.href.includes("/practice/")) {
                observer.disconnect();
                window.darkHeaderObserver = null;
                console.log("MutationObserver disconnected for practice page.");
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        window.darkHeaderObserver = observer;
        console.log("MutationObserver started for practice page.");
    }
}
