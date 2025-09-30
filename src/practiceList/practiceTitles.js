export default function practiceTitles() {

    const elements = document.querySelectorAll(
        '#global-disable-select .pt-\\[2px\\].overflow-y-auto.h-full .flex.justify-between.items-center > p'
    );

    if (elements) return false;

    if (elements.length > 0) {
        elements.forEach(el => {
            el.style.color = "white";
            el.style.fontWeight = "bold";
            el.style.fontSize = "14px";
        });
        
        return true;

    }

    return false;
}
