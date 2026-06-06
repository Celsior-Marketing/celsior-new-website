# Celsior Temporary Content-Control System: Google Sheet Template Spec

## Purpose

This document defines the proposed Google Sheet structure for temporary content control on the Celsior static website.

The goal is to make content review and small website edits easier before the future WordPress build, without giving the wider team direct GitHub or deployment access.

This system is temporary. It should remain simple, controlled, and easy to retire once the WordPress website is built.

## Intended Workflow

Google Sheet -> Approved export JSON -> Local validation script -> Local apply script -> Local preview -> Adithya review -> Git commit -> Vercel deploy.

Important rule: Google Sheets should not push directly to GitHub or the live website.

Adithya remains the final gatekeeper before anything goes live.

## Recommended Pilot Area

Start with one low-risk pilot area: Homepage rolling news cards.

Why this is a good pilot:
- The content is visible and frequently reviewed.
- It has repeated structured items.
- It needs character and line-length control.
- It is lower risk than changing global navigation or service page body copy.

## Suggested Google Sheet Tabs

### 1. Instructions

Purpose: explain how the sheet should be used, what the approval rules are, and what the team should not edit.

Recommended instruction notes:
- Only rows marked Approved should be exported.
- Do not change system IDs.
- Do not paste long-form content into short-title fields.
- Use warning columns before approval.
- Final website deployment is handled separately by Adithya.

### 2. Homepage News Cards

Recommended pilot tab.

Columns:
- Item ID: system ID, required, not editable by team. Example: news_001.
- Current Text: reference only, not editable by team.
- Proposed Text: required, editable by team.
- Link URL: optional, editable by team.
- Display Order: required number, editable by team.
- Active: dropdown, Yes or No.
- Status: dropdown, Draft, In Review, Approved, Rejected, Applied.
- Approved By: required when Status is Approved.
- Approval Date: required when Status is Approved.
- Character Count: formula, not editable.
- Line-Length Risk: formula, not editable.
- URL Check: formula, not editable.
- Notes: optional reviewer comments.

Recommended validations:
- Proposed Text should be required.
- Proposed Text recommended max: 70 characters.
- Proposed Text warning above: 85 characters.
- Display Order must be a number greater than 0.
- Link URL can be blank. If filled, it should start with /, #, https://, or mailto:.
- Approved By and Approval Date are required when Status is Approved.

Line-length guidance:
- Target balanced 3-line text where possible.
- Avoid very short or very long card text.
- Avoid meaningless filler just to force wrapping.

### 3. Global CTA Links

Use only after the news-card pilot works.

Columns:
- CTA ID: system ID, required, not editable by team.
- Page URL: reference, required.
- Current Label: reference only.
- Proposed Label: optional text update.
- Current Destination: reference only.
- Proposed Destination: optional URL/action update.
- Destination Type: Anchor, Internal Page, External URL, HubSpot Modal, Email, Phone, Other.
- Status: Draft, In Review, Approved, Rejected, Applied.
- Approved By: required when Approved.
- Approval Date: required when Approved.
- Character Count: formula.
- Destination Check: formula.
- Notes: optional comments.

Recommended validations:
- Proposed Label recommended max: 35 characters.
- Proposed Label warning above: 45 characters.
- Proposed Destination should start with /, #, https://, mailto:, tel:, or hubspot-modal:.

### 4. Image Updates

Use later if needed.

Columns:
- Image ID: system ID, required, not editable by team.
- Page URL: reference, required.
- Current Image: reference only.
- Proposed Image URL: required if image is being changed.
- Alt Text: required.
- Status: Draft, In Review, Approved, Rejected, Applied.
- Approved By: required when Approved.
- Approval Date: required when Approved.
- Image URL Check: formula.
- Alt Text Count: formula.
- Notes: optional comments.

Recommended validations:
- Proposed Image URL should start with https://.
- Recommended image formats: jpg, jpeg, png, webp, svg.
- Alt Text should be required and preferably under 125 characters.

## Export JSON Format

Only approved rows should be exported.

Example structure:

```json
{
  "export_version": "1.0",
  "site": "celsior-static",
  "exported_at": "YYYY-MM-DD",
  "approved_by": "Name",
  "changes": [
    {
      "content_area": "homepage_news_cards",
      "item_id": "news_001",
      "proposed_text": "Celsior Joins Jack Henry Fintech Integration Network",
      "link_url": "",
      "display_order": 1,
      "active": true,
      "status": "Approved"
    }
  ]
}
```

## Approval Rules

A row can be exported only if:
- Status is Approved.
- Approved By is not blank.
- Approval Date is not blank.
- Required fields are complete.
- Validation warnings are resolved or consciously accepted.

## Local Validator Responsibilities

The validator script should check:
- JSON structure is valid.
- Export version is supported.
- Required fields are present.
- IDs are recognized.
- Character limits are respected.
- URL formats are valid.
- Approval fields are present.
- No duplicate display orders.
- No duplicate item IDs.
- No unapproved rows are included.

The validator should not modify website files.

## Local Apply Script Responsibilities

The apply script should:
- Run only after validation passes.
- Update only the approved pilot area.
- Show a clear diff.
- Update docs/content-change-log.md.
- Avoid touching unrelated files.

## Change Log Requirement

Every applied change should add an entry to docs/content-change-log.md.

Suggested entry format:

## YYYY-MM-DD

### Homepage News Cards

- Updated news_001
  - Old: ...
  - New: ...
  - Approved by: ...
  - Source: Google Sheet export

## What This System Should Not Do

This temporary system should not:
- Replace WordPress.
- Become a full CMS.
- Allow direct publishing from Google Sheets.
- Give team members GitHub access.
- Modify large page layouts automatically.
- Make uncontrolled sitewide changes.
- Hide approval responsibility.

## Future Expansion Areas

After the homepage news-card pilot works, the system can be expanded carefully to:
- Global CTA labels and destinations.
- Footer links.
- Selected page hero copy.
- Selected page metadata.
- Image and alt text updates.
