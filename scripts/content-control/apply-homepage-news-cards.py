#!/usr/bin/env python3

import html
import json
import re
import subprocess
import sys
from pathlib import Path
from datetime import date

ROOT = Path(__file__).resolve().parents[2]
VALIDATOR = ROOT / "scripts/content-control/validate-content-export.py"
INDEX = ROOT / "index.html"
CHANGELOG = ROOT / "docs/content-change-log.md"

START_MARKER = '<div class="carousel-track" id="carouselTrack">'
END_MARKER = '<div class="carousel-fade carousel-fade--left"></div>'


def run_validator(export_path):
    result = subprocess.run(
        [sys.executable, str(VALIDATOR), str(export_path)],
        cwd=ROOT,
        text=True,
        capture_output=True,
    )
    print(result.stdout)
    if result.returncode != 0:
        if result.stderr:
            print(result.stderr)
        print("❌ Apply stopped because validation failed.")
        return False
    return True


def extract_block(text):
    start = text.find(START_MARKER)
    if start == -1:
        raise ValueError("Could not find carousel start marker in index.html")

    end = text.find(END_MARKER, start)
    if end == -1:
        raise ValueError("Could not find carousel end marker in index.html")

    return start, end, text[start:end]


def get_current_titles(block):
    return re.findall(r'<h3 class="sc-news-title">(.*?)</h3>', block, flags=re.S)


def build_new_titles(changes):
    active_rows = [r for r in changes if r.get("active") is True]
    active_rows.sort(key=lambda r: r["display_order"])
    return [r["proposed_text"] for r in active_rows]


def replace_titles(block, new_titles):
    current_titles = get_current_titles(block)

    if len(current_titles) != len(new_titles):
        raise ValueError(
            f"Title count mismatch. HTML has {len(current_titles)} titles, export has {len(new_titles)} active titles."
        )

    idx = 0

    def repl(match):
        nonlocal idx
        original_inner_html = match.group(1)
        current_text = html.unescape(original_inner_html).strip()
        proposed_text = new_titles[idx]
        idx += 1

        # Preserve original HTML exactly when text is unchanged.
        # This avoids converting entities like &mdash; and &rsquo; unnecessarily.
        if current_text == proposed_text:
            return match.group(0)

        new_text = html.escape(proposed_text, quote=False)
        return f'<h3 class="sc-news-title">{new_text}</h3>'

    return re.sub(r'<h3 class="sc-news-title">(.*?)</h3>', repl, block, flags=re.S)


def update_changelog(export_path, changes, old_titles, new_titles, approved_by):
    today = date.today().isoformat()
    lines = []
    lines.append("")
    lines.append(f"## {today}")
    lines.append("")
    lines.append("### Homepage News Cards")
    lines.append("")
    lines.append(f"- Source: `{export_path}`")
    lines.append(f"- Approved by: {approved_by}")
    lines.append("")

    changed_any = False
    for i, (old, new) in enumerate(zip(old_titles, new_titles), start=1):
        old_unescaped = html.unescape(old).strip()
        if old_unescaped != new:
            changed_any = True
            lines.append(f"- Updated news card {i}")
            lines.append(f"  - Old: {old_unescaped}")
            lines.append(f"  - New: {new}")

    if not changed_any:
        lines.append("- No text changes. Export matched the current homepage news card text.")

    existing = CHANGELOG.read_text(encoding="utf-8") if CHANGELOG.exists() else "# Content Change Log\n"
    CHANGELOG.write_text(existing.rstrip() + "\n" + "\n".join(lines) + "\n", encoding="utf-8")


def main():
    if len(sys.argv) not in (2, 3):
        print("Usage:")
        print("  python3 scripts/content-control/apply-homepage-news-cards.py <export-json>")
        print("  python3 scripts/content-control/apply-homepage-news-cards.py <export-json> --apply")
        sys.exit(1)

    export_path = Path(sys.argv[1])
    apply_mode = len(sys.argv) == 3 and sys.argv[2] == "--apply"

    if len(sys.argv) == 3 and sys.argv[2] != "--apply":
        print("❌ Unknown option. Did you mean --apply?")
        sys.exit(1)

    if not export_path.is_absolute():
        export_path = ROOT / export_path

    print("---- VALIDATING EXPORT ----")
    if not run_validator(export_path):
        sys.exit(1)

    data = json.loads(export_path.read_text(encoding="utf-8"))
    index_text = INDEX.read_text(encoding="utf-8")

    start, end, block = extract_block(index_text)

    old_titles = get_current_titles(block)
    new_titles = build_new_titles(data["changes"])

    print("---- HOMEPAGE NEWS CARD CHANGE PLAN ----")
    print(f"Mode: {'APPLY' if apply_mode else 'DRY RUN'}")
    print(f"Active exported cards: {len(new_titles)}")
    print(f"Current HTML cards: {len(old_titles)}")
    print("")

    change_count = 0
    for i, (old, new) in enumerate(zip(old_titles, new_titles), start=1):
        old_unescaped = html.unescape(old).strip()
        status = "CHANGE" if old_unescaped != new else "same"
        if status == "CHANGE":
            change_count += 1
        print(f"{i}. {status}")
        print(f"   Current : {old_unescaped}")
        print(f"   Proposed: {new}")

    if len(old_titles) != len(new_titles):
        print("")
        print("❌ Cannot continue because card count does not match.")
        sys.exit(1)

    print("")
    print(f"Planned text changes: {change_count}")

    if not apply_mode:
        print("")
        print("✅ Dry run complete. No website files were changed.")
        print("To apply, run again with --apply.")
        return

    new_block = replace_titles(block, new_titles)
    new_index = index_text[:start] + new_block + index_text[end:]

    INDEX.write_text(new_index, encoding="utf-8")
    update_changelog(
        export_path if not str(export_path).startswith(str(ROOT)) else export_path.relative_to(ROOT),
        data["changes"],
        old_titles,
        new_titles,
        data.get("approved_by", ""),
    )

    print("")
    print("✅ Applied homepage news card updates.")
    print("Updated files:")
    print("- index.html")
    print("- docs/content-change-log.md")


if __name__ == "__main__":
    main()
