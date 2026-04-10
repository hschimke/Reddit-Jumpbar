# Build Script Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a shell script that produces a versioned ZIP file of the extension ready to upload to the Chrome Web Store.

**Architecture:** Single `build.sh` at the repo root. Reads version from `manifest.json` via node, removes any existing ZIP, zips the allowlisted files, and prints the result.

**Tech Stack:** bash, zip (macOS built-in), node (version extraction only).

---

## File Map

| Action | File |
|---|---|
| Create | `build.sh` |

---

### Task 1: Create and verify `build.sh`

**Files:**
- Create: `build.sh`

- [ ] **Step 1: Create `build.sh`**

Create `/Users/henry/sandbox/Reddit-Jumpbar/build.sh` with this exact content:

```bash
#!/bin/bash
set -e

VERSION=$(node -e "process.stdout.write(require('./manifest.json').version)")
OUTPUT="reddit-jumpbar-${VERSION}.zip"

rm -f "$OUTPUT"

zip -r "$OUTPUT" \
  manifest.json \
  background.js \
  popup.html \
  popup.js \
  _locales/ \
  assets/

echo "Built: $OUTPUT ($(du -sh "$OUTPUT" | cut -f1))"
```

- [ ] **Step 2: Make it executable**

```bash
chmod +x build.sh
```

- [ ] **Step 3: Run it and verify output**

```bash
./build.sh
```

Expected output (size may vary slightly):
```
  adding: manifest.json (deflated ...)
  adding: background.js (deflated ...)
  adding: popup.html (deflated ...)
  adding: popup.js (deflated ...)
  adding: _locales/ (stored 0%)
  ...
Built: reddit-jumpbar-2.0.0.zip (NNK)
```

Then verify the ZIP contents look correct — no docs/, no .git/, no build.sh:

```bash
unzip -l reddit-jumpbar-2.0.0.zip
```

Expected: only `manifest.json`, `background.js`, `popup.html`, `popup.js`, `_locales/…`, `assets/…` entries.

- [ ] **Step 4: Clean up the generated ZIP (don't commit it)**

```bash
rm reddit-jumpbar-2.0.0.zip
```

- [ ] **Step 5: Add ZIP files to .gitignore**

Create `/Users/henry/sandbox/Reddit-Jumpbar/.gitignore` with:

```
*.zip
```

- [ ] **Step 6: Commit**

```bash
git add build.sh .gitignore
git commit -m "feat: add build script to produce Chrome Web Store ZIP"
```
