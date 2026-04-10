document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || tabs.length === 0) return;
        const tab = tabs[0];
        const encodedUrl = encodeURIComponent(tab.url);

        document.getElementById('submit').addEventListener('click', () => {
            chrome.tabs.create({ url: `https://www.reddit.com/submit?url=${encodedUrl}` });
            window.close();
        });

        document.getElementById('search').addEventListener('click', () => {
            chrome.tabs.create({ url: `https://www.reddit.com/search/?q=url:${encodedUrl}` });
            window.close();
        });
    });
});
