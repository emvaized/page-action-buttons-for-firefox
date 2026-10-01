browser.pageAction.onClicked.addListener(async (tab) => {
	browser.pageAction.openPopup();
	copyUrlToClipboard(tab);
});

async function copyUrlToClipboard(tab) {

	/// Fetch text selection from the active tab
	let selectedText;
	const selection = await browser.scripting.executeScript({
		target: { tabId: tab.id },
		func: () => window.getSelection().toString(),
	});
	if (selection && selection[0] && selection[0].result) {
		selectedText = selection[0].result;
	}

	try {
		await navigator.clipboard.writeText(selectedText ? tab.url + '#:~:text=' + encodeURIComponent(selectedText).replace(/'/g, "%27").replace(/-/g, "%2D") : tab.url);
		browser.pageAction.setIcon({tabId: tab.id, path: "icons/check-filled.svg"});
		browser.pageAction.setPopup({
			tabId: tab.id,
			popup: "/success-popup.html",
		});
	} catch (error) {
		console.error(error.message);

		browser.pageAction.setIcon({tabId: tab.id, path: "icons/warning.svg"});
		browser.pageAction.setPopup({
			tabId: tab.id,
			popup: "/failure-popup.html",
		});
	}

	setTimeout(function(){
		browser.pageAction.setIcon({tabId: tab.id, path: "icons/link.svg"});
		browser.pageAction.setPopup({
			tabId: tab.id,
			popup: "",
		});
	},2000);
}

chrome.commands.onCommand.addListener(function(command, senderTab) {
    if (command === "copy-url") {
		browser.pageAction.openPopup();
		copyUrlToClipboard(senderTab);
    }
});
