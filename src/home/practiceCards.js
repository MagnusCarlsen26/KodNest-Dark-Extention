export default function practiceCards() {
  const STYLE_ID = "__dark_cards_levels_style";

  // 0) Inject stylesheet once
  if (!document.getElementById(STYLE_ID)) {
    const css = `
      .dashboard-card[data-dark-card="1"]{
        background:#121212!important;color:#e5e5e5!important;border:1px solid #2e2e2e!important;
      }
      .dashboard-card[data-dark-card="1"] *{color:#e5e5e5!important}
      /* neutralize common light backgrounds */
      .dashboard-card[data-dark-card="1"] .bg-white,
      .dashboard-card[data-dark-card="1"] .bg-\\[\\#EFF6FF\\],
      .dashboard-card[data-dark-card="1"] .bg-\\[\\#F0FDF4\\],
      .dashboard-card[data-dark-card="1"] .bg-\\[\\#FAF5FF\\]{background:#1b1b1b!important}
      /* progress track + fill */
      .dashboard-card[data-dark-card="1"] .bg-gray-100{background:#2a2a2a!important}
      .dashboard-card[data-dark-card="1"] [role="progressbar"]{background:var(--accent)!important}
      /* kill forced black */
      .dashboard-card[data-dark-card="1"] .\\!text-black{color:#e5e5e5!important}
      /* buttons */
      .dashboard-card[data-dark-card="1"] button{background:#1c1c1c!important;color:#e5e5e5!important;border-color:#3a3a3a!important}
      .dashboard-card[data-dark-card="1"] button:hover{background:#242424!important}
      /* icons & accent text */
      .dashboard-card[data-dark-card="1"] svg{stroke:var(--accent)!important}
      .dashboard-card[data-dark-card="1"] .accent-text{color:var(--accent)!important}
    `.trim();
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  // 1) Map levels to accents (traffic light)
  const ACCENTS = {
    beginner: "#10B981",     // green-500
    intermediate: "#F59E0B", // amber-500 (yellow)
    advanced: "#EF4444"      // red-500
  };

  // 2) Find the "level" text inside a card
  function getLevel(card){
    const levelEl = Array.from(card.querySelectorAll("p,span,div"))
      .find(el => /beginner|intermediate|advanced/i.test(el.textContent||""));
    if(!levelEl) return null;
    const m = (levelEl.textContent||"").toLowerCase().match(/beginner|intermediate|advanced/);
    return m ? m[0] : null;
  }

  // 3) Dark-theme one card with the right accent
  function darkify(card){
    if(!card) return;
    const level = getLevel(card);
    if(!level) return; // only theme challenge cards
    if(card.dataset.darkCard === "1" && card.dataset.level === level) return;

    card.dataset.darkCard = "1";
    card.dataset.level = level;
    card.style.setProperty("--accent", ACCENTS[level]);

    // Mark existing level-colored texts as accent-text so CSS above recolors them
    card.querySelectorAll(
      '.text-\\[\\#2563EB\\], .text-\\[\\#10B981\\], .text-\\[\\#9333EA\\], ' +
      '.text-blue-500, .text-green-500, .text-purple-500'
    ).forEach(el => el.classList.add("accent-text"));

    // Patch any inline light backgrounds not covered by classes
    card.querySelectorAll("div").forEach(div=>{
      const bg = getComputedStyle(div).backgroundColor;
      if (bg === "rgb(255, 255, 255)" || // #fff
          bg === "rgb(239, 246, 255)" || // #EFF6FF
          bg === "rgb(240, 253, 244)" || // #F0FDF4
          bg === "rgb(250, 245, 255)") { // #FAF5FF
        div.style.setProperty("background-color","#1b1b1b","important");
      }
    });
  }

  // 4) Initial pass
  document.querySelectorAll(".dashboard-card").forEach(darkify);

  // 5) Watch for API/SPAs insertions and rerenders
  const observer = new MutationObserver(muts=>{
    for(const m of muts){
      if(m.type==="childList"){
        m.addedNodes.forEach(node=>{
          if(!(node instanceof HTMLElement)) return;
          if(node.matches?.(".dashboard-card")) darkify(node);
          node.querySelectorAll?.(".dashboard-card").forEach(darkify);
        });
      } else if (m.type==="attributes" && m.target instanceof HTMLElement && m.target.matches(".dashboard-card")){
        darkify(m.target);
      }
    }
  });
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["class","style"]});

  // 6) Cleanup handle if needed
  window.__darkCardsStop?.();
  window.__darkCardsStop = () => observer.disconnect();

  console.log("Darkify: beginner=green, intermediate=yellow, advanced=red applied (live).");
}
