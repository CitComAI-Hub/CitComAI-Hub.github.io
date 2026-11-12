"""Copy the rulebook of the CitCom.ai Data Space into the site, at build time.

The rulebook is written in its own repository (CitComAI-Hub/citcom-ds-rulebook), where anyone can
propose a change. The site shows it without keeping a copy in this repository: this script takes
its Markdown files and writes them into docs/rulebook/ (rules.md and classes/, which git ignores;
index.md, the overview, belongs to this repository). ``make build``, ``make serve`` and CI run it
before Zensical.

Pages (source in the rulebook repository → page of the site):

    rulebook/README.md            → rulebook/rules.md
    classes/<class>.md            → rulebook/classes/<class>.md
    classes/<class>.terms.md      → rulebook/classes/<class>.terms.md   (terms template)

On the way, every page gets:

- front matter: a title, a description, the edit link to the rulebook repository (the edit button
  of the page, see docs/overrides/partials/actions.html), the date and authors of its last change
  in that repository, and the file and commit it comes from (both shown at the end of the page,
  docs/overrides/partials/source-file.html);
- a blank line before lists that follow a paragraph (GitHub renders them without it, Python-Markdown
  does not);
- its relative links rewritten: to another imported file → that page of the site; to anything
  else in the repository (the technical annex, PLAN.md...) → that file on GitHub.

Where the rulebook comes from:

- RULEBOOK_DIR=<path>: a local clone, as it is on disk (to preview a change before proposing it);
- otherwise the main branch on GitHub, cloned into .cache/rulebook (updated on every run).

Only the Python standard library and git are needed.
"""

from __future__ import annotations

import os
import re
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path, PurePosixPath

REPO = "CitComAI-Hub/citcom-ds-rulebook"
REPO_URL = f"https://github.com/{REPO}"
BRANCH = "main"

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "rulebook"
CACHE = ROOT / ".cache" / "rulebook"

# Links to a folder of the rulebook repository that has a better place on the site
FOLDERS = {"classes": "rules.md#7-usage-terms-policy-classes"}

# Markdown inline links and images: [text](target) or ![alt](target "title")
# A list item
ITEM = re.compile(r"^(\s*)([-*+]|\d+\.)\s")

LINK = re.compile(r"(!?\[[^\]]*\]\()([^)\s]+)((?:\s+\"[^\"]*\")?\))")


def git(cwd: Path, *args: str) -> str:
    return subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, check=True).stdout


def fetch() -> Path:
    """The rulebook repository: RULEBOOK_DIR, or a clone of main kept in .cache/rulebook."""
    local = os.environ.get("RULEBOOK_DIR")
    if local:
        return Path(local).resolve()
    if (CACHE / ".git").is_dir():
        git(CACHE, "fetch", "--quiet", "origin", BRANCH)
        git(CACHE, "reset", "--quiet", "--hard", f"origin/{BRANCH}")
    else:
        CACHE.parent.mkdir(parents=True, exist_ok=True)
        # Full history: the date and authors of each page come from it (the repository is small)
        subprocess.run(["git", "clone", "--quiet", "--branch", BRANCH, f"{REPO_URL}.git", str(CACHE)], check=True)
    return CACHE


def pages(src: Path) -> dict[str, str]:
    """Imported files: path in the rulebook repository → path under docs/rulebook/."""
    mapping = {"rulebook/README.md": "rules.md"}
    for path in sorted((src / "classes").glob("*.md")):
        mapping[f"classes/{path.name}"] = f"classes/{path.name}"
    return mapping


def facts(src: Path, path: str) -> dict | None:
    """Date of the last change and authors (A to Z) of a file, or None if it has no commits."""
    try:
        day = git(src, "log", "-1", "--format=%as", "--", path).strip()
        blame = git(src, "blame", "--line-porcelain", "--", path)
    except subprocess.CalledProcessError:
        return None
    if not day:
        return None
    names = {line[len("author "):] for line in blame.splitlines() if line.startswith("author ")}
    names -= {"Not Committed Yet"}
    d = date.fromisoformat(day)
    return {
        "updated": f"{d:%B} {d.day}, {d.year}",
        "authors": sorted((n for n in names if not n.endswith("[bot]")), key=str.casefold),
    }


