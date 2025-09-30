import Navbar from "../navbar/navbar";
import practiceCards from "../home/practiceCards";
import practiceTitles from "./practiceTitles";
import applyMutationObsToPage from "../utils/applyMutationObsToPage";
// TODO: Loading dark theme pending
// TODO: Filter dark theme pending
export default function practiceList() {

    Navbar();

    [
        pageBlack,
        practiceTitles,
        practiceCards,
    ].forEach(applyMutationObsToPage)

}

function pageBlack() {

    const el = document.querySelector(
        "#global-disable-select > div.layout-wrapper.MuiBox-root.css-33gw4 > div > div > div.pt-\\[2px\\].overflow-y-auto.h-full > div"
    );

    if (!el) return false;

    el.style.setProperty("background-color", "#000000", "important");

    return true;

}