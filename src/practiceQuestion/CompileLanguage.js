export default function CompileLanguage() {
	
	return [
		styleRootElement,
		styleLanguageSelectorButton,
		styleLanguageSelectorLabel,
		styleThemeSwitchContainerLabel,
		styleThemeSwitch,
		styleSettingsRow,
		styleActionButtons,
		styleResetButtonIcon,
	]

}

function styleRootElement() {

	console.log("styleRootElement new mutation observer applied");

	const root = document.querySelector("#compiler-header");
	if (!root) return false;

	// Base wrapper
	root.style.setProperty("background-color", "#0a0a0a", "important");
	root.style.setProperty("color", "#e6e6e6", "important");
	root.style.setProperty("border-color", "#1a1a1a", "important");
	root.style.setProperty("box-shadow", "none", "important");
	return true;
}

function styleLanguageSelectorButton() {
	const langBtn = document.querySelector("#language-selector button");
	if (!langBtn) return false;

	langBtn.style.setProperty("background-color", "#111111", "important");
	langBtn.style.setProperty("color", "#e6e6e6", "important");
	langBtn.style.setProperty("border-color", "#262626", "important");
	langBtn.style.setProperty("box-shadow", "none", "important");
	return true;
}

function styleLanguageSelectorLabel() {
	const langLabels = document.querySelectorAll("#language-selector, #language-selector *");
	if (langLabels.length === 0) return false;

	langLabels.forEach(el => {
		el.style.setProperty("color", "#e6e6e6", "important");
		el.style.setProperty("background-color", "transparent", "important");
	});
	return true;
}

function styleThemeSwitchContainerLabel() {
	const themeSwitchLabels = document.querySelectorAll("#compiler-settings span, #compiler-settings span *");
	if (themeSwitchLabels.length === 0) return false;

	themeSwitchLabels.forEach(el => {
		el.style.setProperty("color", "#f59e0b", "important");
	});
	return true;
}

function styleThemeSwitch() {
	const themeSwitch = document.querySelector("#theme-switch");
	if (!themeSwitch) return false;

	themeSwitch.style.setProperty("background-color", "#000000", "important");
	themeSwitch.style.setProperty("border-color", "#333333", "important");
	const knob = themeSwitch.querySelector("span");
	if (knob) {
		knob.style.setProperty("background-color", "#e6e6e6", "important");
	}
	return true;
}

function styleSettingsRow() {
	const settingsRow = document.querySelector("#compiler-settings > div");
	if (!settingsRow) return false;

	settingsRow.style.setProperty("border", "1px solid #262626", "important");
	settingsRow.style.setProperty("border-radius", "8px", "important");
	settingsRow.style.setProperty("padding", "4px", "important");
	return true;
}

function styleActionButtons() {
	const actionButtons = document.querySelectorAll("#reset-code-btn, #expand-btn");
	if (actionButtons.length === 0) return false;

	actionButtons.forEach(btn => {
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
	return true;
}

function styleResetButtonIcon() {
	const resetBtn = document.querySelector("#reset-code-btn");
	if (!resetBtn) return false;

	resetBtn.querySelectorAll("img").forEach(img => {
		img.style.setProperty("filter", "invert(1) brightness(1.2)", "important");
	});
	resetBtn.querySelectorAll("svg").forEach(svg => {
		svg.style.setProperty("color", "#e6e6e6", "important");
	});
	return true;
}

	// // observe minimal scope to avoid leaks
	// if (!window.compileLanguageObserver) {
	// 	const target = document.querySelector("#compiler-header") || document.body;
	// 	const observer = new MutationObserver(() => {
	// 		if (observer._raf) cancelAnimationFrame(observer._raf);
	// 		observer._raf = requestAnimationFrame(() => {
	// 			applyStyles();
	// 			if (!window.location.href.includes("/practice/")) {
	// 				observer.disconnect();
	// 				window.compileLanguageObserver = null;
	// 			}
	// 		});
	// 	});
	// 	observer.observe(target, { childList: true, subtree: true });
	// 	window.compileLanguageObserver = observer;
	// }