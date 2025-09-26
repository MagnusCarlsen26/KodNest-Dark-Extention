// TODO: Sometimes the text is blue not red.
export default function placementCards() {
  const STYLE_ID = "__darkify_placed_profile_card";

  if (!document.getElementById(STYLE_ID)) {
    const css = `
      .dashboard-card[data-placed-dark="1"]{
        --accent:#60a5fa;           /* link/cta blue */
        --muted:#a1a1aa;            /* secondary text */
        --surface:#121212;          /* card */
        --surface-2:#1b1b1b;        /* inner blocks */
        --divider:#2a2a2a;
        background:var(--surface)!important;
        color:#e5e5e5!important;
        border-color:var(--divider)!important;
      }
      .dashboard-card[data-placed-dark="1"] *{ color:#e5e5e5!important; }

      /* kill light surfaces, pastels, gradients */
      .dashboard-card[data-placed-dark="1"] .bg-white,
      .dashboard-card[data-placed-dark="1"] [style*="background-color: rgb(252, 231, 243)"],
      .dashboard-card[data-placed-dark="1"] [class*="bg-gradient-to-"],
      .dashboard-card[data-placed-dark="1"] .p-\\[10px\\] .relative{ background:var(--surface-2)!important; background-image:none!important; }

      /* avatar ring + dividers */
      .dashboard-card[data-placed-dark="1"] #placement-avatar{ border-color:var(--divider)!important; }
      .dashboard-card[data-placed-dark="1"] .bg-gray-200{ background:var(--divider)!important; }

      /* muted chips/dots text */
      .dashboard-card[data-placed-dark="1"] .text-muted,
      .dashboard-card[data-placed-dark="1"] .text-gray-600,
      .dashboard-card[data-placed-dark="1"] .text-gray-500{ color:var(--muted)!important; }
      .dashboard-card[data-placed-dark="1"] .bg-gray-300{ background:#3a3a3a!important; }

      /* strong blacks to readable light */
      .dashboard-card[data-placed-dark="1"] .text-black{ color:#fafafa!important; }

      /* link/cta accent (Drive Link "Click") */
      .dashboard-card[data-placed-dark="1"] .text-blue-600{ color:var(--accent)!important; }
      .dashboard-card[data-placed-dark="1"] .text-blue-600:hover{ filter:brightness(1.1)!important; }

      /* images stay bright; optional slight lift on company logo */
      .dashboard-card[data-placed-dark="1"] img{ filter: none !important; }
      .dashboard-card[data-placed-dark="1"] [alt="..."]{ filter:brightness(1.05)!important; }

      /* canvas overlays should not tint */
      .dashboard-card[data-placed-dark="1"] canvas{ mix-blend-mode: normal!important; }

      /* hover shadow subtle on dark */
      .dashboard-card[data-placed-dark="1"]:hover{ box-shadow:0 8px 22px rgba(0,0,0,.4)!important; }
    `.trim();
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function darkify(card){
    if (!card || card.dataset.placedDark === "1") return;
    card.dataset.placedDark = "1";

    // Inline fixes for any lingering light backgrounds
    card.querySelectorAll("*").forEach(el=>{
      const bg = getComputedStyle(el).backgroundColor;
      if (
        bg === "rgb(255, 255, 255)" ||          // white
        bg === "rgb(252, 231, 243)" ||          // pink pastel header
        bg === "rgb(243, 244, 246)" ||          // gray-100/200 variants
        bg === "rgb(229, 231, 235)"
      ){
        el.style.setProperty("background-color","var(--surface-2)","important");
      }
      // kill inline black text colors
      if (getComputedStyle(el).color === "rgb(0, 0, 0)"){
        el.style.setProperty("color","#e5e5e5","important");
      }
    });
  }

  // Initial pass
  document.querySelectorAll(".dashboard-card").forEach(darkify);

  // Watch for API/SPA insertions
  const mo = new MutationObserver(muts=>{
    for (const m of muts){
      if (m.type === "childList"){
        m.addedNodes.forEach(n=>{
          if (!(n instanceof HTMLElement)) return;
          if (n.matches?.(".dashboard-card")) darkify(n);
          n.querySelectorAll?.(".dashboard-card").forEach(darkify);
        });
      } else if (m.type === "attributes" && m.target instanceof HTMLElement){
        if (m.target.matches(".dashboard-card")) darkify(m.target);
      }
    }
  });
  mo.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["class","style"]});

  // Cleanup handle if needed
  window.__darkPlacedStop?.();
  window.__darkPlacedStop = () => mo.disconnect();

  console.log("Darkify: placed profile cards are now dark-themed with readable accents.");
}