// Dark theme + real progress width for cards like "SQL 2025"
export default function StyleProgressCards() {
    return [styleProgressCardsDark];
}

function styleProgressCardsDark() {
    console.log("Applying dark theme to progress/attendance cards...");
    
    // Find any progress bar, then climb to its card container
    const bars = document.querySelectorAll("[role='progressbar']");
    if (bars.length === 0) return false;

    bars.forEach(bar => {
        const card = bar.closest("[class*='rounded-md'][class*='shadow-sm']");
        if (!card) return;

        // Apply styling to different sections
        styleCardBase(card);
        styleCardHeader(card);
        styleProgressBar(card, bar);
        styleLabels(card);
        styleStatsGrid(card);
        cleanupBackgrounds(card, bar);
    });

    return true;
}

// --- Card base ---
function styleCardBase(card) {
    card.style.setProperty("background-color", "#0a0a0a", "important");
    card.style.setProperty("border", "1px solid #262626", "important");
    card.style.setProperty("box-shadow", "none", "important");
}

// --- Header (title + % on the right) ---
function styleCardHeader(card) {

    const header = card.querySelector(":scope > .pb-2, :scope [class*='pt-3']");
    if (header) {

        header.style.setProperty("background-color", "#0d0d0d", "important");
        const title = header.querySelector("span.text-base");
        if (title) title.style.setProperty("color", "#f3f4f6", "important"); // bright title
        
        const pctEl = findPercentElement(card);
        if (pctEl) pctEl.style.setProperty("color", "#f59e0b", "important"); // amber %
    }
}

// --- Progress track + fill ---
function styleProgressBar(card, bar) {

    const track = bar; // [role=progressbar]
    track.style.setProperty("background-color", "#1a1a1a", "important");
    track.style.setProperty("height", "6px", "important");
    
    const fill = track.querySelector("div");
    if (fill) {
        // Amber fill
        fill.style.setProperty("background-color", "#f59e0b", "important");
        
        const pct = extractPercentFromCard(card);
        if (pct != null) {
            // Set true width and kill the sliding illusion
            fill.style.setProperty("width", pct + "%", "important");
            fill.style.removeProperty("transform"); // <-- only remove if we set width
        } else {
            // If we can't find a %, keep whatever transform/animation the page set.
            // Do NOT remove transform here, or it will look 100% due to w-full.
        }
    }
}

// 0% / 100% labels
function styleLabels(card) {
    card.querySelectorAll(".text-xs").forEach(lbl => {
        if (/%$/.test((lbl.textContent || "").trim())) {
            lbl.style.setProperty("color", "#9ca3af", "important");
        }
    });
}

// --- Stats grid (Total / Present / Absent) ---
function styleStatsGrid(card) {
    const grid = card.querySelector(".grid.grid-cols-3");
    if (grid) {
        // Total (neutral)
        const total = grid.children[0];
        if (total) {
            styleStatBox(total, {
                border: "#303030",
                bg: "transparent",
                label: "#9ca3af",
                value: "#e5e7eb",
            });
        }
        // Present (blue)
        const present = grid.children[1];
        if (present) {
            styleStatBox(present, {
                border: "#1e3a5f",
                bg: "rgba(30,58,95,0.25)",
                label: "#60a5fa",
                value: "#60a5fa",
            });
        }
        // Absent (rose)
        const absent = grid.children[2];
        if (absent) {
            styleStatBox(absent, {
                border: "#4c1d1d",
                bg: "rgba(76,29,29,0.25)",
                label: "#fb7185",
                value: "#fb7185",
            });
        }
    }
}

// Clean up any leftover light backgrounds inside (but leave the track alone)
function cleanupBackgrounds(card, bar) {
    const track = bar; // [role=progressbar]
    card.querySelectorAll("[class*='bg-white'], [class*='bg-gray-100']").forEach(el => {
        if (el !== track) {
            el.style.setProperty("background-color", "transparent", "important");
        }
    });
}

/** Try multiple ways to get the percentage shown on the card (e.g., "68.8%"). */
function extractPercentFromCard(card) {
    // 1) Look for a span that literally contains a % (most robust)
    const withPercent = [...card.querySelectorAll("span, p, div")]
        .map(el => (el.textContent || "").trim())
        .find(t => /(\d+(\.\d+)?)\s*%/.test(t));
    if (withPercent) {
        const m = withPercent.match(/(\d+(\.\d+)?)\s*%/);
        const n = parseFloat(m[1]);
        if (!isNaN(n) && n >= 0 && n <= 100) return n;
    }
    
    // 2) If nothing found, try aria attributes on the progressbar
    const track = card.querySelector("[role='progressbar']");
    if (track) {
        const max = parseFloat(track.getAttribute("aria-valuemax") || "100");
        const now = parseFloat(track.getAttribute("aria-valuenow") || "NaN");
        if (!isNaN(now) && !isNaN(max) && max > 0) {
            const pct = (now / max) * 100;
            if (pct >= 0 && pct <= 100) return pct;
        }
    }
    
    // 3) Give up (keep original animation/transform)
    return null;
}

// Prefer the right-aligned header percentage element
function findPercentElement(card) {
    return [...card.querySelectorAll("span, p")]
        .find(el => /%/.test((el.textContent || "")));
}

function styleStatBox(box, colors) {
    box.style.setProperty("background-color", colors.bg, "important");
    box.style.setProperty("border", `1px solid ${colors.border}`, "important");
    
    const label = box.querySelector(".text-xs");
    if (label) label.style.setProperty("color", colors.label, "important");
    
    const value = box.querySelector(".text-xl");
    if (value) value.style.setProperty("color", colors.value, "important");
}

/* ---------------- Constants ---------------- */
const STAT_COLORS = {
  total: {
    border: "#303030",
    bg: "transparent", 
    label: "#9ca3af",
    value: "#e5e7eb",
  },
  present: {
    border: "#1e3a5f",
    bg: "rgba(30,58,95,0.25)",
    label: "#60a5fa",
    value: "#60a5fa",
  },
  absent: {
    border: "#4c1d1d",
    bg: "rgba(76,29,29,0.25)",
    label: "#fb7185",
    value: "#fb7185",
  },
};
