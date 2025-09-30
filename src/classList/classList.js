import Navbar from "../navbar/navbar.js";
import courseCards from "./courseCards.js";
import courseTabs from "./courseTabs.js";
// import { darkifyComboboxButtons, darkifyComboboxDropdowns } from "./filter.js";
import applyMutationObsToPage from "../utils/applyMutationObsToPage.js";

export default function ClassList() {

    Navbar();
    
    
    [
        pageBlack,
        courseTabs,
        courseCards,
    //     // darkifyComboboxButtons,
    //     // darkifyComboboxDropdowns,
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