import main from "./src/index.js";
console.log("Content script loaded");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    try { main(); } catch (e) { console.error("Error in main:", e); }
  }, { once: true });
} else {
  try { main(); } catch (e) { console.error("Error in main:", e); }
}