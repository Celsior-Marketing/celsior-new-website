# Site Structure

## Current Site Type

This is a static HTML website deployed through Vercel.

The repo currently contains a mix of:

1. Clean folder URL pages
2. Older flat `.html` pages
3. Shared site-wide JavaScript in `shared.js`

## Preferred URL Pattern

Use clean folder URLs for active pages:

    page-name/index.html -> /page-name
    category/page-name/index.html -> /category/page-name

Examples:

    our-focus/ai-adoption/index.html -> /our-focus/ai-adoption
    capabilities/ai-and-data/index.html -> /capabilities/ai-and-data
    solutions/managed-programs/index.html -> /solutions/managed-programs

## Homepage

Canonical homepage:

    index.html -> /

## Shared Site Shell

The shared navbar, mobile drawer, mega menu, footer, and HubSpot modal behavior currently live in:

    shared.js

## Navbar Parent Pages

The top-level desktop navbar items are dropdown triggers only.

They should not navigate to standalone parent pages.

Top-level labels:

- Our Focus
- Capabilities
- Solutions
- AI & Innovation
- Industries
- Partner Ecosystem
- About

Dropdown child links remain clickable.

## Cleanup Principle

Do not delete legacy flat pages until:

1. All internal links are audited
2. Any external dependency risk is considered
3. Redirect or compatibility approach is agreed
4. Local preview passes
5. The cleanup is committed separately
