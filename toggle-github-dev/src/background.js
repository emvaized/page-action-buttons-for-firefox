browser.pageAction.onClicked.addListener((t,d) => onClick(t,d));
browser.tabs.onUpdated.addListener(showPageAction);

function showPageAction(tId, i, t){
    if (!i.status == "complete") return;
    if (!t.url) return
	if (t.url.includes('://github.dev') || t.url.includes('://vscode.dev')){
		browser.pageAction.setIcon({ tabId: tId, path: { 64: "./github.svg" } });
        browser.pageAction.setTitle({ tabId: tId, title: "Switch to GitHub.com" });
	} else {
		browser.pageAction.setIcon({ tabId: tId, path: { 64: "./vscode.svg" }});
        browser.pageAction.setTitle({ tabId: tId, title: "Switch to VSCode.dev" });
	}
}

function onClick(t,data){
    if (!t.url) return
    let cur, tar
    if (t.url.includes('://github.dev') || t.url.includes('://vscode.dev')) {
        cur = '://vscode.dev/github'; tar = '://github.com'
	} else {
        cur = '://github.com'; tar = '://vscode.dev/github'
    }
    if (data.button == 1)
        chrome.tabs.create({url:t.url.replace(cur, tar), active: !data.modifiers[0]})
    else 
        chrome.tabs.update(t.id,{url:t.url.replace(cur, tar)})
}