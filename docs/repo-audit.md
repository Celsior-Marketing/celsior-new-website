# Celsior Website Repo Audit

## Purpose

This document tracks cleanup observations for the Celsior static website repo.

The goal is to improve clarity, maintainability, and onboarding without breaking the working site.

## Current State

The site is a static HTML/JS website deployed from GitHub main to Vercel.

Key files:

- `index.html` – homepage
- `shared.js` – shared navbar, mobile drawer, mega menu, footer, HubSpot modal behavior, and related site-wide scripts
- `vercel.json` – Vercel clean URL configuration
- `add-shared-header-footer.js` – utility script, likely used earlier to inject shared header/footer references

## Initial Observations

1. The repo contains both flat HTML pages and clean folder URL pages.
2. Some older file names use mixed casing or legacy naming.
3. `shared.js` carries multiple responsibilities and should eventually be split, but not immediately.
4. Navbar and footer link mapping should be documented before any deletion or renaming.
5. Cleanup should happen in phases, with working site behavior preserved after every step.

## Cleanup Rule

Do not delete, rename, or move working pages until:
- Internal links are audited
- Vercel routing behavior is confirmed
- Redirect or compatibility strategy is decided
- Local preview is tested
- Change is committed separately
