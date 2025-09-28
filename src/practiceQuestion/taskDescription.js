// TODO: Change indentation to 4 spaces in this file.
export default function taskDescription() {

    injectStyles();
  
    const taskAreaSelector = "#task-area";
  
    return [
      () => styleTaskArea(taskAreaSelector),
      () => styleTaskTitle(taskAreaSelector),
      () => styleTaskTestCases(taskAreaSelector),
      styleV2Header,
      styleTaskHeader,
    ]

}
  
// inject one stylesheet (idempotent)
function injectStyles() {
  const id = "kodnest-dark-task-styles";

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
function styleV2Header() {

  const v2Header = document.querySelector(".v2-header");

  if (!v2Header) return false;

  v2Header.style.setProperty("background-color", "#121212", "important");
  v2Header.style.setProperty("color", "#ffffff", "important");
  v2Header.querySelectorAll(".bg-white, [class*='bg-\\[#fff\\]']").forEach(el => {
    el.style.setProperty("background-color", "#1e1e1e", "important");
    el.style.setProperty("color", "#ffffff", "important");
    el.style.setProperty("border-color", "#333", "important");
  });

  return true;

}

function styleTaskHeader() {

  const taskHeader = document.querySelector("#task-header");

  if (!taskHeader) return false;

  taskHeader.style.setProperty("background-color", "#121212", "important");
  taskHeader.style.setProperty("color", "#ffffff", "important");
  taskHeader.style.setProperty("border-color", "#333", "important");

  taskHeader.querySelectorAll("[id^='practice-tab-']").forEach(tab => {
    tab.style.setProperty("background-color", "#1e1e1e", "important");
    tab.style.setProperty("color", "#ffffff", "important");
    tab.style.setProperty("border-color", "#333", "important");
  });

  const activeTab = taskHeader.querySelector("#practice-tab-STATEMENT");
  if (!activeTab) return false;
  
  activeTab.style.setProperty("background-color", "#2a2a2a", "important");
  activeTab.style.setProperty("border-color", "#feba01", "important");
  activeTab.style.setProperty("color", "#ffffff", "important");
  
  return true;
}

// Apply DOM-level tweaks (keeps spacing/structure intact)

function styleTaskTitle(taskAreaSelector) {

  const taskArea = document.querySelector(taskAreaSelector);
  if (!taskArea) return false;

  const title = taskArea.querySelector(":scope > p");
  if (!title) return false;


  title.style.setProperty("color", "#e6e6e6", "important");
  title.style.setProperty("background-color", "transparent", "important");

  return true;
}

function styleTaskArea(taskAreaSelector) {

  const taskArea = document.querySelector(taskAreaSelector);
  if (!taskArea) return false;

  taskArea.style.setProperty("background-color", "#000000", "important");
  taskArea.style.setProperty("color", "#e6e6e6", "important");
  taskArea.style.setProperty("border-color", "#111", "important");

  return true;

}

function styleTaskTestCases(taskAreaSelector) {

  const taskArea = document.querySelector(taskAreaSelector);
  if (!taskArea) return false;

  const panels = taskArea.querySelectorAll(".test-case-detail-container");
  const pres = taskArea.querySelectorAll("pre");

  if (panels.length === 0 && pres.length === 0) return false;

  panels.forEach(tc => {
    tc.style.setProperty("background-color", "#0a0a0a", "important");
    tc.style.setProperty("border-left", "4px solid #4a90e2", "important");
  });
  pres.forEach(pre => {
    pre.style.setProperty("background-color", "#111111", "important");
    pre.style.setProperty("color", "#e6e6e6", "important");
  });

  return true;
  
}
