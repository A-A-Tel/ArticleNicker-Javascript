chrome.browserAction.onClicked.addListener((tab) => {
    const urlPart = tab.url.replace(/^https?:\/\//, '');
    const archiveUrl = "https://archive.is/" + urlPart;

    chrome.tabs.create({ url: archiveUrl });
});
