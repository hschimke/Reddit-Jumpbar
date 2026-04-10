#!/bin/bash
set -eo pipefail

command -v node >/dev/null 2>&1 || { echo "Error: node not found"; exit 1; }
[[ -f manifest.json ]] || { echo "Error: manifest.json not found — run from repo root"; exit 1; }

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

echo "Built: $OUTPUT ($(du -sh "$OUTPUT" | awk '{print $1}'))"
