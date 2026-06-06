# Navbar and Routing Notes

## Current Navbar Behavior

The desktop top-level navbar items are dropdown triggers only. They should not navigate to standalone parent pages.

Top-level labels:

- Our Focus
- Capabilities
- Solutions
- AI & Innovation
- Industries
- Partner Ecosystem
- About

Dropdown child links remain clickable and should route to actual pages.

## Important File

Navbar, mobile drawer, mega menu, footer, and site-wide modal behavior currently live in:

- `shared.js`

## Clean URL Principle

Prefer clean folder URLs:

- `/our-focus/ai-adoption`
- `/capabilities/ai-and-data`
- `/solutions/managed-programs`
- `/partners`

Avoid adding new standalone flat pages unless required for compatibility.
