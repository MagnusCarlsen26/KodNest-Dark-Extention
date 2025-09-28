export default function TestResults() {
    applyStyles();
    startObserver();
}

function getPanel() {
    return document.querySelector("#test-results");
}

function applyStyles() {
    const panel = getPanel();
    if (!panel) return;

    styleContainer(panel);
    styleActionButtons(panel);
    styleAccordionAndBorders(panel);
    styleTextAccents(panel);
    styleStatusIndicators(panel);
    styleCodeBlocks(panel);
    styleSectionLabels(panel);
    styleHeaderButtons(panel);
    styleScrollContainers(panel);
}

function styleContainer(panel) {
    panel.style.setProperty("background-color", "#0a0a0a", "important");
    panel.style.setProperty("color", "#e6e6e6", "important");
    panel.style.setProperty("border-color", "#1f1f1f", "important");
    panel.style.setProperty("box-shadow", "none", "important");
}

function styleActionButtons(panel) {
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
}

function styleAccordionAndBorders(panel) {
    panel.querySelectorAll(".course-task-accordion, [role='region'], .border-b, .border-t, .border-r, .border-l").forEach(el => {
        el.style.setProperty("background-color", "transparent", "important");
        el.style.setProperty("color", "#e6e6e6", "important");
        el.style.setProperty("border-color", "#262626", "important");
    });
}

function styleTextAccents(panel) {
    panel.querySelectorAll(".text-muted-foreground").forEach(el => {
        el.style.setProperty("color", "#9ca3af", "important");
    });
}

function styleStatusIndicators(panel) {
    panel.querySelectorAll(".text-green-600").forEach(el => el.style.setProperty("color", "#22c55e", "important"));
    panel.querySelectorAll(".text-red-600").forEach(el => el.style.setProperty("color", "#ef4444", "important"));
    panel.querySelectorAll(".bg-red-100").forEach(el => el.style.setProperty("background-color", "#3b0d0d", "important"));
}

function styleCodeBlocks(panel) {
    panel.querySelectorAll("pre, code, .bg-slate-100").forEach(el => {
        el.style.setProperty("background-color", "#0f172a", "important");
        el.style.setProperty("color", "#e5e7eb", "important");
        el.style.setProperty("border", "1px solid #1e293b", "important");
    });
}

function styleSectionLabels(panel) {
    panel.querySelectorAll("p.font-medium, p.font-medium *").forEach(el => {
        el.style.setProperty("color", "#fbbf24", "important");
    });
}

function styleHeaderButtons(panel) {
    panel.querySelectorAll("button.transparent-button").forEach(btn => {
        btn.style.setProperty("background-color", "transparent", "important");
        btn.style.setProperty("color", "#e6e6e6", "important");
        btn.style.setProperty("border", "none", "important");
    });
}

function styleScrollContainers(panel) {
    panel.querySelectorAll("#test-case-results, #test-case-container").forEach(scroller => {
        scroller.style.setProperty("background-color", "transparent", "important");
        scroller.style.setProperty("color", "#e6e6e6", "important");
    });
}

function startObserver() {
    if (window.testResultsObserver && typeof window.testResultsObserver.disconnect === "function") {
        try { window.testResultsObserver.disconnect(); } catch (e) {}
        window.testResultsObserver = null;
    }

    const target = getPanel() || document.body;
    const observer = new MutationObserver(() => {
        if (observer._raf) cancelAnimationFrame(observer._raf);
        observer._raf = requestAnimationFrame(() => {
            applyStyles();
            if (!window.location.href.includes("/practice/")) {
                observer.disconnect();
                window.testResultsObserver = null;
            }
        });
    });

    observer.observe(target, { childList: true, subtree: true });
    window.testResultsObserver = observer;
}

