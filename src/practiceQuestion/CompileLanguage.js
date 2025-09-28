export default function CompileLanguage() {
	const applyStyles = () => {
		const root = document.querySelector("#compiler-header");
		if (!root) return;

		// Base wrapper
		root.style.setProperty("background-color", "#0a0a0a", "important");
		root.style.setProperty("color", "#e6e6e6", "important");
		root.style.setProperty("border-color", "#1a1a1a", "important");
		root.style.setProperty("box-shadow", "none", "important");

		// Language selector button
		const langBtn = root.querySelector("#language-selector button");
		if (langBtn) {
			langBtn.style.setProperty("background-color", "#111111", "important");
			langBtn.style.setProperty("color", "#e6e6e6", "important");
			langBtn.style.setProperty("border-color", "#262626", "important");
			langBtn.style.setProperty("box-shadow", "none", "important");
		}

		// Force text color for selector label
		const langLabel = root.querySelector("#language-selector, #language-selector *");
		if (langLabel) {
			root.querySelectorAll("#language-selector, #language-selector *").forEach(el => {
				el.style.setProperty("color", "#e6e6e6", "important");
				el.style.setProperty("background-color", "transparent", "important");
			});
		}

		// Theme switch container label
		root.querySelectorAll("#compiler-settings span, #compiler-settings span *").forEach(el => {
			el.style.setProperty("color", "#f59e0b", "important");
		});

		// Theme switch (checked/unchecked)
		const themeSwitch = root.querySelector("#theme-switch");
		if (themeSwitch) {
			themeSwitch.style.setProperty("background-color", "#000000", "important");
			themeSwitch.style.setProperty("border-color", "#333333", "important");
			const knob = themeSwitch.querySelector("span");
			if (knob) {
				knob.style.setProperty("background-color", "#e6e6e6", "important");
			}
		}

		// Settings row wrapper (holds toggle + buttons): add subtle border
		const settingsRow = root.querySelector("#compiler-settings > div");
		if (settingsRow) {
			settingsRow.style.setProperty("border", "1px solid #262626", "important");
			settingsRow.style.setProperty("border-radius", "8px", "important");
			settingsRow.style.setProperty("padding", "4px", "important");
		}

		// Action buttons (reset, expand)
		root.querySelectorAll("#reset-code-btn, #expand-btn").forEach(btn => {
			btn.style.setProperty("background-color", "#111111", "important");
			btn.style.setProperty("color", "#e6e6e6", "important");
			btn.style.setProperty("border-color", "#262626", "important");
			btn.style.setProperty("box-shadow", "none", "important");
			btn.addEventListener("mouseenter", () => {
				btn.style.setProperty("background-color", "#181818", "important");
			});
			btn.addEventListener("mouseleave", () => {
				btn.style.setProperty("background-color", "#111111", "important");
			});
			btn.querySelectorAll("img, svg").forEach(icon => {
				icon.style.setProperty("filter", "none", "important");
				icon.style.setProperty("color", "#e6e6e6", "important");
			});
		});

		// Make refresh button icon light (if it's an <img>)
		const resetBtn = root.querySelector("#reset-code-btn");
		if (resetBtn) {
			resetBtn.querySelectorAll("img").forEach(img => {
				img.style.setProperty("filter", "invert(1) brightness(1.2)", "important");
			});
			resetBtn.querySelectorAll("svg").forEach(svg => {
				svg.style.setProperty("color", "#e6e6e6", "important");
			});
		}
	};

	// initial run
	applyStyles();

	// observe minimal scope to avoid leaks
	if (!window.compileLanguageObserver) {
		const target = document.querySelector("#compiler-header") || document.body;
		const observer = new MutationObserver(() => {
			if (observer._raf) cancelAnimationFrame(observer._raf);
			observer._raf = requestAnimationFrame(() => {
				applyStyles();
				if (!window.location.href.includes("/practice/")) {
					observer.disconnect();
					window.compileLanguageObserver = null;
				}
			});
		});
		observer.observe(target, { childList: true, subtree: true });
		window.compileLanguageObserver = observer;
	}
}


