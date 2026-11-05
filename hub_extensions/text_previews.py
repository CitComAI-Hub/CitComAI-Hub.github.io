"""Markdown extension: instant previews only on links in the text.

``zensical.extensions.preview`` marks every internal link of a page with ``data-preview``, the
attribute that makes the theme show a preview of the linked page on hover. Links that are
navigation already say where they go, and a preview on top of them repeats it. This extension
runs after it and removes the attribute from links:

- inside cards (``.grid``) and the site's own components (any class starting with ``cc-``:
  roles, toolbox cards, the data space map...);
- that are buttons (``.md-button``).

Links in paragraphs, lists and tables keep their preview.
"""

from __future__ import annotations

from xml.etree.ElementTree import Element

from markdown import Extension, Markdown
from markdown.treeprocessors import Treeprocessor

PREVIEW = "data-preview"


def _is_navigation(el: Element) -> bool:
    classes = el.get("class", "").split()
    return "grid" in classes or any(c.startswith("cc-") for c in classes)


class TextPreviewsProcessor(Treeprocessor):
    def run(self, root: Element) -> None:
        self._strip(root, inside_navigation=False)

    def _strip(self, el: Element, inside_navigation: bool) -> None:
        inside_navigation = inside_navigation or _is_navigation(el)
        if el.tag == "a" and PREVIEW in el.attrib:
            if inside_navigation or "md-button" in el.get("class", "").split():
                del el.attrib[PREVIEW]
        for child in el:
            self._strip(child, inside_navigation)


class TextPreviewsExtension(Extension):
    def extendMarkdown(self, md: Markdown) -> None:
        # zensical.extensions.preview registers at priority 0: run after it
        md.treeprocessors.register(TextPreviewsProcessor(md), "text_previews", -1)


def makeExtension(**kwargs) -> TextPreviewsExtension:
    return TextPreviewsExtension(**kwargs)
