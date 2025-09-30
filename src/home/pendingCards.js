export default function pendingCards() {
  injectStyles();

  return [
    stylePendingCards
  ];
}

// 1) Inject dark styles (scoped) once
function injectStyles() {
  const STYLE_ID = "__darkify_red_alert_cards";

  if (!document.getElementById(STYLE_ID)) {
    const css = `
      .dashboard-card[data-dark-red="1"]{
        --accent:#ef4444; /* red-500 */
        background:#121212!important;
        color:#e5e5e5!important;
        border-color:#7f1d1d!important; /* darker red border */
      }
      .dashboard-card[data-dark-red="1"] *{ color:#e5e5e5!important; }

      /* kill light surfaces (including red pastels & gradients) */
      .dashboard-card[data-dark-red="1"] .bg-white,
      .dashboard-card[data-dark-red="1"] .bg-red-50,
      .dashboard-card[data-dark-red="1"] .from-red-50,
      .dashboard-card[data-dark-red="1"] .to-white,
      .dashboard-card[data-dark-red="1"] [class*="bg-gradient-to-"]{
        background:#1b1b1b!important;
        background-image:none!important;
      }

      /* top header area padding block typically needs dark surface */
      .dashboard-card[data-dark-red="1"] .p-4{ background:#1b1b1b!important; }

      /* red accents */
      .dashboard-card[data-dark-red="1"] .text-red-400,
      .dashboard-card[data-dark-red="1"] .text-red-500,
      .dashboard-card[data-dark-red="1"] .text-red-600,
      .dashboard-card[data-dark-red="1"] .text-red-700{
        color:var(--accent)!important;
      }
      .dashboard-card[data-dark-red="1"] .border-red-100,
      .dashboard-card[data-dark-red="1"] .border-red-200{ border-color:#7f1d1d!important; }

      /* icon strokes and percent figure use accent */
      .dashboard-card[data-dark-red="1"] svg{ stroke:var(--accent)!important; }
      .dashboard-card[data-dark-red="1"] .percent-accent{ color:var(--accent)!important; }

      /* divider area */
      .dashboard-card[data-dark-red="1"] .border-t{ border-top-color:#262626!important; }

      /* cursor/hover shadow ok; keep hover subtle */
      .dashboard-card[data-dark-red="1"]:hover{ box-shadow:0 6px 18px rgba(0,0,0,.35)!important; }
    `.trim();
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }
}

// 2) Decide if a card is a "red alert" card
function looksRedAlert(card){
  const t = card.className || "";
  if (/border-red|text-red/.test(t)) return true;
  // or check inner header gradient
  const header = card.querySelector('[class*="bg-gradient-to-"]');
  if (header && /from-red|to-red|red-50/.test(header.className)) return true;
  // or any red percent/label
  return !!card.querySelector('.text-red-400, .text-red-500, .text-red-600, .text-red-700');
}

// 3) Apply dark/red theme to a single card
function darkify(card){
  if (!card || card.dataset.darkRed === "1") return;
  if (!looksRedAlert(card)) return; // only theme red-alert style cards
  card.dataset.darkRed = "1";

  // percent label accent
  const pct = Array.from(card.querySelectorAll("span"))
    .find(el => /\d+(\.\d+)?%/.test(el.textContent || ""));
  if (pct) {
    pct.classList.add("percent-accent");
  }

  // ensure header & footer zones flip to dark, keep red text accents
  const header = card.querySelector('.p-4');
  if (header) header.style.setProperty('background','#1b1b1b','important');

  const footer = card.querySelector('.py-3, .p-6');
  if (footer) {
    footer.style.setProperty('background','#1b1b1b','important');
    footer.style.setProperty('border-top-color','#262626','important');
  }

  // normalize any lingering light bg
  card.querySelectorAll("*").forEach(el=>{
    const bg = getComputedStyle(el).backgroundColor;
    if (bg === "rgb(255, 255, 255)" || bg === "rgb(254, 242, 242)" || bg === "rgb(254, 226, 226)" || bg === "rgb(255, 241, 242)"){
      el.style.setProperty('background-color','#1b1b1b','important');
    }
  });
}

function stylePendingCards() {
  const cards = document.querySelectorAll('.dashboard-card');
  if (cards.length === 0) return false;

  cards.forEach(darkify);
  return true;
}