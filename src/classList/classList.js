import Navbar from "../navbar/navbar.js";
import courseCards from "./courseCards.js";

export default function ClassList() {

    pageBlack();

    Navbar();
    courseCards();

}

function pageBlack() {

    const applyGlobalDisableSelectStyle = () => {
        const el = document.querySelector(
            "#global-disable-select > div.layout-wrapper.MuiBox-root.css-33gw4 > div > div > div.pt-\\[2px\\].overflow-y-auto.h-full > div"
        );

        if (el) {
            el.style.setProperty("background-color", "#000000", "important");
            console.log("Applied background color to global disable select");
            return true;
        }
        console.log("Global disable select not found");
        return false;
    };

    if (!applyGlobalDisableSelectStyle()) {
        const observer = new MutationObserver((mutations, obs) => {
            if (applyGlobalDisableSelectStyle()) {
                obs.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
}