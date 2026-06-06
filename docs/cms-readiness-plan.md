# CMS Readiness Plan

## Purpose

This document prepares the current static Celsior website for future CMS migration, most likely WordPress.

The goal is not to build a CMS inside the current static site. The goal is to make content, assets, links, CTAs, and page structures easier to review, update, and hand over.

## Current Site Reality

The current site is static HTML with shared global behavior in `shared.js`.

Content changes currently require:

1. Editing HTML or shared JS
2. Testing locally
3. Committing to GitHub
4. Letting Vercel deploy

This is acceptable during development, but not ideal for long-term marketing ownership.

## Recommended Approach

Do not introduce a live CMS dependency right now.

Instead:

1. Document editable content areas.
2. Track content changes made during review.
3. Define future WordPress field models.
4. Keep the static site stable until the WordPress build begins.
5. Use this repo as the latest reviewed content source for the WordPress developer.

## What Should Become CMS Editable Later

- Navbar labels and dropdown links
- Footer columns and links
- Page hero content
- Section headlines
- Section body copy
- Cards and card descriptions
- CTA button labels and URLs
- HubSpot form IDs and modal text
- Partner logos
- Industry page content
- Case studies
- Blogs/news/events
- SEO titles and descriptions
- Open Graph images

## JSON Content Layer

A JSON content layer may be created later as a structured content reference.

It should not be wired into the static website unless explicitly needed.

Possible use later:

- Make page content easier to review
- Provide clean input for WordPress/ACF field setup
- Act as a temporary source of truth during migration
- Help compare static site content against WordPress content

## Guardrail

Do not make architectural changes that could conflict with the future WordPress build.
