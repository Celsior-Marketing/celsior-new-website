#!/usr/bin/env bash
set -euo pipefail

echo "---- GIT STATUS ----"
git status --short

echo ""
echo "---- RECENT COMMITS ----"
git --no-pager log --oneline -5

echo ""
echo "---- DIFF WHITESPACE CHECK ----"
git diff --check

echo ""
echo "---- REQUIRED FILES ----"
required_files=("index.html" "shared.js" "vercel.json")
for file in "${required_files[@]}"; do
  if [[ -f "$file" ]]; then
    echo "OK: $file"
  else
    echo "MISSING: $file"
    exit 1
  fi
done

echo ""
echo "---- HTML FILE COUNT ----"
find . -name "*.html" -not -path "./.git/*" | wc -l

echo ""
echo "---- CLEAN URL FOLDERS WITH INDEX.HTML ----"
find . -mindepth 2 -name "index.html" -not -path "./.git/*" | sed 's#^./##' | sort

echo ""
echo "---- POSSIBLE LEGACY FLAT HTML FILES ----"
find . -maxdepth 1 -name "*.html" -not -name "index.html" | sed 's#^./##' | sort

echo ""
echo "---- VERCEL CONFIG ----"
cat vercel.json

echo ""
echo "Site check complete."
