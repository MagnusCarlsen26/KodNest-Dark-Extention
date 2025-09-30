// export function darkifyComboboxButtons() {
//     const STYLE_ID = "__darkify_combobox_btns";
//     if (!document.getElementById(STYLE_ID)) {
//       const css = `
//         [data-dark-combobox="1"] {
//           --cb-surface:#121212;
//           --cb-surface-2:#1b1b1b;
//           --cb-text:#e5e5e5;
//           --cb-border:#2a2a2a;
//           background: var(--cb-surface) !important;
//           color: var(--cb-text) !important;
//           border-color: var(--cb-border) !important;
//         }
//         [data-dark-combobox="1"].\\!text-black,
//         [data-dark-combobox="1"].text-black,
//         [data-dark-combobox="1"] .\\!text-black,
//         [data-dark-combobox="1"] .text-black,
//         [data-dark-combobox="1"] [class*="text-[#0A171C]"] {
//           color: var(--cb-text) !important;
//         }
//         [data-dark-combobox="1"] svg {
//           color: var(--cb-text) !important;
//           stroke: currentColor !important;
//           opacity: .8 !important;
//         }
//         [data-dark-combobox="1"]:hover {
//           background: var(--cb-surface-2) !important;
//         }
//         [data-dark-combobox="1"]:focus-visible {
//           outline: none !important;
//           box-shadow: 0 0 0 2px rgba(255,255,255,.08) inset,
//                       0 0 0 2px rgba(59,130,246,.35) !important;
//         }
//         [data-dark-combobox="1"][aria-expanded="true"] {
//           background: var(--cb-surface-2) !important;
//           border-color: #3b3b3b !important;
//         }
//       `.trim();
//       const style = document.createElement("style");
//       style.id = STYLE_ID;
//       style.textContent = css;
//       document.head.appendChild(style);
//     }
  
//     function apply(btn) {
//       if (!btn || btn.dataset.darkCombobox === "1") return;
//       btn.dataset.darkCombobox = "1";
//       btn.style.setProperty("color", "#e5e5e5", "important");
//       btn.querySelectorAll('.\\!text-black, .text-black, [class*="text-[#0A171C]"]').forEach(n=>{
//         n.style.setProperty("color", "#e5e5e5", "important");
//       });
//       btn.querySelectorAll("svg").forEach(svg=>{
//         svg.style.setProperty("color", "#e5e5e5", "important");
//         svg.style.setProperty("stroke", "currentColor", "important");
//       });
//     }
  
//     document.querySelectorAll('button[role="combobox"]').forEach(apply);
  
//     const mo = new MutationObserver(muts=>{
//       for (const m of muts) {
//         for (const n of m.addedNodes) {
//           if (!(n instanceof HTMLElement)) continue;
//           if (n.matches?.('button[role="combobox"]')) apply(n);
//           n.querySelectorAll?.('button[role="combobox"]').forEach(apply);
//         }
//       }
//     });
//     mo.observe(document.documentElement, {childList:true, subtree:true});
// }

// TODO: Dark theme is not showing in the dropdown.
// export function darkifyComboboxDropdowns() {
//     const STYLE_ID = "__darkify_combobox_dropdowns";
//     if (!document.getElementById(STYLE_ID)) {
//       const css = `
//         [data-dark-combobox-dd="1"] {
//           --dd-surface:#121212;
//           --dd-surface-2:#1b1b1b;
//           --dd-border:#2a2a2a;
//           --dd-text:#e5e5e5;
//           --dd-muted:#a1a1aa;
//           --dd-accent:#FEC834;
//           background: var(--dd-surface) !important;
//           color: var(--dd-text) !important;
//           border: 1px solid var(--dd-border) !important;
//           box-shadow: 0 12px 32px rgba(0,0,0,.5) !important;
//         }
//         [data-dark-combobox-dd="1"] .\\!text-black,
//         [data-dark-combobox-dd="1"] .text-black,
//         [data-dark-combobox-dd="1"] [class*="text-[#0A171C]"] {
//           color: var(--dd-text) !important;
//         }
//         [data-dark-combobox-dd="1"] [role="option"] {
//           color: var(--dd-text) !important;
//         }
//         [data-dark-combobox-dd="1"] [role="option"][data-highlighted],
//         [data-dark-combobox-dd="1"] [role="option"]:hover {
//           background: var(--dd-surface-2) !important;
//         }
//         [data-dark-combobox-dd="1"] [role="option"][aria-selected="true"] {
//           background: var(--dd-surface-2) !important;
//           outline: 1px solid rgba(254,200,52,.35) !important;
//         }
//         [data-dark-combobox-dd="1"] .text-muted,
//         [data-dark-combobox-dd="1"] .text-gray-500 {
//           color: var(--dd-muted) !important;
//         }
//         [data-dark-combobox-dd="1"] svg {
//           color: var(--dd-text) !important;
//           stroke: currentColor !important;
//         }
//         [data-dark-combobox-dd="1"] [role="option"][aria-selected="true"] svg {
//           color: var(--dd-accent) !important;
//         }
//         [data-dark-combobox-dd="1"] [role="separator"],
//         [data-dark-combobox-dd="1"] .separator {
//           background: var(--dd-border) !important;
//         }
//         [data-dark-combobox-dd="1"] input {
//           background: #0f0f0f !important;
//           color: var(--dd-text) !important;
//           border: 1px solid var(--dd-border) !important;
//         }
//         [data-dark-combobox-dd="1"] ::placeholder {
//           color: var(--dd-muted) !important;
//         }
//         [data-dark-combobox-dd="1"] ::-webkit-scrollbar { width: 10px; }
//         [data-dark-combobox-dd="1"] ::-webkit-scrollbar-thumb {
//           background: #2b2b2b;
//           border: 2px solid #121212;
//           border-radius: 8px;
//         }
//       `.trim();
//       const style = document.createElement("style");
//       style.id = STYLE_ID;
//       style.textContent = css;
//       document.head.appendChild(style);
//     }
  
//     function tagDropdownFromButton(btn) {
//       const id = btn.getAttribute("aria-controls");
//       if (!id) return;
//       const panel = document.getElementById(id);
//       if (!panel || panel.dataset.darkComboboxDd === "1") return;
//       panel.dataset.darkComboboxDd = "1";
//       panel.style.setProperty("background", "#121212", "important");
//       panel.style.setProperty("color", "#e5e5e5", "important");
//       panel.querySelectorAll('.\\!text-black, .text-black, [class*="text[#0A171C]"]').forEach(n=>{
//         n.style.setProperty("color", "#e5e5e5", "important");
//       });
//       panel.querySelectorAll("svg").forEach(svg=>{
//         svg.style.setProperty("color", "#e5e5e5", "important");
//         svg.style.setProperty("stroke", "currentColor", "important");
//       });
//     }
  
//     document.querySelectorAll('button[role="combobox"][aria-controls]').forEach(tagDropdownFromButton);
  

// }