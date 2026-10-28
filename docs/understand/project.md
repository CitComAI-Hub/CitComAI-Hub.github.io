---
title: The project and the TEFs
---

# The project and the TEFs

## What a TEF is

A **Testing and Experimentation Facility** (TEF) is a place where companies test AI and robotics products in real conditions before they reach the market. The European Commission funds [TEFs in several sectors](https://digital-strategy.ec.europa.eu/en/activities/testing-and-experimentation-facilities); CitCom.ai is the one for **smart and sustainable cities and communities**.

In practice, a CitCom TEF site is a city, a living lab or a research centre that offers:

- **Real environments**: streets, buildings, energy grids or mobility hubs where a product can run.
- **Data**: city platforms with sensor and open data, increasingly shared through a data space.
- **Expertise**: help to scope the test, check regulatory compliance (GDPR, the AI Act, cybersecurity) and assess the result.

The project brings together [more than 30 organisations](https://citcom.ai/about) in 11 EU countries. The [CitCom TEF website](https://citcomtef.eu/) is the entry point for companies that want to test a product.

## Three super-nodes

The sites are grouped in three **super-nodes**, each with a theme. A super-node is a regional hub that shares expertise and resources between its sites.

| | Nordic | Central | South |
|--:|:--:|:--:|:--:|
| **Theme** | POWER | MOVE | CONNECT |
| **Focus** | Energy, environment, cybersecurity, ethics, edge learning | Mobility and logistics | Securely connecting citizens, infrastructure, AI and robotics across city services |
| **Lead** | Denmark | Belgium | Spain |
| **Countries** | Denmark, Sweden, Finland | Belgium, France, Luxembourg, the Netherlands | Spain, Italy, Poland, Germany |

Every site has its own page in [TEF nodes](../tef/index.md). The [Valencia node](../valencia/index.md), run by the Ajuntament de València and VRAIN-UPV, hosts the FIWARE data space described in this site.

## Why a common architecture

Each city already has its own data platform, often built years ago with its own interfaces. A product tested in one city would need a new integration in the next one. CitCom avoids that by agreeing on a few common points:

- the same **API and data models** to read city data ([interoperability level 1](interoperability.md#level-1-pivotal-interoperability-points));
- the same **way to share data under control**, between organisations that do not have to trust each other in advance ([level 2: data spaces](data_spaces.md)).

A service built on those points runs in any city that follows them. The [MIAIS](../miais/index.md) shows how.

## What this site offers

This site is the technical hub of CitCom, also known as the *minimal package for TEF nodes*:

<div class="grid cards" markdown>

-   :material-server-network:{ .lg .middle } __A working data space__

    ---

    Running infrastructure that sites and companies can join, with real data from Valencia.

    [:octicons-arrow-right-24: The data spaces](../data_spaces/index.md)

-   :material-robot-outline:{ .lg .middle } __A worked example__

    ---

    An AI service that goes from a custom integration to a data space service.

    [:octicons-arrow-right-24: MIAIS](../miais/index.md)

-   :material-book-open-variant:{ .lg .middle } __Guides and tools__

    ---

    One guide per task, and the tools to connect a city platform.

    [:octicons-arrow-right-24: Guides](../guides/index.md)

-   :material-shield-check-outline:{ .lg .middle } __Trust and assessment__

    ---

    The AI Trustworthiness Label to assess the services tested in the TEFs.

    [:octicons-arrow-right-24: AI Trustworthiness Label](../ai_assessment/index.md)

</div>
