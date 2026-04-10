# Reddit Jumpbar — MV3 Upgrade Design

**Date:** 2026-04-10
**Status:** Approved

## Overview

Upgrade Reddit Jumpbar from Manifest V2 to Manifest V3, and replace the defunct `redd.it` toolbar redirect with a two-action popup: Submit to Reddit and Search Reddit. The extension continues to show its icon only on non-Reddit pages.

## Goal

Give users a fast way to either submit the current page to Reddit or search Reddit for existing discussion about it — directly from the browser toolbar, without leaving the page first.

## File Structure

| File | Role |
|---|---|
| `manifest.json` | MV3 manifest — service worker, action, permissions |
| `background.js` | Service worker — manages icon enabled/disabled state per tab |
| `popup.html` | Popup shell — two-button UI, no inline scripts |
| `popup.js` | Popup logic — reads current tab URL, opens Reddit URLs |
| `assets/images/` | Unchanged — existing icons reused |
| `_locales/` | Unchanged |

`background.html` is deleted.

## Manifest Changes

- `manifest_version`: `2` → `3`
- `background_page` removed; replaced with `background: { "service_worker": "background.js" }`
- `page_action` removed; replaced with `action` (with same default icon and title)
- `permissions`: keep `"tabs"`, add `"activeTab"`

## Service Worker (`background.js`)

Listens to two events:
- `chrome.tabs.onUpdated` — fires when a tab's URL changes
- `chrome.tabs.onActivated` — fires when the user switches to a different tab

For each event, checks whether the tab URL contains `reddit.com` or `redd.it`:
- **Reddit page:** `chrome.action.disable(tabId)` + `chrome.action.setIcon()` with a greyed icon
- **Non-Reddit page:** `chrome.action.enable(tabId)` + restore normal icon

The existing URL-matching logic from the old `background.js` is reused directly.

## Popup

### `popup.html`
- Minimal HTML shell
- Two buttons: "Submit to Reddit" and "Search Reddit"
- Loads `popup.js` via `<script src="popup.js">` (no inline scripts — MV3 CSP)

### `popup.js`
- On load: `chrome.tabs.query({ active: true, currentWindow: true })` to get current tab URL
- **Submit:** opens `https://www.reddit.com/submit?url=[encodeURIComponent(url)]` in a new tab
- **Search:** opens `https://www.reddit.com/search/?q=url:[encodeURIComponent(url)]` in a new tab
- Both handlers call `window.close()` after opening the tab

## What Is Not Changing

- Extension name, description, and localization strings
- Icon assets
- Core concept: icon visible only on non-Reddit pages

## Out of Scope

- Popup visual styling beyond functional defaults
- Context menu entries
- Any state management or user credentials
