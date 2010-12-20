/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 *
 * Modified by Henry A Schimke
*/

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
	// If the url text does not start with 'reddit.com' or 'www.reddit.com' is found in the tab's URL...
	if (
		(tab.url.indexOf('www.reddit.com') == -1)
		&& (tab.url.indexOf('reddit.com') == -1)
        && (tab.url.indexOf('redd.it') == -1)
		&& (tab.url.indexOf('chrome://') == -1) ) {
			// ... show the page action.
			chrome.pageAction.show(tabId);
		}
};

function jumpToRedditUrl( tab ) {
	chrome.tabs.update(tab.id, {"url":"http://redd.it/" + tab.url});
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.pageAction.onClicked.addListener(jumpToRedditUrl);