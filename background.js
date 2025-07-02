chrome.browserAction.onClicked.addListener((tab) => {
    const urlPart = tab.url.replace(/^https?:\/\//, '');
    const archiveUrl = "https://archive.is/" + urlPart;

    chrome.tabs.create({ url: archiveUrl }, (newTab) => {

        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {

            if (tabId === newTab.id && changeInfo.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                chrome.tabs.executeScript(newTab.id, {
                    code: '(' + checkXPath.toString() + ')();'
                });

            }
        });
    });
});

function checkXPath() {
    const xpath = "/html/body/center/div[1]/div[5]/div[4]/div[2]/a[1]";
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const node = result.singleNodeValue;

    if (node) {
        window.location.href = node.getAttribute("href")
    } else {
        window.close()
    }
}
