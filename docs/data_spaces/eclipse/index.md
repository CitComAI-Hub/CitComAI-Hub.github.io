# CitCom.ai — Data Space Technical Documentation

This folder is the canonical technical documentation for the **CitCom.ai
data space**, deployed at `https://citcom.dataspaceready.eu`.

It describes the **Eclipse Dataspace Components (EDC)** stack we run, the
deployment topology, and the data flows between participants.

## How to view the diagrams

The docs use two diagram formats. **Pick whichever fits where you're
reading from**:

* **Mermaid blocks** embedded in `architecture.md` and `deployment.md`
  (` ```mermaid `…` ``` ` fenced code). GitLab and GitHub render these
  inline in the browser — **just open the `.md` file in the web UI**
  and the diagrams appear in the right place. No extra tooling.

* **Excalidraw sources** under [`diagrams/`](diagrams/) — same content
  as the inline Mermaid, but as an editable canvas. To open them:

  | You're using… | What to do |
  |---|---|
  | **VS Code** | Install the [`pomdtr.excalidraw-editor`](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor) extension and double-click the `.excalidraw` file. |
  | **Cursor / JetBrains / Vim** | Same extension on VS Code is the easiest path; alternatively download the file and use the web option below. |
  | **A browser** | Go to <https://excalidraw.com>, then *Menu → Open* and pick the `.excalidraw` file from your local clone. Or paste the file content via *Menu → Load from URL* against the GitLab raw link. |
  | **GitLab web UI** | The file shows up as JSON — that's expected. GitLab has no native preview for Excalidraw; use one of the options above to view the canvas. |

  If you only need to look at them (no editing), the Mermaid versions
  in the `.md` files are usually enough.

## Contents

| Doc | Audience | What it covers |
|---|---|---|
| [`architecture.md`](architecture.md) | Tech reviewers, integrators | Component model, Eclipse EDC role, federated catalog, identity, transfer protocol (DSP). |
| [`deployment.md`](deployment.md) | DevOps, ops handover | Server topology, deploy pipeline, provisioning, self-healing, troubleshooting. |
| [`diagrams/`](diagrams/) | All | Excalidraw sources for the inline diagrams. Open with `pomdtr.excalidraw-editor` (VS Code) or `excalidraw.com`. |

## Quick context

**CitCom.ai** is one of four production data spaces built on the same
monorepo (`Sovity-monorepo`); the other three are Geo4Water,
GeoSpaceData, and BeatTheHeat. The platform is intentionally
project-agnostic: each data space is a thin per-project overlay
(`projects/<X>/`) on top of a shared `platform/` core.

The **Eclipse stack** — that is, the open-source Eclipse Dataspace
Components (EDC) — is the bedrock of the connector layer. CitCom uses
the Sovity Community Edition 16.4.2 distribution of Eclipse EDC
(`ghcr.io/sovity/edc-ce:16.4.2`), which adds management UIs and
opinionated defaults but is upstream-compatible. The architecture
document goes into detail on which EDC modules we rely on (DSP catalog,
contract negotiation, transfer process, EDR proxy).

## How to read this

* If you came here to **understand what CitCom is and how the pieces
  fit**, start with `architecture.md`.
* If you came here to **deploy, redeploy, or troubleshoot**, jump to
  `deployment.md`.
* The diagrams are the same ones embedded in the markdown — open them
  in Excalidraw to edit.
