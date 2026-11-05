# Third-party code served by the site

Pinned copies, so that visitors' browsers only talk to this site and a new upstream release never
changes the site by surprise. To upgrade one, download the new version, replace the file, update
its name in `zensical.toml` (and in `docs/javascripts/mermaid.js` for Mermaid) and check the pages
that use it.

| File | Version | Source | Licence |
|---|---|---|---|
| `mermaid-10.6.1.min.js` | 10.6.1 | https://unpkg.com/mermaid@10.6.1/dist/mermaid.min.js | MIT |
| `glightbox-3.3.1.min.js`, `glightbox-3.3.1.min.css` | 3.3.1 | https://unpkg.com/glightbox@3.3.1/dist/ | MIT |

The fonts are in `docs/assets/fonts` (Hanken Grotesk and JetBrains Mono, SIL Open Font License
1.1, from Google Fonts), declared in `docs/stylesheets/fonts.css`.
