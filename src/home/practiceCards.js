export default function practiceCards() {
    return [stylePracticeCards];
}

// TODO: Styling for Left arrow in continue button.
function stylePracticeCards() {

    const cards = document.querySelectorAll(".dashboard-card");
    if (!cards.length) return false;

    let isLoaded = false;
    cards.forEach((card) => {
        
        const level = detectLevel(card);
        const ACCENT = ACCENTS[level] || ACCENTS.default;

        if (level) isLoaded = true;
        else return;

        styleCardShell(card, DARK);
        styleTitle(card, DARK, ACCENT);
        styleHeader(card, DARK);        
        styleProgress(card, DARK);
        styleProgressBar(card, DARK, ACCENT);
        styleIconBubble(card, DARK);
        styleBodyText(card, DARK);
        styleButtons(card, DARK, ACCENT);
        styleAllSVGs(card, ACCENT);
        styleFooter(card, DARK);

    });

    return isLoaded;
}


// Detect level (beginner / intermediate / advanced)
function detectLevel(card) {

    let level = null;
    let REGEX = /beginner|intermediate|advanced/;
    
    const levelNode = Array.from(card.querySelectorAll("*")).find((el) => {
        const t = (el.textContent || "").trim().toLowerCase();
        return REGEX.test(t);
    });

    if (levelNode) {
        const t = levelNode.textContent.toLowerCase();

        if (t.includes("beginner")) level = "beginner";
        else if (t.includes("intermediate")) level = "intermediate";
        else if (t.includes("advanced")) level = "advanced";
    }

    return level;

}

// Progress summary on the right (“Progress” + percent)
function styleProgress(card, DARK) {

    const rightSummary = Array.from(card.querySelectorAll("p, span")).filter((el) =>
        (el.textContent || "").toLowerCase().includes("progress")
    );
    rightSummary.forEach((el) => el.style.setProperty("color", DARK.subtext, "important"));

    const rightPercent = Array.from(card.querySelectorAll("span, p")).find((el) =>
        (el.textContent || "").trim().endsWith("%")
    );

    if (rightPercent) rightPercent.style.setProperty("color", DARK.text, "important");
}

// Progress bar (track + fill)
function styleProgressBar(card, DARK, ACCENT) {

    const track = card.querySelector(".h-2, .h-1\\.5, .rounded-full.bg-gray-100");
    if (track) {
        track.style.setProperty("background-color", DARK.muted, "important");
        track.style.setProperty("border", `1px solid ${DARK.border}`, "important");
    }

    const fill = track?.querySelector("div[role='progressbar']") || card.querySelector("[role='progressbar']");
    if (fill) {
        fill.style.setProperty("background-color", ACCENT.hex, "important");
    }
}

// Footer separators that were light
function styleFooter(card, DARK) {

    const footers = card.querySelectorAll(".sm\\:border-t, .border-gray-100");
    footers.forEach((f) => {
        f.style.setProperty("border-color", DARK.border, "important");
        f.style.setProperty("background-color", "black", "important");
    });

}

function styleAllSVGs(card, ACCENT) {
    const svg = card.querySelectorAll("svg");
    console.log("svg", svg);
    svg.forEach((svg) => {
        svg.style.setProperty("color", ACCENT.hex, "important");
    });
}

function styleIconBubble(card, DARK) {
    const iconBubble = Array.from(card.querySelectorAll("div.rounded-full")).find((el) =>
        el.classList.contains("p-2") || el.classList.contains("p-1.5")
    );
    if (iconBubble) {
        iconBubble.style.setProperty("background-color", DARK.muted, "important");
        iconBubble.style.setProperty("border", `1px solid ${DARK.border}`, "important");
    }
}

function styleBodyText(card, DARK) {
    const labels = Array.from(card.querySelectorAll(
        ".text-gray-500, .text-gray-600, .text-\\[\\#71717A\\], .text-\\[\\#0A171C\\]"
    ));
      
    labels.forEach((el) => {
        el.style.setProperty("color", DARK.text, "important");
    });
}

// Buttons row
function styleButtons(card, DARK, ACCENT) {

    const btns = card.querySelectorAll("button");
    btns.forEach((btn) => {

        const isPrimary = /continue/i.test(btn.textContent || "");

        if (isPrimary) {
            // Primary button uses accent background
            btn.style.setProperty("background-color", ACCENT.hex, "important");
            btn.style.setProperty("color", "#0b0f14", "important");
            btn.style.setProperty("border", `1px solid ${ACCENT.hex}`, "important");
            btn.addEventListener("mouseenter", () => {
                btn.style.setProperty("filter", "brightness(0.95)", "important");
            });

            btn.addEventListener("mouseleave", () => {
                btn.style.removeProperty("filter");
            });

        } else {

            // Ghost/secondary button
            btn.style.setProperty("background-color", DARK.btnBg, "important");
            btn.style.setProperty("color", DARK.text, "important");
            btn.style.setProperty("border", `1px solid ${DARK.btnBorder}`, "important");
            btn.addEventListener("mouseenter", () => {
                btn.style.setProperty("background-color", DARK.btnBgHover, "important");
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.setProperty("background-color", DARK.btnBg, "important");
            });

            // ensure icons inside are visible
            btn.querySelectorAll("svg,img").forEach((icon) => {
                icon.style.setProperty("color", DARK.text, "important");
                if (icon.tagName.toLowerCase() === "img") {
                    icon.style.setProperty("filter", "invert(1) brightness(1.2)", "important");
                }
            });
        }
    });
}

function styleTitle(card, DARK, ACCENT) {

    const title = card.querySelector("h3, h2, h1");
    if (title) title.style.setProperty("color", DARK.text, "important");

    const subtitle = Array.from(card.querySelectorAll("p, span")).find((el) =>
        (el.textContent || "").toLowerCase().includes("beginner") ||
        (el.textContent || "").toLowerCase().includes("intermediate") ||
        (el.textContent || "").toLowerCase().includes("advanced")
    );

    if (subtitle) {
        subtitle.style.setProperty("color", ACCENT.hex, "important");
        subtitle.style.setProperty("font-weight", "600", "important");
    }
}


// Header bar (the light blue strip in your HTML)
function styleHeader(card, DARK) {
    const header =
        Array.from(card.children).find((c) =>
            c.classList?.contains("flex")
        ) ||
        Array.from(card.querySelectorAll("*")).find((el) =>
            el.classList?.contains("bg-[#EFF6FF]")
        );

    if (header) {
        header.style.setProperty("background-color", DARK.headerBg, "important");
        header.style.setProperty("color", DARK.text, "important");
        header.style.setProperty("border-bottom", `1px solid ${DARK.border}`, "important");
    }
}

function styleCardShell(card, DARK) {
    card.style.setProperty("background-color", DARK.cardBg, "important");
    card.style.setProperty("color", DARK.text, "important");
    card.style.setProperty("border", `1px solid ${DARK.border}`, "important");
    card.style.setProperty("box-shadow", "none", "important");
}

const ACCENTS = {
    beginner:    { hex: "#22c55e" },    // green
    intermediate: { hex: "#f59e0b" }, // yellow
    advanced: { hex: "#ef4444" },     // red
    default: { hex: "#60a5fa" }         // fallback blue
};

// Base palette for dark mode
const DARK = {
    cardBg: "#0b0f14",
    headerBg: "#0f172a",
    text: "#e5e7eb",
    subtext: "#a1a1aa",
    border: "#1f2937",
    muted: "#111827",
    btnBg: "#111111",
    btnBgHover: "#181818",
    btnBorder: "#262626"
};
