# Pending Pages Tracker

## Purpose

This document tracks URLs that may currently return 404 locally or on dev because the corresponding pages are still pending from the developer.

Do not remove or rewrite these links until the incoming developer files are reviewed.

## Known / Expected Pending Pages

| URL | Where it appears | Status | Action |
|---|---|---|---|
| `/centers-of-excellence` | AI & Innovation dropdown | Pending developer page | Do not change yet |

## Review Process When Developer Files Arrive

1. Add incoming files to the local repo carefully.
2. Confirm whether each pending URL now has a matching `index.html`.
3. Test locally with `python3 -m http.server 8080`.
4. Update navbar/dropdown links only if the delivered folder names differ.
5. Commit page additions separately from cleanup changes.

## Notes

Some 404s are expected because not all pages have been delivered yet. Treat missing pages as pending unless confirmed otherwise.
