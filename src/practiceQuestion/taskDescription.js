export default function taskHeader() {
  applyStyles();
  startObserver();
}

// inject one stylesheet (idempotent)
function injectStyles() {
  const id = "kodnest-dark-task-styles";
  if (document.getElementById(id)) return;

  const css = `
    /* TASK AREA: pure black background, default readable text */
    #task-area { background-color: #000000 !important; color: #e6e6e6 !important; border-color: #111 !important; }

    /* Force readable text for everything inside task-area (overrides utility classes / inline colors) */
    #task-area, #task-area * { color: #e6e6e6 !important; }

    /* Keep normal backgrounds unless we explicitly set them (so we don't accidentally 'invert' things) */
    /* Testcase panel: distinctive */
    #task-area .test-case-detail-container {
      background-color: #0a0a0a !important; /* slightly lighter than black */
      color: #e6e6e6 !important;
      border-left: 4px solid #4a90e2 !important;
      padding: 12px !important;
      border-radius: 6px !important;
      margin-top: 12px !important;
      margin-bottom: 12px !important;
    }

    /* Ensure all text inside testcase panel is readable */
    #task-area .test-case-detail-container, 
    #task-area .test-case-detail-container * { color: #e6e6e6 !important; background-color: transparent !important; }

    /* PRE / CODE blocks inside testcases: slightly lighter than panel for contrast */
    #task-area .test-case-detail-container pre,
    #task-area pre {
      background-color: #111111 !important; /* distinct from pure black */
      color: #e6e6e6 !important;
      border: 1px solid #222 !important;
      border-radius: 6px !important;
      padding: 10px !important;
      overflow: auto !important;
    }

    /* Inline code in description — subtle dark pill */
    #task-area .ProseMirror code,
    #task-area code {
      background-color: #0f0f0f !important;
      color: #e6e6e6 !important;
      padding: 0.15rem 0.35rem !important;
      border-radius: 4px !important;
    }

    /* Title right under task-area */
    #task-area > p { color: #e6e6e6 !important; background-color: transparent !important; }

    /* Prevent images or svgs from being visually inverted or blended */
    #task-area img,
    #task-area svg,
    #task-area picture {
      filter: none !important;
      mix-blend-mode: normal !important;
    }

    /* Ensure links remain visible but not forcibly branded */
    #task-area a { color: #8fb3ff !important; }

    /* Avoid accidentally overriding the header area styling elsewhere */
    // #task-area .v2-header, #task-area #task-header { all: initial; }
  `;

  const s = document.createElement("style");
  s.id = id;
  s.appendChild(document.createTextNode(css));
  document.head.appendChild(s);
}

// Keep header/tab styling as before (separate from task-area)
function styleHeaders() {
  const v2Header = document.querySelector(".v2-header");
  if (v2Header) {
    v2Header.style.setProperty("background-color", "#121212", "important");
    v2Header.style.setProperty("color", "#ffffff", "important");
    v2Header.querySelectorAll(".bg-white, [class*='bg-[#fff]']").forEach(el => {
      el.style.setProperty("background-color", "#1e1e1e", "important");
      el.style.setProperty("color", "#ffffff", "important");
      el.style.setProperty("border-color", "#333", "important");
    });
  }

  const taskHeader = document.querySelector("#task-header");
  if (taskHeader) {
    taskHeader.style.setProperty("background-color", "#121212", "important");
    taskHeader.style.setProperty("color", "#ffffff", "important");
    taskHeader.style.setProperty("border-color", "#333", "important");

    taskHeader.querySelectorAll("[id^='practice-tab-']").forEach(tab => {
      tab.style.setProperty("background-color", "#1e1e1e", "important");
      tab.style.setProperty("color", "#ffffff", "important");
      tab.style.setProperty("border-color", "#333", "important");
    });

    const activeTab = taskHeader.querySelector("#practice-tab-STATEMENT");
    if (activeTab) {
      activeTab.style.setProperty("background-color", "#2a2a2a", "important");
      activeTab.style.setProperty("border-color", "#feba01", "important");
      activeTab.style.setProperty("color", "#ffffff", "important");
    }
  }
}

// Apply DOM-level tweaks (keeps spacing/structure intact)
function applyStyles() {
  injectStyles();

  const taskArea = document.querySelector("#task-area");
  if (!taskArea) return;

  styleDescription(taskArea);
  styleTitle(taskArea);
  styleTestCases(taskArea);

  styleHeaders();
}

function styleTitle(taskArea) {
  const title = taskArea.querySelector(":scope > p");
  if (title) {
    title.style.setProperty("color", "#e6e6e6", "important");
    title.style.setProperty("background-color", "transparent", "important");
  }
}

function styleDescription(taskArea) {
  taskArea.style.setProperty("background-color", "#000000", "important");
  taskArea.style.setProperty("color", "#e6e6e6", "important");
  taskArea.style.setProperty("border-color", "#111", "important");
}

function styleTestCases(taskArea) {
  taskArea.querySelectorAll(".test-case-detail-container").forEach(tc => {
    tc.style.setProperty("background-color", "#0a0a0a", "important");
    tc.style.setProperty("border-left", "4px solid #4a90e2", "important");
  });
  taskArea.querySelectorAll("pre").forEach(pre => {
    pre.style.setProperty("background-color", "#111111", "important");
    pre.style.setProperty("color", "#e6e6e6", "important");
  });
}

// Observer management: ensure any old observer is disconnected to avoid leaks
function startObserver() {
    // Disconnect any old observer
    if (window.darkHeaderObserver && typeof window.darkHeaderObserver.disconnect === "function") {
      window.darkHeaderObserver.disconnect();
      window.darkHeaderObserver = null;
    }
  
    const observer = new MutationObserver(() => {
      // Collapse bursts into one run
      if (observer._raf) cancelAnimationFrame(observer._raf);
      observer._raf = requestAnimationFrame(() => {
        applyStyles();
  
        // Disconnect if no longer on a practice page
        if (!window.location.href.includes("/practice/")) {
          observer.disconnect();
          window.darkHeaderObserver = null;
          console.log("MutationObserver disconnected for practice page.");
        }
      });
    });
  
    // Observe #task-area or .v2-header directly if possible; fallback = body
    const taskArea = document.querySelector("#task-area");
    const headerEl = document.querySelector(".v2-header");
    const target = taskArea || headerEl || document.body;
  
    observer.observe(target, { childList: true, subtree: true });
    window.darkHeaderObserver = observer;
  
    console.log("MutationObserver started for practice page.");
}  