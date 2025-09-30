// Dark theme for "Course Action" / alert cards with red accents
export default function attentionCards() {
    return [styleAttentionCards];
}

function styleAttentionCards() {
    console.log("Applying dark theme to Course Action / alert cards...");

    // Find dashboard cards that look like this component
    const cards = [...document.querySelectorAll(".dashboard-card")].filter(card => {
        return (
            card.textContent.toLowerCase().includes("course action") ||
            card.querySelector(".lucide-circle-alert") ||
            card.querySelector("[class*='border-red-'], [class*='bg-red-']")
        );
    });

    if (cards.length === 0) return false;

    cards.forEach(card => {

        // --- Base card ---
        card.style.setProperty("background-color", "#0b0b0b", "important");
        card.style.setProperty("color", "#e6e6e6", "important");
        card.style.setProperty("border", "1px solid #2a0b0b", "important"); // subtle red tint
        card.style.setProperty("box-shadow", "none", "important");
        card.style.setProperty("cursor", "pointer", "important");

        // Apply styling to different sections
        styleCardHeader(card);
        styleClockRow(card);
        styleFooterIcons(card);
        styleLeftoverElements(card);
    });

    return true;
}

// --- HEADER (top .p-4 block that had a light gradient) ---
function styleCardHeader(card) {

    const header = card.querySelector(":scope > .p-4, :scope [class*='p-4']");
    if (header) {
        header.style.setProperty(
            "background",
            "linear-gradient(90deg, #1a0a0a 0%, #0b0b0b 60%)",
            "important"
        );
        header.style.setProperty("border-bottom", "1px solid #1c0909", "important");
    }

    // Title: "Infosys Decode"
    const title = card.querySelector("h2");
    if (title) title.style.setProperty("color", "#f9fafb", "important"); // bright & readable

    // Subtitle: "Course Action"
    const subtitle = card.querySelector("p.text-sm, p.text-gray-500");
    if (subtitle) subtitle.style.setProperty("color", "#d1d5db", "important"); // neutral light gray

    // --- Icons in header (alert, etc.) ---
    card.querySelectorAll(".lucide-circle-alert, .lucide-clock").forEach(svg => {
        svg.style.setProperty("stroke", "#ef4444", "important");
        svg.style.setProperty("color", "#ef4444", "important");
    });
}

// Row with clock icon + text + big number
function styleClockRow(card) {

    const header = card.querySelector(":scope > .p-4, :scope [class*='p-4']");
    const rows = header ? header.querySelectorAll(".flex.items-center") : card.querySelectorAll(".flex.items-center");
    if (rows && rows.length >= 1) {
        const metaRow = rows[rows.length - 1]; // the one with clock & count
        // Left text
        const metaText = metaRow.querySelector("span");
        if (metaText) metaText.style.setProperty("color", "#e5e7eb", "important"); // readable light gray
        // Big number "34"
        const bigNumber = metaRow.querySelector(".text-2xl, .font-bold, span.text-2xl");
        if (bigNumber) bigNumber.style.setProperty("color", "#ef4444", "important");
        // Clock icon
        const clock = metaRow.querySelector("svg");
        if (clock) {
            clock.style.setProperty("stroke", "#ef4444", "important");
            clock.style.setProperty("color", "#ef4444", "important");
        }
    }
}

// --- FOOTER (CTA bar with border-top & chevron) ---
function styleFooterIcons(card) {
    const footer = (() => {
        // Prefer a direct child with border-top or padding that resembles the footer
        const direct = [...card.children].find(
            el => /\bborder-t\b/.test(el.className || "") || /\bpy-3\b|\bp-6\b|\bpx-4\b/.test(el.className || "")
        );
        if (direct) return direct;
        return card.querySelector("[class*='border-t'], .py-3, .p-6, .px-4");
    })();

    if (footer) {
        footer.style.setProperty("background-color", "#140707", "important"); // dark red tint
        footer.style.setProperty("border-top", "1px solid #401515", "important");

        // Primary CTA text: "Complete it now!"
        const footerPrimary = footer.querySelector(".text-sm.font-semibold, .font-semibold");
        if (footerPrimary) footerPrimary.style.setProperty("color", "#f87171", "important");

        // Secondary CTA text: "It will impact your placement"
        const footerSecondary = footer.querySelector(".text-xs");
        if (footerSecondary) footerSecondary.style.setProperty("color", "#fca5a5", "important");

        // Chevron icon
        const chevron = footer.querySelector("svg");
        if (chevron) {
            chevron.style.setProperty("stroke", "#ef4444", "important");
            chevron.style.setProperty("color", "#ef4444", "important");
        }
    }
}

function styleLeftoverElements(card) {
    // --- Neutralize any leftover light backgrounds inside (except our header/footer) ---
    const header = card.querySelector(":scope > .p-4, :scope [class*='p-4']");
    const footer = (() => {
        // Prefer a direct child with border-top or padding that resembles the footer
        const direct = [...card.children].find(
            el => /\bborder-t\b/.test(el.className || "") || /\bpy-3\b|\bp-6\b|\bpx-4\b/.test(el.className || "")
        );
        if (direct) return direct;
        return card.querySelector("[class*='border-t'], .py-3, .p-6, .px-4");
    })();

    card.querySelectorAll("[class*='bg-white'], [class*='bg-red-50'], [class*='to-white']").forEach(el => {
        if (el !== header && el !== footer) {
            el.style.setProperty("background-color", "transparent", "important");
            el.style.removeProperty("background-image");
        }
    });
}
