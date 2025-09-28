export default function TestResults() {
    
    return [
        () => styleContainer(getPanel),
        () => styleActionButtons(getPanel),
        () => styleAccordionAndBorders(getPanel),
        () => styleTextAccents(getPanel),
        () => styleStatusIndicators(getPanel),
        () => styleCodeBlocks(getPanel),
        () => styleSectionLabels(getPanel),
        () => styleHeaderButtons(getPanel)  ,
        () => styleScrollContainers(getPanel),
    ]
}

function getPanel() {
    return document.querySelector("#test-results");
}

function styleContainer(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    panel.style.setProperty("background-color", "#0a0a0a", "important");
    panel.style.setProperty("color", "#e6e6e6", "important");
    panel.style.setProperty("border-color", "#1f1f1f", "important");
    panel.style.setProperty("box-shadow", "none", "important");
    return true;
}

function styleActionButtons(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    const runBtn = panel.querySelector("#run-code-btn");
    if (runBtn) {
        runBtn.style.setProperty("background-color", "transparent", "important");
        runBtn.style.setProperty("color", "#f5f5f5", "important");
        runBtn.style.setProperty("border-color", "#feba01", "important");
    }
    const submitBtn = panel.querySelector("#submit-code-btn");
    if (submitBtn) {
        submitBtn.style.setProperty("background-color", "#00BD78", "important");
        submitBtn.style.setProperty("color", "#ffffff", "important");
        submitBtn.style.setProperty("border", "0", "important");
    }
    return runBtn || submitBtn ? true : false;
}

function styleAccordionAndBorders(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    const elements = panel.querySelectorAll(".course-task-accordion, [role='region'], .border-b, .border-t, .border-r, .border-l");
    if (elements.length === 0) return false;

    elements.forEach(el => {
        el.style.setProperty("background-color", "transparent", "important");
        el.style.setProperty("color", "#e6e6e6", "important");
        el.style.setProperty("border-color", "#262626", "important");
    });
    return true;
}

function styleTextAccents(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    const accents = panel.querySelectorAll(".text-muted-foreground");
    if (accents.length === 0) return false;

    accents.forEach(el => {
        el.style.setProperty("color", "#9ca3af", "important");
    });
    return true;
}

function styleStatusIndicators(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    const greens = panel.querySelectorAll(".text-green-600");
    const reds = panel.querySelectorAll(".text-red-600");
    const redBgs = panel.querySelectorAll(".bg-red-100");

    if (greens.length === 0 && reds.length === 0 && redBgs.length === 0) return false;

    greens.forEach(el => el.style.setProperty("color", "#22c55e", "important"));
    reds.forEach(el => el.style.setProperty("color", "#ef4444", "important"));
    redBgs.forEach(el => el.style.setProperty("background-color", "#3b0d0d", "important"));
    return true;
}

function styleCodeBlocks(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    const codeBlocks = panel.querySelectorAll("pre, code, .bg-slate-100");
    if (codeBlocks.length === 0) return false;

    codeBlocks.forEach(el => {
        el.style.setProperty("background-color", "#0f172a", "important");
        el.style.setProperty("color", "#e5e7eb", "important");
        el.style.setProperty("border", "1px solid #1e293b", "important");
    });
    return true;
}

function styleSectionLabels(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    const labels = panel.querySelectorAll("p.font-medium, p.font-medium *");
    if (labels.length === 0) return false;

    labels.forEach(el => {
        el.style.setProperty("color", "#fbbf24", "important");
    });
    return true;
}

function styleHeaderButtons(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    const buttons = panel.querySelectorAll("button.transparent-button");
    if (buttons.length === 0) return false;

    buttons.forEach(btn => {
        btn.style.setProperty("background-color", "transparent", "important");
        btn.style.setProperty("color", "#e6e6e6", "important");
        btn.style.setProperty("border", "none", "important");
    });
    return true;
}

function styleScrollContainers(getPanel) {
    const panel = getPanel();
    if (!panel) return false;

    const scrollers = panel.querySelectorAll("#test-case-results, #test-case-container");
    if (scrollers.length === 0) return false;

    scrollers.forEach(scroller => {
        scroller.style.setProperty("background-color", "transparent", "important");
        scroller.style.setProperty("color", "#e6e6e6", "important");
    });
    return true;
}