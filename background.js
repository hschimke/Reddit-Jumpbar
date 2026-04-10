// Disable the action on Reddit pages — submitting a reddit.com URL to Reddit
// isn't useful. Enable it everywhere else.
function updateActionState(tabId, url) {
    const isReddit = url && (
        url.includes('reddit.com') ||
        url.includes('redd.it')
    );
    if (isReddit) {
        chrome.action.disable(tabId);
    } else {
        chrome.action.enable(tabId);
    }
}

// Fires when a tab's URL or load status changes.
// Only act on 'complete' to avoid multiple calls during navigation.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        updateActionState(tabId, tab.url);
    }
});

// Fires when the user switches to a different tab.
// Must re-evaluate because onUpdated doesn't fire on tab switch.
chrome.tabs.onActivated.addListener(({ tabId }) => {
    chrome.tabs.get(tabId, (tab) => {
        void chrome.runtime.lastError; // suppress "No tab with id" when tab is already closed
        if (tab) {
            updateActionState(tabId, tab.url);
        }
    });
});
