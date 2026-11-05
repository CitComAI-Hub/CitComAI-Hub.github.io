# CitCom.ai Hub

[![publish](https://github.com/CitComAI-Hub/CitComAI-Hub.github.io/actions/workflows/publish.yml/badge.svg)](https://github.com/CitComAI-Hub/CitComAI-Hub.github.io/actions/workflows/publish.yml)

Source of [citcomai-hub.github.io](https://citcomai-hub.github.io), the technical hub of the CitCom.ai Testing and Experimentation Facility: the data spaces, the tools to connect a city platform, and the guides to build AI services that run in any CitCom city. It gathers the *minimal package* that CitCom's work package 3 (WP3) prepares for the TEF nodes.

The site is written in Markdown, in English, and built with [Zensical](https://zensical.org/).

## Structure

The navigation is defined in [`zensical.toml`](./zensical.toml) (`nav`). Each section of the site is a folder of [`docs/`](./docs):

| Section | Folders |
|---|---|
| Home | `index.md` |
| Get started | `getting_started/` |
| Data space | `data_spaces/` (the CitCom.ai Data Space and the Eclipse EDC one), `marketplace/` |
| Guides | `guides/`, and the worked examples `miais/` and `valencia/` |
| Toolbox | `toolbox/` |
| TEF network | `tef/` (one page per site), `ai_assessment/`, `local_digital_twins/` |
| Help | `faq/` |

The header links to every section except those in `extra.hidden_sections` (*Help*, linked from the footer).

## Run it locally

You need Python 3.10 or later, `git` and `make`.

```bash
make serve        # creates .venv/, installs the dependencies and serves http://localhost:8000
```

Without `make`:

```bash
python3 -m venv .venv
.venv/bin/pip install -e .
.venv/bin/zensical serve
```

Other commands (`make help` lists them):

| Command | Does |
|---|---|
| `make build` | Builds the site into `public/` in strict mode, as CI does: any broken link or warning fails. Run it before opening a pull request. |
| `make serve-lan` | Serves the site to your local network or tailnet, to show it to someone without publishing it. Stop it with Ctrl+C. |
| `make clean` | Removes `public/`, the build cache and `.venv/`. |

The dependencies are in [`pyproject.toml`](./pyproject.toml); after pulling a change to it, run `make install` again. The repository also opens in a [dev container](./.devcontainer/devcontainer.json) (VS Code or GitHub Codespaces), ready for `make serve`.

## Writing a page

- **Front matter**: every page has a `title` and a one-line `description`. The description is used by search engines and by the *Next step* box of the previous page.
- **Next step**: the pages of the sections in the header end with a *Next step* box that points to the next page of the navigation. To point somewhere else, set it in the front matter:

  ```yaml
  next_step:
    url: miais/
    title: "MIAIS: a worked example"
    description: "An AI service that climbs the interoperability levels."
  ```

  `hide_next_step: true` removes it.
- **Navigation**: add the page to `nav` in `zensical.toml`. Keep the sidebar of the main sections to two levels.
- **Moving or removing a page**: add its old path to `plugins.redirects.redirect_maps` in `zensical.toml`, so external links keep working.
- **Images**: in an `img/` folder next to the page, never linked from another site.
- **Diagrams**: [Mermaid](https://mermaid.js.org/) code blocks (` ```mermaid `); they follow the light and dark themes.
- **Links**: links to other sites open in a new tab automatically ([`docs/javascripts/external-links.js`](./docs/javascripts/external-links.js)); write them as normal Markdown links.
- **Cross-references**: link the text itself (`see [Lepus](../toolbox/lepus.md)`), not "→ Lepus". Hovering a link in the text to another page of the site shows a short preview of it: its title and first lines. Cards, buttons and the home's links have none ([`hub_extensions/text_previews.py`](./hub_extensions/text_previews.py)).
- **Date and authors**: every page ends with the date of its last change and the people who wrote it, taken from git. Nothing to write by hand.
- **What not to publish**: no internal IP addresses, host names, credentials or server paths of the infrastructure; describe the architecture and the public URLs.

What Markdown can do here (admonitions, content tabs, icons…) is in Zensical's [authoring guide](https://zensical.org/docs/authoring/markdown/).

## Theme

The look follows the CitCom.ai brand of [citcomtef.eu](https://citcomtef.eu/): Hanken Grotesk, square shapes, no shadows and ultramarine as the only accent, on the *classic* variant of Zensical's theme.

| File | Contains |
|---|---|
| [`docs/stylesheets/citcom.css`](./docs/stylesheets/citcom.css) | Colours (light and dark), typography and every component: header, buttons, cards, footer, next step box, maps |
| [`docs/stylesheets/fonts.css`](./docs/stylesheets/fonts.css) | The fonts, served by the site ([`docs/assets/fonts`](./docs/assets/fonts)) |
| [`docs/stylesheets/catalog.css`](./docs/stylesheets/catalog.css), [`docs/javascripts/catalog.js`](./docs/javascripts/catalog.js) | The cards, search and filters of the AI Assessment Catalogue |
| [`docs/overrides/home.html`](./docs/overrides/home.html) | The top of the home page |
| [`docs/overrides/partials/header.html`](./docs/overrides/partials/header.html) | The header: logo, section links, search and Marketplace button |
| [`docs/overrides/partials/content.html`](./docs/overrides/partials/content.html) | The page body, with the *Next step* box |
| [`docs/overrides/partials/source-file.html`](./docs/overrides/partials/source-file.html) | The date and authors under each page |
| [`docs/overrides/partials/copyright.html`](./docs/overrides/partials/copyright.html) | The footer |

`header.html`, `content.html` and `source-file.html` replace the theme's templates of the same name. When upgrading Zensical, compare them with the new versions (in the `zensical_ui` package, `templates/partials/`).

**Nothing is loaded from other sites**: fonts, Mermaid and GLightbox are copies in the repository ([`docs/assets/vendor`](./docs/assets/vendor), with their versions), so visitors' browsers only talk to this site. [`docs/javascripts/mermaid.js`](./docs/javascripts/mermaid.js) loads Mermaid only on pages with a diagram.

**Date and authors** come from [`hub_extensions/git_facts.py`](./hub_extensions/git_facts.py), a Markdown extension of this repository, because Zensical does not run MkDocs' git plugins yet. [`.mailmap`](./.mailmap) gives one name to people who committed under two.

## Contribute and publish

- **Partners**: fork the repository and open a pull request, as explained in [Request changes](https://citcomai-hub.github.io/faq/pull_request_procedure/).
- **Maintainers**: create a branch from `develop` and open the pull request to `develop`.

Every pull request is built in strict mode ([`check`](./.github/workflows/check.yml)). `develop` is merged into `main` to publish: on every push to `main`, the [`publish`](./.github/workflows/publish.yml) workflow builds the site and deploys it to GitHub Pages.
