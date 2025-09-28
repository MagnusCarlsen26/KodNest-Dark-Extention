export default function practiceTitles() {
    const applyPracticeTitlesStyle = () => {
        const elements = document.querySelectorAll(
            '#global-disable-select .pt-\\[2px\\].overflow-y-auto.h-full .flex.justify-between.items-center > p'
        );

        if (elements.length > 0) {
            elements.forEach(el => {
                el.style.color = "white";       // text color
                el.style.fontWeight = "bold";   // example styling
                el.style.fontSize = "14px";     // adjust size if needed
            });
            console.log(`Applied styling to ${elements.length} <p> elements`);
            return true;
        } else {
            console.log("No matching <p> elements found");
            return false;
        }
    };

    if (!applyPracticeTitlesStyle()) {
        const observer = new MutationObserver((mutations, obs) => {
            if (applyPracticeTitlesStyle()) {
                obs.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
}
