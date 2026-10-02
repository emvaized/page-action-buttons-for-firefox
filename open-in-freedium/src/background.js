browser.pageAction.onClicked.addListener(onClicked);
browser.browserAction.onClicked.addListener(onClicked);

function onClicked(t,d){
    if (!t.url) return
    const cur = t.url;
    const tar = 'https://freedium-mirror.cfd/' + cur;
    if (d.button == 1)
        chrome.tabs.create({url:tar, active: !!d.modifiers[0]})
    else 
        chrome.tabs.update(t.id,{url:tar})
}