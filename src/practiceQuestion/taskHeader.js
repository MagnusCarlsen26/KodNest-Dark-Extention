export default function taskHeader() {
    
    return [
        styleHeaderWrapper,
        styleHeaderInnerBackgrounds,
        styleTaskHeaderWrapper,
        stylePracticeTabs,
        styleActiveTab,
    ]
}

function styleHeaderWrapper() {
    const header = document.querySelector(".v2-header");
    if (!header) return false;

    header.style.setProperty("background-color", "#121212", "important");
    header.style.setProperty("color", "#ffffff", "important");
    return true;
}

function styleHeaderInnerBackgrounds() {
    const header = document.querySelector(".v2-header");
    if (!header) return false;

    const inner = header.querySelectorAll(".bg-white, [class*='bg-[#fff]']");
    if (inner.length === 0) return false;

    inner.forEach(el => {
        el.style.setProperty("background-color", "#1e1e1e", "important");
        el.style.setProperty("color", "#ffffff", "important");
        el.style.setProperty("border-color", "#333", "important");
    });
    return true;
}

function styleTaskHeaderWrapper() {
    const taskHeader = document.querySelector("#task-header");
    if (!taskHeader) return false;

    taskHeader.style.setProperty("background-color", "#121212", "important");
    taskHeader.style.setProperty("color", "#ffffff", "important");
    taskHeader.style.setProperty("border-color", "#333", "important");
    return true;
}

function stylePracticeTabs() {
    const taskHeader = document.querySelector("#task-header");
    if (!taskHeader) return false;

    const tabs = taskHeader.querySelectorAll("[id^='practice-tab-']");
    if (tabs.length === 0) return false;

    tabs.forEach(tab => {
        tab.style.setProperty("background-color", "#1e1e1e", "important");
        tab.style.setProperty("color", "#ffffff", "important");
        tab.style.setProperty("border-color", "#333", "important");
    });
    return true;
}

function styleActiveTab() {
    const activeTab = document.querySelector("#practice-tab-STATEMENT");
    if (!activeTab) return false;

    activeTab.style.setProperty("background-color", "#2a2a2a", "important");
    activeTab.style.setProperty("border-color", "#feba01", "important");
    activeTab.style.setProperty("color", "#ffffff", "important");
    return true;
}
