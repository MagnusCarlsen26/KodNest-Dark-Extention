// Dark theme for Placement profile cards
export default function placementCards() {
  return [stylePlacementCardsDark];
}

function stylePlacementCardsDark() {
  console.log("Applying dark theme to Placement cards...");

  // Heuristic: placement cards have an avatar with id or "Placed in" / "Salary Package" copy
  const cards = [...document.querySelectorAll(".dashboard-card")].filter(card =>
    card.querySelector("#placement-avatar") ||
    /placed in|salary package|drive link/i.test(card.textContent)
  );

  if (cards.length === 0) return false;

  cards.forEach(card => {
    // Apply styling to different sections
    styleCardBase(card);
    styleBanner(card);
    styleAvatar(card);
    styleName(card);
    styleMetaRow(card);
    styleDividers(card);
    styleStatsRow(card);
    cleanupBackgrounds(card);
  });

  return true;
}

// --- Base card ---
function styleCardBase(card) {
  setStyles(card, {
    backgroundColor: "#0b0b0b",
    color: "#e6e6e6",
    border: "1px solid #1a1a1a",
    boxShadow: "none",
  });

  // Hover effect (subtle)
  card.addEventListener("mouseenter", () => {
    card.style.setProperty("box-shadow", "0 6px 20px rgba(0,0,0,0.35)", "important");
  });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("box-shadow", "none", "important");
  });
}

// --- Banner / hero area (was pink) ---
function styleBanner(card) {
  // Prefer an element with inline background-color OR the first .relative inside the padded block
  const banner =
    card.querySelector("div[style*='background-color']") ||
    card.querySelector(".relative");
  if (banner) {
    setStyles(banner, {
      backgroundColor: "#0b0b0b",
      color: "#e6e6e6",
      border: "1px solid #1a1a1a",
      boxShadow: "none",
    });
  }
}

// --- Avatar ring ---
function styleAvatar(card) {
  const avatar = card.querySelector("#placement-avatar");
  if (avatar) setStyles(avatar, { backgroundColor: "#0b0b0b", color: "#e6e6e6", border: "1px solid #1a1a1a", boxShadow: "none" });
}

// --- Name (the element right after #avatar-container) ---
function styleName(card) {
  const name = card.querySelector("#avatar-container + div.text-center");
  if (name) {
    setStyles(name, { color: "#f9fafb", fontWeight: "600" });
  }
}

// --- Meta row: role, batch, LinkedIn (flex gap-4 justify-center) ---
function styleMetaRow(card) {

  const meta = card.querySelector(".flex.gap-4.justify-center");
  if (meta) {
    setStyles(meta, { color: "#cbd5e1" });
    // light gray dots
    meta.querySelectorAll("span.bg-gray-300").forEach(dot =>
      setStyles(dot, { backgroundColor: "#475569" })
    );
    // text inside buttons/links
    meta.querySelectorAll("button, a").forEach(el =>
      setStyles(el, { color: "#cbd5e1" })
    );
  }
}

// --- Divider lines (bg-gray-200) ---
function styleDividers(card) {
  card.querySelectorAll(".bg-gray-200").forEach(divider =>
    setStyles(divider, { backgroundColor: "#333333" })
  );
}

// --- Stats row: three columns (Placed in | Salary | Drive Link) ---
function styleStatsRow(card) {
  // Find the row by having both items-center & justify-between
  const statsRow = [...card.querySelectorAll("div")]
    .find(el => hasClass(el, "items-center") && hasClass(el, "justify-between"));
  if (statsRow) {
    const cols = statsRow.querySelectorAll(".flex.flex-col");
    // Col 0: Placed in
    const placedCol = cols[0];
    if (placedCol) {
      const label = placedCol.querySelector("p");
      if (label) setStyles(label, { color: "#a1a1aa" }); // muted
    }
    // Col 1: Salary
    const salaryCol = cols[1];
    if (salaryCol) {
      const label = salaryCol.querySelector("p");
      const value = salaryCol.querySelector("p.font-medium");
      if (label) setStyles(label, { color: "#a1a1aa" });
      if (value) setStyles(value, { color: "#f9fafb" });
    }
    // Col 2: Drive Link
    const driveCol = cols[2];
    if (driveCol) {
      const label = driveCol.querySelector("p");
      if (label) setStyles(label, { color: "#a1a1aa" });
      const ctaBtn = driveCol.querySelector("button.flex.gap-2");
      if (ctaBtn) {
        setStyles(ctaBtn, { color: "#3b82f6" }); // blue accent
        const icon = ctaBtn.querySelector("svg");
        if (icon) {
          setStyles(icon, { color: "#3b82f6", stroke: "#3b82f6" });
        }
        // fun hover nudge
        ctaBtn.addEventListener("mouseenter", () => ctaBtn.style.setProperty("transform", "scale(1.05)", "important"));
        ctaBtn.addEventListener("mouseleave", () => ctaBtn.style.setProperty("transform", "scale(1.00)", "important"));
      }
    }
  }
}

// --- Neutralize any eftover light backgrounds (keep images as-is) ---
function cleanupBackgrounds(card) {
  card.querySelectorAll("[class*='bg-white'], [class*='bg-gray-50'], [class*='bg-slate-50']")
    .forEach(el => {
      // don't touch the <img> or <canvas>
      if (el.tagName === "IMG" || el.tagName === "CANVAS") return;
      setStyles(el, { backgroundColor: "transparent" });
      el.style.removeProperty("background-image");
    });
}

/* ---------------- helpers ---------------- */
function setStyles(el, styles) {
  Object.entries(styles).forEach(([prop, val]) =>
    el.style.setProperty(cssProp(prop), val, "important")
  );
}
function cssProp(jsProp) {
  // camelCase -> kebab-case
  return jsProp.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
}
function hasClass(el, cls) {
  return (el?.className || "").split(/\s+/).includes(cls);
}

/* ---------------- Constants ---------------- */
// const PLACEMENT_COLORS = {
//   card: {
//     backgroundColor: "#0b0b0b",
//     color: "#e6e6e6",
//     border: "1px solid #1a1a1a",
//     boxShadow: "none",
//   },
//   banner: {
//     PLACEMENT_COLORS.banner,
//   },
//   avatar: {
//     PLACEMENT_COLORS.avatar,
//   },
//   name: {
//     color: "#f9fafb",
//     fontWeight: "600",
//   },
//   meta: {
//     color: "#cbd5e1",
//   },
//   dots: {
//     backgroundColor: "#475569",
//   },
//   dividers: {
//     backgroundColor: "#333333",
//   },
//   labels: {
//     color: "#a1a1aa",
//   },
//   values: {
//     color: "#f9fafb",
//   },
//   cta: {
//     color: "#3b82f6",
//   },
//   icons: {
//     color: "#3b82f6",
//     stroke: "#3b82f6",
//   },
// };
