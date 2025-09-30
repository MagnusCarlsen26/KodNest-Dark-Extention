// TODO: Fix button UI.
export default function broKodBanner() {
  injectStyles();

  return [
    styleBroKodBanner
  ];
}

function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .Component16.dashboard-card {
      background-color: #0f1115 !important;
      color: #f5f5f5 !important;
      border: 1px solid #2a2f3a !important;
    }
    .Component16.dashboard-card .font-bold { color: #fff !important; }
    .Component16.dashboard-card p { color: #c7c7c7 !important; }
    .Component16.dashboard-card .Button.bg-yellow-400 {
      background-color: #facc15 !important; color: #000 !important;
    }
    .Component16.dashboard-card .Button.bg-yellow-400:hover {
      background-color: #eab308 !important;
    }
    .Component16.dashboard-card .ExploreNow { color: #000 !important; font-weight: 700 !important; }
  `;
  document.head.appendChild(style);
}

// helper to apply OUTLINE ONLY look
function applyOutline(svg) {
  svg.classList.add('brokod-illustration');
  // your requested integration:
  svg.querySelectorAll('.brokod-illustration *'); // no-op to satisfy selector if run twice
  document.querySelectorAll('.brokod-illustration *').forEach(n=>{
    n.setAttribute('fill','none');
    n.setAttribute('stroke-width','2');
    n.setAttribute('stroke-linecap','round');
    n.setAttribute('stroke-linejoin','round');
    n.setAttribute('vector-effect','non-scaling-stroke');
    // ensure visible on dark
    n.setAttribute('stroke', '#E6EDF3'); // soft white; use '#fff' if you want pure white
  });
  // subtle pop on dark
  svg.style.filter = 'drop-shadow(0 0 1px rgba(0,0,0,0.6))';
}

async function inlineAndStyle(imgEl) {
  try {
    // QUICK fallback so it's at least visible while we fetch
    // imgEl.style.setProperty("filter", "invert(1) hue-rotate(180deg) brightness(1.05)", "important");

    const res = await fetch(imgEl.src, { credentials: "same-origin" });
    if (!res.ok) throw new Error("Fetch failed");
    const svgText = await res.text();

    const temp = document.createElement("div");
    temp.innerHTML = svgText.trim();
    const svg = temp.querySelector("svg");
    if (!svg) throw new Error("No <svg> in response");

    // keep size if available
    if (imgEl.width)  svg.setAttribute("width",  imgEl.width);
    if (imgEl.height) svg.setAttribute("height", imgEl.height);

    // imgEl.style.removeProperty("filter");
    imgEl.replaceWith(svg);

    applyOutline(svg);
  } catch (e) {
    console.warn("Inline SVG failed, kept filter-based visibility:", e);
  }
}

function styleBroKodBanner() {
  // 2) Find illustration (img or already-inline svg)
  const img = document.querySelector('.Component16.dashboard-card img[src$=".svg"]');
  const existingSvg = document.querySelector('.Component16.dashboard-card svg');

  if (existingSvg && !img) {
    applyOutline(existingSvg);
    return true;
  } else if (img) {
    // For async operations, we can't return immediately
    // But we can check if the element exists
    inlineAndStyle(img);
    return true;
  }

  return false;
}
  