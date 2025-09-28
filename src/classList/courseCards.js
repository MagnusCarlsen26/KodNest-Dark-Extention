export default function courseCards() {
    const STYLE_ID = "__darkify_course_cards";
    if (!document.getElementById(STYLE_ID)) {
      const css = `
        .dashboard-card.course-list-accordion[data-dark-course="1"] {
          --accent-yellow:#FEC834;
          --accent-blue:#0693E3;
          --accent-orange:#FF6900;
          --accent-green:#00D084;
          --muted:#a1a1aa;
          --surface:#121212;
          --surface-2:#1b1b1b;
          --divider:#2a2a2a;
  
          background:var(--surface)!important;
          color:#e5e5e5!important;
          border-color:var(--divider)!important;
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] * { color:#e5e5e5!important; }
  
        /* Status pill (yellow) */
        .dashboard-card.course-list-accordion[data-dark-course="1"] [id^="course-status-"]{
          background: var(--accent-yellow) !important;
          color: #111 !important;        /* dark text on yellow */
          border: none !important;
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] [id^="course-status-"] *{
          color: #111 !important;         /* ensure span, svg inherit */
          fill: currentColor !important;   /* svg paths follow text color */
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] [id^="course-status-"]:hover{
          background: var(--accent-yellow) !important; /* keep same on hover */
        }
  
        /* Blue/Orange tags */
        .dashboard-card.course-list-accordion[data-dark-course="1"] .bg-\\[\\#E5F5FF\\] {
          background:rgba(6,147,227,0.15)!important;
          color:var(--accent-blue)!important;
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] .bg-\\[\\#FFF0E6\\] {
          background:rgba(255,105,0,0.15)!important;
          color:var(--accent-orange)!important;
        }
  
        /* Muted labels */
        .dashboard-card.course-list-accordion[data-dark-course="1"] .text-muted,
        .dashboard-card.course-list-accordion[data-dark-course="1"] .text-gray-500 {
          color:var(--muted)!important;
        }
  
        /* Strong blacks to light */
        .dashboard-card.course-list-accordion[data-dark-course="1"] .text-black,
        .dashboard-card.course-list-accordion[data-dark-course="1"] .!text-black {
          color:#fafafa!important;
        }
  
        /* Progress bar background + fill (keep green accent) */
        .dashboard-card.course-list-accordion[data-dark-course="1"] .progress-bg-pattern {
          background:#2a2a2a!important;
          border-color:var(--divider)!important;
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] .progress-bg-pattern>div {
          background:var(--accent-green)!important;
        }
  
        /* CTA buttons */
        .dashboard-card.course-list-accordion[data-dark-course="1"] button {
          border:none!important;
          font-weight:600!important;
          padding: 8px 16px!important;
          border-radius:6px!important;
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] button.bg-black {
          background:var(--accent-blue)!important;
          color:#fff!important;
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] button.bg-black:hover {
          background:#0693E3!important;
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] button:not(.bg-black) {
          background:var(--surface-2)!important;
          color:#e5e5e5!important;
        }
        .dashboard-card.course-list-accordion[data-dark-course="1"] button:not(.bg-black):hover {
          background:#333!important;
        }
      `.trim();
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = css;
      document.head.appendChild(style);
    }
  
    function darkify(card){
      if (!card) return;
      if (card.dataset.darkCourse === "1") return;
      card.dataset.darkCourse = "1";
      card.style.setProperty("background-color","var(--surface)","important");
      card.style.setProperty("color","#e5e5e5","important");
      card.style.setProperty("border-color","var(--divider)","important");
    }
  
    // Initial pass
    document.querySelectorAll(".dashboard-card.course-list-accordion").forEach(darkify);
  
    // Watch for new ones (API/SPA)
    const mo = new MutationObserver(muts=>{
      muts.forEach(m=>{
        m.addedNodes.forEach(n=>{
          if (!(n instanceof HTMLElement)) return;
          if (n.matches?.(".dashboard-card.course-list-accordion")) darkify(n);
          n.querySelectorAll?.(".dashboard-card.course-list-accordion").forEach(darkify);
        });
      });
    });
    mo.observe(document.documentElement,{childList:true,subtree:true});
}