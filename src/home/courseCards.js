// TODO: Change color of status according to the status.
// For example, upcoming, not started, live.

// TODO: Add border color in the circle.
export default function courseCards() {

    injectStyles();

    return [
        styleCourseCards
    ];
}

// TODO: java course says 'not started'. so its color should be red.
function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
    /* === Course Cards Dark Theme === */

    /* Card container */
    [id^="live-course-card-"] .dashboard-card {
        background-color: #121212 !important;  /* dark base */
        color: #f5f5f5 !important;             /* light text */
        border: 1px solid #333 !important;     /* subtle border */
    }

    /* Top gradient bar stays same (accent) */
    [id^="live-course-card-"] .bg-gradient-to-r {
        height: 6px !important;
    }

    /* Titles */
    [id^="live-course-card-"] #course-name- {
        color: #ffffff !important;
    }

    /* Subtext (Mentor name, muted text) */
    [id^="live-course-card-"] .text-muted,
    [id^="live-course-card-"] .text-gray-500,
    [id^="live-course-card-"] .text-gray-700 {
        color: #bbbbbb !important;
    }

    /* Status badge */
    [id^="course-status-badge-"] {
        background-color: rgba(0, 255, 0, 0.15) !important;
        border-color: #00ff00 !important;
        color: #00ff00 !important;
    }

    /* Progress bar background */
    [id^="live-course-card-"] [role="progressbar"] {
        background-color: #333 !important;
    }
    /* Progress bar fill */
    [id^="live-course-card-"] [role="progressbar"] > div {
        background-color: #00ff99 !important;
    }

    /* Footer area (Help Desk + buttons) */
    [id^="live-course-card-"] .border-t {
        background-color: #1e1e1e !important;
        border-color: #333 !important;
    }

    /* Buttons */
    [id^="live-course-card-"] button {
        background-color: transparent !important;
        color: #f5f5f5 !important;
    }
    [id^="live-course-card-"] button:hover {
        background-color: #333 !important;
        color: #fff !important;
    }

    /* Icons */
    [id^="live-course-card-"] svg {
        stroke: #f5f5f5 !important;
        color: #f5f5f5 !important;
    }
    `;
    document.head.appendChild(style);
}

function styleCourseCards() {
    const cards = document.querySelectorAll('[id^="live-course-card-"] .dashboard-card');
    return cards.length > 0;
}
