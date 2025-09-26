export default function attendanceCards() {
  const STYLE_ID = "__darkify_subject_cards_colors_force";

  // Base dark styles (same as before, safe to re-inject)
  if (!document.getElementById(STYLE_ID)) {
    const css = `
      .subject-card[data-darkified="1"] {
        --accent:#3b82f6;
        background:#121212!important;
        color:#e5e5e5!important;
        border-color:#2e2e2e!important;
      }
      .subject-card[data-darkified="1"] * { color:#e5e5e5!important; }
      .subject-card[data-darkified="1"] .bg-gray-100 { background:#2a2a2a!important; }
      .subject-card[data-darkified="1"] [role="progressbar"]>div { background:var(--accent)!important; }
      .subject-card[data-darkified="1"] .border,
      .subject-card[data-darkified="1"] [class*="border-"] { border-color:#2e2e2e!important; }
      .subject-card[data-darkified="1"] .grid .flex.flex-col { background:#1b1b1b!important; border-color:#2e2e2e!important; }
      .subject-card[data-darkified="1"] .text-gray-500,
      .subject-card[data-darkified="1"] .dark\\:text-gray-400 { color:#a1a1aa!important; }
    `.trim();
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Colors we want
  const COLORS = {
    total:  "#d4d4d8", // neutral gray
    present:"#22c55e", // green
    absent: "#ef4444", // red
  };

  // Force colors inline (beats Tailwind utilities)
  function colorizeTiles(card) {
    // find the three tiles under the grid
    const tiles = Array.from(card.querySelectorAll('.grid .flex.flex-col'));
    tiles.forEach(tile => {
      const text = (tile.textContent || "").toLowerCase();

      let kind = null;
      if (text.includes("present")) kind = "present";
      else if (text.includes("absent")) kind = "absent";
      else if (text.includes("total")) kind = "total";

      if (!kind) return;

      const col = COLORS[kind];

      // set color on all spans inside the tile
      tile.querySelectorAll('span').forEach(sp => {
        sp.style.setProperty('color', col, 'important');
      });

      // also set the border to a subtle tinted edge (optional)
      const borderTint = kind === "present" ? "#14532d"
                        : kind === "absent" ? "#7f1d1d"
                        : "#3f3f46";
      tile.style.setProperty('border-color', borderTint, 'important');

      // remove pastel backgrounds if any remain
      const bg = getComputedStyle(tile).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)") {
        tile.style.setProperty('background-color', '#1b1b1b', 'important');
      }
    });

    // percent label accent (keep whatever the page uses, or set your own)
    const percentEl = Array.from(card.querySelectorAll("span"))
      .find(el => /\d+(\.\d+)?%/.test(el.textContent || ""));
    if (percentEl) {
      // keep page color as accent if present; else set to green for >50, yellow 25-50, red <25 (optional)
      const pct = parseFloat(percentEl.textContent);
      if (!Number.isNaN(pct)) {
        const dynamic =
          pct >= 50 ? "#22c55e" :
          pct >= 25 ? "#f59e0b" :
                      "#ef4444";
        card.style.setProperty('--accent', dynamic);
        percentEl.style.setProperty('color', dynamic, 'important');
      }
    }
  }

  // Darkify + colorize one card
  function darkify(card) {
    if (!card) return;
    if (!card.dataset.darkified) {
      card.dataset.darkified = "1";
      card.classList.add("subject-card");
    }
    colorizeTiles(card);
  }

  // Initial pass (matches your subject card structure)
  document.querySelectorAll('div.rounded-md.bg-white').forEach(darkify);

  // Watch for new cards or re-renders
  const observer = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === "childList") {
        m.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.('div.rounded-md.bg-white')) darkify(node);
          node.querySelectorAll?.('div.rounded-md.bg-white').forEach(darkify);
        });
      } else if (m.type === "attributes" && m.target instanceof HTMLElement) {
        // if a subject card’s content rehydrates, recolor tiles
        if (m.target.matches('div.rounded-md.bg-white')) darkify(m.target);
      }
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class','style']
  });

  // cleanup handle
  window.__darkSubjectsStop?.();
  window.__darkSubjectsStop = () => observer.disconnect();

  console.log("Darkify: subject cards dark + forced tile colors (Total gray, Present green, Absent red).");
}