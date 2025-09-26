// TODO: Some white padding is there in bottom of the page
export default function footer() {
    const COLOR = "#e5e5e5";
    const BG1     = "#0b0b0b";
    const BG2     = "#111"; // overlay surface
    const GLOW    = "0 0 0.5px rgba(255,255,255,.9), 0 0 8px rgba(59,130,246,.35)";

    // find hero containers by their letter spans
    function findHeros(ctx = document) {
        const spans = Array.from(ctx.querySelectorAll('span.inline-block.font-bold'));
        const roots = new Set();
        spans.forEach(s => {
            if (!/translateZ\(/.test(s.getAttribute("style") || "")) return;
            const root =
                s.closest('.\\!text-black') ||
                s.closest('[class*="py-\\[40px\\]"]') ||
                s.closest('.relative');
            if (root) roots.add(root);
        });
        return Array.from(roots);
    }

    function darkify(root) {
        if (!root) return;
        // container text color
        root.style.setProperty("color", COLOR, "important");

        // darken background layers if present
        const abs = root.querySelector(".absolute.inset-0");
        if (abs) {
            abs.style.setProperty(
                "background",
                `radial-gradient(1200px 600px at 50% 10%, rgba(59,130,246,.10), transparent 60%), linear-gradient(${BG1}, ${BG1})`,
                "important"
            );
            abs.style.setProperty("backgroundImage", "none", "important");
        }
        root.style.setProperty("background-color", BG1, "important");

        // override each letter
        root.querySelectorAll("span.inline-block.font-bold").forEach(s => {
            s.style.setProperty("color",                 COLOR, "important");
            s.style.setProperty("text-shadow",     GLOW,    "important");
            s.style.setProperty("textShadow",        GLOW,    "important"); // some libs set camelCase
        });

        // soften wrappers
        root.querySelectorAll("[style]").forEach(el => {
            const c = getComputedStyle(el).color;
            if (c === "rgb(0, 0, 0)") el.style.setProperty("color", COLOR, "important");
            const bg = getComputedStyle(el).backgroundColor;
            if (bg === "rgb(255, 255, 255)" || bg === "rgba(0, 0, 0, 0)") {
                el.style.setProperty("background-color", BG2, "important");
            }
        });
    }

    // initial pass
    findHeros().forEach(darkify);
    darkify(document.documentElement); // Apply to the whole document initially

    // re-apply if the component re-renders/updates inline styles
    const mo = new MutationObserver(muts => {
        for (const m of muts) {
            if (m.type === "childList") {
                m.addedNodes.forEach(n => {
                    if (!(n instanceof HTMLElement)) return;
                    if (n.matches?.('span.inline-block.font-bold')) {
                        const root =
                            n.closest('.\\!text-black') ||
                            n.closest('[class*="py-\\[40px\\]"]') ||
                            n.closest('.relative');
                        if (root) darkify(root);
                    }
                    findHeros(n).forEach(darkify);
                    darkify(n); // Apply darkify to the added node itself
                });
            } else if (m.type === "attributes" && m.target instanceof HTMLElement) {
                if (
                    m.target.matches('span.inline-block.font-bold') ||
                    m.target.matches('.\\!text-black, [class*="py-\\[40px\\]"], .relative')
                ) {
                    const root =
                        m.target.closest?.('.\\!text-black') ||
                        m.target.closest?.('[class*="py-\\[40px\\]"]') ||
                        m.target.closest?.('.relative') ||
                        m.target;
                    darkify(root);
                }
            }
        }
    });
    mo.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style"]
    });

    // cleanup handle if you ever need it
    window.__darkHeroStop?.();
    window.__darkHeroStop = () => mo.disconnect();

    // Call darkify again after a short delay to catch any late-loading elements
    setTimeout(() => {
        findHeros().forEach(darkify);
        darkify(document.documentElement);
    }, 1000);

    console.log("Hero heading forced to dark (inline !important) with soft glow.");
}
