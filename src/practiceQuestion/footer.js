export default function Footer() {

    const nav = document.querySelector("nav.z-50.fixed");

    if (!nav) return false;

    // Base: dark background, readable text
    nav.style.setProperty("background-color", "#000000", "important");
    nav.style.setProperty("color", "#e6e6e6", "important");
    nav.style.setProperty("border-color", "#111", "important");
    nav.style.setProperty("box-shadow", "none", "important");

    // container grid inside nav: ensure padding & text color
    nav.querySelectorAll(".grid, .w-100, .px-[20px], .md\\:px-5").forEach(el => {
      el.style.setProperty("color", "#e6e6e6", "important");
      el.style.setProperty("background-color", "transparent", "important");
    });

    // Turn the light progress track dots into muted dark variants,
    // keep the active indicator green-ish but with better contrast on dark bg
    nav.querySelectorAll("[role='button']").forEach(el => {
      // progress dot boxes (small rounded bars)
      const bg = el.getAttribute("style") || "";
      if (bg.includes("#34D399")) {
        // active dot -> slightly brighter green for visibility on black
        el.style.setProperty("background-color", "#2ecc71", "important");
      } else if (bg.includes("#D9D9D9") || el.classList.contains("bg-[#D9D9D9]")) {
        el.style.setProperty("background-color", "#262626", "important");
      }
    });

    // Buttons: transparent nav buttons (left/right arrows)
    nav.querySelectorAll("button.transparent-button, button.inline-flex, .transparent-button").forEach(btn => {
      // keep them visually clickable but neutral
      btn.style.setProperty("background-color", "transparent", "important");
      btn.style.setProperty("color", "#e6e6e6", "important");
      btn.style.setProperty("border-color", "transparent", "important");
    });

    // Next button: keep brand accent but ensure contrast on dark background
    nav.querySelectorAll("button[role='button'], button").forEach(btn => {
      // detect the Next styled button by matching FEBA01 bg or text "Next"
      const inline = btn.getAttribute("style") || "";
      const text = (btn.textContent || "").trim().toLowerCase();
      if (inline.includes("#FEBA01") || text === "next") {
        btn.style.setProperty("background-color", "#feba01", "important");
        btn.style.setProperty("color", "#000000", "important");
        btn.style.setProperty("border-color", "#c99c03", "important");
        btn.style.setProperty("box-shadow", "none", "important");
      }
    });

    // Images/SVGs inside nav: avoid global invert; if icons are designed for light bg
    // we try a gentle brightness tweak instead of invert which can break color icons.
    nav.querySelectorAll("img, svg").forEach(media => {
      media.style.setProperty("filter", "none", "important");
      media.style.setProperty("mix-blend-mode", "normal", "important");
    });

    // ensure small rounded progress track wrapper doesn't inherit white backgrounds
    nav.querySelectorAll(".bg-[#FAFAFA], .layout-shadow").forEach(el => {
      el.style.setProperty("background-color", "transparent", "important");
      el.style.setProperty("box-shadow", "none", "important");
    });

    return true;

} 