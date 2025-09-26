export default function arrowButtons(selector1, selector2, opts = {}) {

    console.log("arrowButtons");

    const {
      bg       = "#0f172a",   // default dark background
      fg       = "#e5e7eb",   // default text/icon color
      border   = "#334155",   // border color
      hoverBg  = "#111827",   // hover background
      hoverFg  = "#ffffff",   // hover text/icon
      disabledBg = "#0b1220", // disabled background
      disabledFg = "#9aa3af", // disabled text/icon
    } = opts;
  
    // inject style only once
    if (!document.getElementById("dark-btn-style")) {
      const style = document.createElement("style");
      style.id = "dark-btn-style";
      style.textContent = `
        .dark-btn {
          background-color: var(--dark-btn-bg) !important;
          color: var(--dark-btn-fg) !important;
          border: 1px solid var(--dark-btn-border) !important;
          border-radius: 6px !important;
          transition: background-color .2s, border-color .2s, color .2s, box-shadow .2s !important;
        }
        .dark-btn:hover:not(:disabled):not([aria-disabled="true"]) {
          background-color: var(--dark-btn-hover-bg) !important;
          color: var(--dark-btn-hover-fg) !important;
        }
        .dark-btn:disabled,
        .dark-btn[disabled],
        .dark-btn[aria-disabled="true"] {
          background-color: var(--dark-btn-disabled-bg) !important;
          color: var(--dark-btn-disabled-fg) !important;
          cursor: not-allowed !important;
          opacity: 0.7 !important;
        }
        .dark-btn svg {
          color: currentColor !important;
          stroke: currentColor !important;
          fill: currentColor !important;
        }
      `;
      document.head.appendChild(style);
    }
  
    // set CSS vars dynamically
    document.documentElement.style.setProperty("--dark-btn-bg", bg);
    document.documentElement.style.setProperty("--dark-btn-fg", fg);
    document.documentElement.style.setProperty("--dark-btn-border", border);
    document.documentElement.style.setProperty("--dark-btn-hover-bg", hoverBg);
    document.documentElement.style.setProperty("--dark-btn-hover-fg", hoverFg);
    document.documentElement.style.setProperty("--dark-btn-disabled-bg", disabledBg);
    document.documentElement.style.setProperty("--dark-btn-disabled-fg", disabledFg);
  
    // apply to both selectors
    [selector1, selector2].forEach(sel => {
      document.querySelectorAll(sel).forEach(btn => {
        btn.classList.add("dark-btn");
      });
    });
}
  