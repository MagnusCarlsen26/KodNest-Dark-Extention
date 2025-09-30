export default function courseTabs() {

    injectStyles();

    // Select the actual tab blocks (your snippet’s inner <div> with many classes)
    const tabs = document.querySelectorAll(
        'div.cursor-pointer.space-x-2.flex.justify-center.items-center'
    );

    if (tabs.length === 0) return false;

    tabs.forEach(tab => {
        if (tab.dataset.darkCourseTab === "1") return;
        tab.dataset.darkCourseTab = "1";
        inlineForce(tab);
    });

    return true;
}

function inlineForce(el) {

    // text
    el.style.setProperty("color", "#e5e5e5", "important");
    el.querySelectorAll('.\\!text-black, .text-black, [class*="text-[#0A171C]"]').forEach(n => {
        n.style.setProperty("color", "#e5e5e5", "important");
    });
    
    // icons
    el.querySelectorAll("svg").forEach(svg => {
        svg.style.setProperty("color", "#e5e5e5", "important");
        svg.style.setProperty("fill", "currentColor", "important");
    });
}

function injectStyles() {

    const STYLE_ID = "__darkify_course_tabs_fix";
    if (!document.getElementById(STYLE_ID)) {
        const css = `
            /* Base (attach to the actual tab element) */
            [data-dark-course-tab="1"] {
                background: transparent !important;
                color: #e5e5e5 !important;
                border-bottom: 2px solid transparent !important;
            }

            /* Force override black text utilities */
            [data-dark-course-tab="1"].\\!text-black,
            [data-dark-course-tab="1"].text-black,
            [data-dark-course-tab="1"][class*="text-[#0A171C]"],
            [data-dark-course-tab="1"] .\\!text-black,
            [data-dark-course-tab="1"] .text-black,
            [data-dark-course-tab="1"] [class*="text-[#0A171C]"] {
                color: #e5e5e5 !important;
            }

            /* Icons follow text */
            [data-dark-course-tab="1"] svg {
                color: #e5e5e5 !important;
                fill: currentColor !important;
            }

            /* Active underline stays yellow */
            [data-dark-course-tab="1"].border-b-2 {
                border-bottom-color: #FEC834 !important;
            }

            /* Kill light hover */
            [data-dark-course-tab="1"]:hover {
                background: #1b1b1b !important;
            }

            /* Counters (yellow default in your snippet) */
            [data-dark-course-tab="1"] .bg-\\[\\#FAE16D\\] {
                background: rgba(254,200,52,0.2) !important;
                color: #FEC834 !important;
                border-color: transparent !important;
            }

            /* Optional: completed/upcoming variants if they exist */
            [data-dark-course-tab="1"] .bg-\\[\\#D4F8E8\\] { /* green */
                background: rgba(0,208,132,0.2) !important;
                color: #00D084 !important;
            }
            [data-dark-course-tab="1"] .bg-\\[\\#E5F5FF\\] { /* blue */
                background: rgba(6,147,227,0.2) !important;
                color: #0693E3 !important;
            }
        `.trim();

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = css;
        document.head.appendChild(style);
    }

}