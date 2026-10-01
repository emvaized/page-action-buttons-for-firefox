document.addEventListener("DOMContentLoaded", function(){
	const copiedToClipboardHint = document.getElementById("copiedToClipboardHint");
	if (copiedToClipboardHint) {
		copiedToClipboardHint.textContent = browser.i18n.getMessage("copiedToClipboard", "Copied to clipboard");
	}

	const failedHint = document.getElementById("failedHint");
	if (failedHint) {
		failedHint.textContent = browser.i18n.getMessage("failedToCopyToClipboard", "Failed to copy to clipboard");
	}
	setTimeout(() => window.close(),2000);
});