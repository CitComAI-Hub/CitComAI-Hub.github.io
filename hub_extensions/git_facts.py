"""Markdown extension: the date of the last change and the authors of each page, from git.

Zensical does not run the git-revision-date-localized and git-authors plugins of MkDocs yet. This
extension fills the same facts into the page metadata, where the theme reads them
(``docs/overrides/partials/source-file.html``)::

    page.meta.git.updated   "November 5, 2026"   (date of the last commit that changed the page)
    page.meta.git.authors   ["Andrea Maioli", "Joan Ciprià"]  (who wrote the current lines, A to Z)

As in git-authors, the authors come from ``git blame``, so they survive moves and rewrites. Names
follow ``.mailmap``. Bots are left out. Pages without commits get no facts.

The dates are read once per build with a single ``git log``. CI needs the full history
(``actions/checkout`` with ``fetch-depth: 0``).

Remove this extension when Zensical supports the git plugins.
"""

from __future__ import annotations

import subprocess
from datetime import date
from functools import cache
from pathlib import Path

from markdown import Extension, Markdown
from markdown.preprocessors import Preprocessor
from zensical.extensions.context import ContextPreprocessor

# Commit separator in the output of git log: a byte that never appears in names or paths
_SEP = "\x1e"


def _git(cwd: Path, *args: str) -> str:
    return subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, check=True).stdout


@cache
def _last_changes(docs_dir: str) -> dict[str, date]:
    """Date of the last commit of every file under docs_dir, keyed by path relative to docs_dir."""
    root = Path(docs_dir)
    try:
        out = _git(root, "log", f"--format={_SEP}%as", "--name-only", "--no-renames", "--", ".")
        prefix = _git(root, "rev-parse", "--show-prefix").strip()
    except (OSError, subprocess.CalledProcessError):
        return {}
    changes: dict[str, date] = {}
    for commit in out.split(_SEP)[1:]:
        day, _, files = commit.partition("\n")
        for name in filter(None, files.splitlines()):
            # git log goes from the newest commit to the oldest: keep the first date of each file
            changes.setdefault(name.removeprefix(prefix), date.fromisoformat(day))
    return changes


def _authors(docs_dir: str, path: str) -> list[str]:
    """Authors of the current lines of a page, A to Z."""
    try:
        out = _git(Path(docs_dir), "blame", "--line-porcelain", "--", path)
    except (OSError, subprocess.CalledProcessError):
        return []
    names = {line[len("author "):] for line in out.splitlines() if line.startswith("author ")}
    names -= {"Not Committed Yet"}
    return sorted((n for n in names if not n.endswith("[bot]")), key=str.casefold)


def _format(day: date) -> str:
    return f"{day:%B} {day.day}, {day.year}"


class GitFactsPreprocessor(Preprocessor):
    def __init__(self, md: Markdown, docs_dir: str):
        super().__init__(md)
        self.docs_dir = docs_dir

    def run(self, lines: list[str]) -> list[str]:
        context = ContextPreprocessor.from_markdown(self.md)
        if context is None:
            return lines
        path = context.page.path
        updated = _last_changes(self.docs_dir).get(path)
        if updated:
            context.page.meta["git"] = {
                "updated": _format(updated),
                "authors": _authors(self.docs_dir, path),
            }
        return lines


class GitFactsExtension(Extension):
    def __init__(self, **kwargs):
        self.config = {"docs_dir": ["docs", "Folder of the pages, relative to the project root"]}
        super().__init__(**kwargs)

    def extendMarkdown(self, md: Markdown) -> None:
        md.preprocessors.register(GitFactsPreprocessor(md, self.getConfig("docs_dir")), "git_facts", 1)


def makeExtension(**kwargs) -> GitFactsExtension:
    return GitFactsExtension(**kwargs)
