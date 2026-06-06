#!/usr/bin/env python3

import json
import re
import sys
from pathlib import Path
from datetime import datetime

SUPPORTED_EXPORT_VERSION = "1.0"
SUPPORTED_SITE = "celsior-static"
SUPPORTED_CONTENT_AREA = "homepage_news_cards"

REQUIRED_TOP_LEVEL_FIELDS = [
    "export_version",
    "site",
    "exported_at",
    "source",
    "approved_by",
    "content_area",
    "changes",
]

REQUIRED_CHANGE_FIELDS = [
    "item_id",
    "current_text",
    "proposed_text",
    "link_url",
    "display_order",
    "active",
    "status",
    "approved_by",
    "approval_date",
]

VALID_STATUS = {"Approved"}
VALID_URL_PREFIXES = ("/", "#", "https://", "mailto:")
ITEM_ID_PATTERN = re.compile(r"^news_[0-9]{3}$")


def fail(message):
    print(f"❌ {message}")
    return False


def warn(message):
    print(f"⚠️  {message}")


def ok(message):
    print(f"✅ {message}")


def is_valid_date(value):
    try:
        datetime.strptime(value, "%Y-%m-%d")
        return True
    except Exception:
        return False


def validate(path):
    errors = 0
    warnings = 0

    path = Path(path)

    if not path.exists():
        print(f"❌ File not found: {path}")
        return 1

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"❌ Invalid JSON: {e}")
        return 1

    ok(f"JSON parsed: {path}")

    for field in REQUIRED_TOP_LEVEL_FIELDS:
        if field not in data:
            errors += 1
            fail(f"Missing top-level field: {field}")

    if errors:
        return 1

    if data["export_version"] != SUPPORTED_EXPORT_VERSION:
        errors += 1
        fail(f"Unsupported export_version: {data['export_version']}")

    if data["site"] != SUPPORTED_SITE:
        errors += 1
        fail(f"Unsupported site: {data['site']}")

    if data["content_area"] != SUPPORTED_CONTENT_AREA:
        errors += 1
        fail(f"Unsupported content_area: {data['content_area']}")

    if not is_valid_date(data["exported_at"]):
        errors += 1
        fail("exported_at must use YYYY-MM-DD format")

    if not str(data["approved_by"]).strip():
        errors += 1
        fail("approved_by cannot be blank")

    if not isinstance(data["changes"], list):
        errors += 1
        fail("changes must be a list")
        return 1

    if len(data["changes"]) == 0:
        errors += 1
        fail("changes list cannot be empty")

    seen_ids = set()
    seen_orders = set()

    for idx, row in enumerate(data["changes"], start=1):
        prefix = f"Row {idx}"

        if not isinstance(row, dict):
            errors += 1
            fail(f"{prefix}: row must be an object")
            continue

        for field in REQUIRED_CHANGE_FIELDS:
            if field not in row:
                errors += 1
                fail(f"{prefix}: missing field: {field}")

        if any(field not in row for field in REQUIRED_CHANGE_FIELDS):
            continue

        item_id = str(row["item_id"]).strip()
        proposed_text = str(row["proposed_text"]).strip()
        link_url = str(row["link_url"]).strip()
        status = str(row["status"]).strip()
        approved_by = str(row["approved_by"]).strip()
        approval_date = str(row["approval_date"]).strip()

        if not ITEM_ID_PATTERN.match(item_id):
            errors += 1
            fail(f"{prefix}: item_id must look like news_001. Found: {item_id}")

        if item_id in seen_ids:
            errors += 1
            fail(f"{prefix}: duplicate item_id: {item_id}")
        seen_ids.add(item_id)

        if not proposed_text:
            errors += 1
            fail(f"{prefix}: proposed_text cannot be blank")

        if len(proposed_text) > 85:
            errors += 1
            fail(f"{prefix}: proposed_text exceeds hard limit of 85 characters ({len(proposed_text)})")
        elif len(proposed_text) > 70:
            warnings += 1
            warn(f"{prefix}: proposed_text is above recommended 70 characters ({len(proposed_text)})")

        if link_url and not link_url.startswith(VALID_URL_PREFIXES):
            errors += 1
            fail(f"{prefix}: link_url must start with /, #, https://, or mailto:. Found: {link_url}")

        if not isinstance(row["display_order"], int):
            errors += 1
            fail(f"{prefix}: display_order must be a number")
        else:
            display_order = row["display_order"]
            if display_order <= 0:
                errors += 1
                fail(f"{prefix}: display_order must be greater than 0")
            if display_order in seen_orders:
                errors += 1
                fail(f"{prefix}: duplicate display_order: {display_order}")
            seen_orders.add(display_order)

        if not isinstance(row["active"], bool):
            errors += 1
            fail(f"{prefix}: active must be true or false")

        if status not in VALID_STATUS:
            errors += 1
            fail(f"{prefix}: only Approved rows can be exported. Found status: {status}")

        if not approved_by:
            errors += 1
            fail(f"{prefix}: approved_by cannot be blank")

        if not is_valid_date(approval_date):
            errors += 1
            fail(f"{prefix}: approval_date must use YYYY-MM-DD format")

    print("")
    print("Validation summary")
    print("------------------")
    print(f"File: {path}")
    print(f"Rows checked: {len(data['changes'])}")
    print(f"Warnings: {warnings}")
    print(f"Errors: {errors}")

    if errors:
        print("")
        print("❌ Validation failed. No website files were changed.")
        return 1

    print("")
    print("✅ Validation passed. No website files were changed.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage:")
        print("  python3 scripts/content-control/validate-content-export.py <path-to-export-json>")
        sys.exit(1)

    sys.exit(validate(sys.argv[1]))
