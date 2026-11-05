"""Markdown extension: glossary terms only in running text.

The ``abbr`` extension marks every term of ``includes/glossary.md`` wherever it appears. Inside
a link the term would carry a tooltip on top of the link's own preview, and inside a button or
another flex box (the home's reading lists, the Next step box) the ``<abbr>`` becomes a flex item
and the gap of the box opens a space in the text ("MIAIS : a worked example"). In a heading, the
dotted underline only adds noise. This extension runs after ``abbr`` and turns the terms inside
links and headings back into plain text.
"""

from __future__ import annotations

from xml.etree.ElementTree import Element

from markdown import Extension, Markdown
from markdown.treeprocessors import Treeprocessor

PLAIN_INSIDE = {"a", "h1", "h2", "h3", "h4", "h5", "h6"}


def _unwrap(parent: Element, index: int) -> None:
    """Replace parent[index] by its text, keeping the text that follows it."""
    child = parent[index]
    text = (child.text or "") + (child.tail or "")
    if index == 0:
        parent.text = (parent.text or "") + text
    else:
        previous = parent[index - 1]
        previous.tail = (previous.tail or "") + text
    parent.remove(child)


class GlossaryScopeProcessor(Treeprocessor):
    def run(self, root: Element) -> None:
        self._walk(root, plain=False)

    def _walk(self, el: Element, plain: bool) -> None:
        plain = plain or el.tag in PLAIN_INSIDE
        # Backwards, so that removing a child does not shift the ones still to visit
        for index in reversed(range(len(el))):
            child = el[index]
            if plain and child.tag == "abbr":
                _unwrap(el, index)
            else:
                self._walk(child, plain)


class GlossaryScopeExtension(Extension):
    def extendMarkdown(self, md: Markdown) -> None:
        # abbr registers its treeprocessor at priority 7: run after it
        md.treeprocessors.register(GlossaryScopeProcessor(md), "glossary_scope", 6)


def makeExtension(**kwargs) -> GlossaryScopeExtension:
    return GlossaryScopeExtension(**kwargs)
