# Build Script Design

**Date:** 2026-04-10
**Status:** Approved

## Goal

A shell script that produces a versioned ZIP file ready to upload to the Chrome Web Store.

## Output

`reddit-jumpbar-<version>.zip` — where `<version>` is read from `manifest.json`. Example: `reddit-jumpbar-2.0.0.zip`.

## File: `build.sh` (repo root)

Single shell script, executable. Steps:

1. Read version from `manifest.json` using `node -e`
2. Set output filename: `reddit-jumpbar-<version>.zip`
3. Remove existing ZIP with that name (idempotent)
4. Run `zip -r <output> manifest.json background.js popup.html popup.js _locales/ assets/`
5. Print output filename and file size

## What Is Included (allowlist)

- `manifest.json`
- `background.js`
- `popup.html`
- `popup.js`
- `_locales/` (all locale subdirectories)
- `assets/` (all images)

## What Is Excluded

Everything not on the allowlist — docs, README, ScreenShot.PNG, license.txt, build.sh itself, .git/.

## Dependencies

- `zip` — pre-installed on macOS
- `node` — used only to read the version string from manifest.json

## Out of Scope

- Minification or bundling
- CI integration
- Cross-platform support (Windows)
