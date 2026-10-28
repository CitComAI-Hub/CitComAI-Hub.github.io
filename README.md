# CitCom.ai Hub

[![ci](https://github.com/CitComAI-Hub/CitComAI-Hub.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/CitComAI-Hub/CitComAI-Hub.github.io/actions/workflows/ci.yml)

Source of [citcomai-hub.github.io](https://citcomai-hub.github.io), the technical hub of the CitCom.ai Testing and Experimentation Facility: the data spaces, the tools to connect a city platform, and the guides to build AI services that run in any CitCom city. It gathers the *minimal package* that CitCom's work package 3 (WP3) prepares for the TEF nodes.

The site is built with [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), in English.

## Structure

The navigation is defined in [`mkdocs.yml`](./mkdocs.yml) (`nav`). Each section of the site is a folder of [`docs/`](./docs):

| Section | Folders |
|---|---|
| Home | `index.md` |
| Get started | `getting_started/` |
| Data spaces | `data_spaces/` (FIWARE, Eclipse EDC, bridge), `marketplace/`, `valencia/` |
| Build | `guides/` (its `index.md` is the Build page), `miais/` |
| Toolbox | `toolbox/` |
| Partners & resources | `resources/`, `tef/`, `ai_assessment/`, `local_digital_twins/`, `faq/` |

The header shows the first four sections; *Partners & resources* is linked from the home page and the footer (`extra.hidden_sections` in `mkdocs.yml`).

## Run it locally

You need Python 3.10 or later and `make`.

```bash
make serve        # creates venv/, installs the dependencies and serves http://127.0.0.1:8000
```

Without `make`:

```bash
python3 -m venv venv
venv/bin/pip install -r requirements.txt
venv/bin/mkdocs serve
```

Other commands (`make help` lists them):

| Command | Does |
|---|---|
| `make build` | Builds the site into `public/` in strict mode: any broken link or warning fails. Run it before opening a pull request. |
| `make serve-lan` | Serves the site to your local network or tailnet, to show it to someone without publishing it. Stop it with Ctrl+C. |
| `make clean` | Removes `public/` and `venv/`. |

After pulling changes that touch `requirements.txt`, run `make install` (or `pip install -r requirements.txt`) again.

## Writing a page

- **Front matter**: every page has a `title` and a one-line `description`. The description is used by search engines and by the *Next step* card of the previous page.
- **Next step**: the pages of the main sections end with a *Next step* card that points to the next page of the navigation. To point somewhere else, set it in the front matter:

  ```yaml
  next_step:
    url: miais/
    title: "MIAIS: a worked example"
    description: "An AI service that climbs the interoperability levels."
  ```

  `hide_next_step: true` removes it.
- **Navigation**: add the page to `nav` in `mkdocs.yml`. Keep the sidebar of the main sections to two levels.
- **Moving or removing a page**: add its old path to `redirects` in `mkdocs.yml`, so external links keep working.
- **Images**: in an `img/` folder next to the page.
- **Diagrams**: [Mermaid](https://mermaid.js.org/) code blocks (` ```mermaid `); they follow the light and dark themes.
- **Links**: links to other sites open in a new tab automatically ([`docs/javascripts/external-links.js`](./docs/javascripts/external-links.js)); write them as normal Markdown links.
- **Cross-references**: link the text itself (`see [Lepus](../toolbox/lepus.md)`), not "→ Lepus".
- **What not to publish**: no internal IP addresses, host names, credentials or server paths of the infrastructure; describe the architecture and the public URLs.

## Theme

The CitCom look follows the [CitCom marketplace](https://marketplace.citcom-vrain-dataspace.eu): Barlow and Barlow Condensed, white header, dark hero and footer, teal accent.

| File | Contains |
|---|---|
| [`docs/stylesheets/citcom.css`](./docs/stylesheets/citcom.css) | Colours (light and dark), typography and the components: header, buttons, cards, numbered rows, next step card |
| [`docs/overrides/home.html`](./docs/overrides/home.html) | The hero of the home page |
| [`docs/overrides/partials/header.html`](./docs/overrides/partials/header.html) | The header: logo, section links, search and Marketplace button |
| [`docs/overrides/partials/content.html`](./docs/overrides/partials/content.html) | The page body, with the *Next step* card |
| [`docs/overrides/partials/copyright.html`](./docs/overrides/partials/copyright.html) | The footer |

`header.html` and `content.html` are based on the templates of Material for MkDocs 9.5. When upgrading Material, compare them with the new versions of `partials/header.html` and `partials/content.html`.

## Contribute and publish

- **Partners**: fork the repository and open a pull request, as explained in [Request changes](https://citcomai-hub.github.io/faq/pull_request_procedure/).
- **Maintainers**: create a branch from `develop` and open the pull request to `develop`.

`develop` is merged into `main` to publish: on every push to `main`, the [`ci`](./.github/workflows/ci.yml) workflow builds the site and deploys it to GitHub Pages (`mkdocs gh-deploy`).
