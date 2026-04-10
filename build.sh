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
