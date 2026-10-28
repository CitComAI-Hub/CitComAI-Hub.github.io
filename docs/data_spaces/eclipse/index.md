---
title: Eclipse EDC data space
description: "The alternative stack, built on Eclipse EDC: what runs and how it compares."
---

# Eclipse EDC data space

CitCom runs a second data space, an alternative to the [FIWARE one](../fiware.md), built on the **Eclipse Dataspace Components** (EDC). It is operated at [citcom.dataspaceready.eu](https://citcom.dataspaceready.eu) and lets organisations publish data assets, discover the assets of other participants, negotiate machine-readable usage policies and exchange the data under those agreements.

## The stack

- **Connectors**: [Eclipse EDC](https://eclipse-edc.github.io/), through the [sovity Community Edition](https://github.com/sovity/edc-ce) 16.4.2 distribution, which adds management interfaces and defaults but stays compatible with upstream EDC.
- **Management portal**: DS-Manager, by Hopu, the human-facing side: identity, asset metadata, policy drafting, catalogue browsing and audit. It talks to the connectors through the EDC Management API.
- **Protocol**: the [Dataspace Protocol](https://docs.internationaldataspaces.org/ids-knowledgebase/dataspace-protocol) (DSP) for catalogues, contract negotiation and transfers between connectors.

CitCom is one of four data spaces built on the same platform; each one is a thin per-project layer over a shared core.

## How it compares

| | FIWARE data space | Eclipse EDC data space |
|---|---|---|
| Identity | Verifiable credentials and wallets | Accounts and connector identities managed by the portal |
| Contracts | Marketplace orders, applied by each provider's connector | DSP negotiation between connectors |
| Data | NGSI-LD APIs, queried live | Assets: any HTTP source, transferred by the connectors |

Both data spaces share the Valencia data: see [Bridging both](../bridge.md).

## In this section

| Page | For | What it covers |
|---|---|---|
| [Architecture](architecture.md) | Technical reviewers and integrators | Component model, the role of EDC, federated catalogue, identity model, transfer flow |
| [Deployment](deployment.md) | Operators | Server topology, deployment, provisioning of tenants, self-healing and troubleshooting |

The diagrams of these pages are also available as editable [Excalidraw sources](https://github.com/CitComAI-Hub/CitComAI-Hub.github.io/tree/main/docs/data_spaces/eclipse/diagrams); open them at [excalidraw.com](https://excalidraw.com).