def rewrite(text: str, source: str, target: str, mapping: dict[str, str], commit: str) -> str:
    """Rewrite the relative links of a file moved from `source` (repository) to `target` (site)."""
    here = PurePosixPath(source).parent
    out_dir = PurePosixPath(target).parent

    def site_link(dest: str, anchor: str) -> str:
        return os.path.relpath(dest, out_dir or ".") + anchor

    def replace(m: re.Match) -> str:
        link = m.group(2)
        if re.match(r"^[a-z][a-z0-9+.-]*:", link, re.I) or link.startswith("#"):
            return m.group(0)
        path, _, anchor = link.partition("#")
        anchor = f"#{anchor}" if anchor else ""
        resolved = os.path.normpath(here / path).replace(os.sep, "/")
        if resolved in mapping:
            new = site_link(mapping[resolved], anchor)
        elif resolved in FOLDERS:
            page, _, folder_anchor = FOLDERS[resolved].partition("#")
            new = site_link(page, f"#{folder_anchor}" if folder_anchor else "")
        elif resolved.startswith(".."):
            sys.exit(f"{source}: link outside the rulebook repository: {link}")
        else:
            kind = "tree" if path.endswith("/") else "blob"
            new = f"{REPO_URL}/{kind}/{commit}/{resolved}{'/' if kind == 'tree' else ''}{anchor}"
        return f"{m.group(1)}{new}{m.group(3)}"

    return LINK.sub(replace, text)


def separate_lists(text: str) -> str:
    """Insert a blank line between a paragraph line and the first item of a list after it."""
    out: list[str] = []
    fenced = False
    for line in text.splitlines(keepends=True):
        if line.lstrip().startswith("```"):
            fenced = not fenced
        previous = out[-1] if out else ""
        if (
            not fenced
            and ITEM.match(line)
            and not ITEM.match(line).group(1)
            and previous.strip()
            and not ITEM.match(previous)
            and not previous.startswith((" ", "\t", "|", "#"))
        ):
            out.append("\n")
        out.append(line)
    return "".join(out)


def title_of(text: str, source: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    # The terms templates have no heading
    name = PurePosixPath(source).name.removesuffix(".terms.md")
    return f"{name}: terms of use"


def description_of(source: str) -> str:
    name = PurePosixPath(source).name
    if source == "rulebook/README.md":
        return "The rules of the CitCom.ai Data Space: governance, participants, agreements, data categories, usage terms, technical and security rules."
    if name.endswith(".terms.md"):
        return f"The terms of use published with every {name.removesuffix('.terms.md')} offering, with the fields each provider fills in."
    return f"The {name.removesuffix('.md')} policy class: what an offering of this class gives and what it asks."


def quote(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def front_matter(source: str, text: str, commit: str, dirty: bool, src: Path) -> str:
    lines = [
        "---",
        f"title: {quote(title_of(text, source))}",
        f"description: {quote(description_of(source))}",
        f"edit_url: {quote(f'{REPO_URL}/edit/{BRANCH}/{source}')}",
    ]
    lines += [
        "source:",
        f"  file: {quote(source)}",
        f"  url: {quote(f'{REPO_URL}/blob/{commit}/{source}')}",
        f"  commit: {quote(commit[:7] + (' + local changes' if dirty else ''))}",
    ]
    git_facts = facts(src, source)
    if git_facts:
        lines += [
            "git:",
            f"  updated: {quote(git_facts['updated'])}",
            "  authors: [" + ", ".join(quote(a) for a in git_facts["authors"]) + "]",
        ]
    return "\n".join(lines + ["---", ""])


def main() -> None:
    src = fetch()
    commit = git(src, "rev-parse", "HEAD").strip()
    dirty = bool(git(src, "status", "--porcelain", "--", "rulebook", "classes").strip())
    mapping = pages(src)

    # Remove what an earlier run imported (a class may have been removed); index.md stays
    (OUT / "rules.md").unlink(missing_ok=True)
    shutil.rmtree(OUT / "classes", ignore_errors=True)
    for source, target in mapping.items():
        text = (src / source).read_text(encoding="utf-8")
        body = separate_lists(rewrite(text, source, target, mapping, commit))
        if source.endswith(".terms.md"):
            # The templates have no heading: say what the ${fields} are
            body = (
                "*Template: the fields in `${...}` are filled in by each provider when it publishes an "
                "offering with the offer wizard of the marketplace.*\n\n" + body
            )
        dest = OUT / target
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(front_matter(source, text, commit, dirty, src) + body, encoding="utf-8")

    print(f"rulebook: {len(mapping)} pages from {REPO}@{commit[:7]}{' (local changes)' if dirty else ''} → docs/rulebook/")


if __name__ == "__main__":
    main()
