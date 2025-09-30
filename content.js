import main from "./src/index.js";
console.log("Content script loaded");

// Rerender extension on SPA navigation
// Prevent double install
if (!window.__spaWatcherInstalled__) {

    window.__spaWatcherInstalled__ = true;

    function apply() {
        main();
        requestAnimationFrame(main); // run again after React re-renders
        setTimeout(main, 60);                // run again after async/lazy render
    }

    // Hook history API
    const _push = history.pushState;
    history.pushState = function (...args) {
        const ret = _push.apply(this, args);
        window.dispatchEvent(new Event("spa:navigation"));
        return ret;
    };

    const _replace = history.replaceState;
    history.replaceState = function (...args) {
        const ret = _replace.apply(this, args);
        window.dispatchEvent(new Event("spa:navigation"));
        return ret;
    };

    // Listen for SPA nav + back/forward
    window.addEventListener("spa:navigation", apply);
    window.addEventListener("popstate", apply);

    // Fallback: URL poller (if app bypasses pushState hooks)
    let last = location.href;
    setInterval(() => {
        if (location.href !== last) {
            last = location.href;
            apply();
        }
    }, 200);

    // Initial run
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", apply, { once: true });
    } else {
        apply();
    }
}
