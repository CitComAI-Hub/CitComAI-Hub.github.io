---
title: Interoperability
description: "The MIMs and the three interoperability levels, from custom integration to data space."
---

# Interoperability

Interoperability is what lets a service built for one city run in another city without a new integration. CitCom measures it with a simple ladder of three levels, built on the Minimal Interoperability Mechanisms.

## MIMs

The [Minimal Interoperability Mechanisms (MIMs)](https://mims.oascities.org/) are a small set of agreements, published by [Open & Agile Smart Cities (OASC)](https://oascities.org/), that cities adopt so their systems can talk to each other. They are *minimal* on purpose: a city does not replace its platform, it adds a common interface on top.

The current version, MIMs Plus v9 (June 2026), has four foundational MIMs. Their numbers do not follow the order of the journey of the data, which is: make it accessible (MIM0), represent it with standard models (MIM2), exchange it under clear terms and trust (MIM3) and interlink it (MIM1). CitCom builds on MIM0 and MIM2 for [level 1](#level-1), and its data space covers MIM3 at [level 2](#level-2). MIM1 is not part of the minimal package:

| MIM | What it fixes | In CitCom |
|---|---|---|
| **MIM0 Accessing Data** | All data is available through an API, ideally based on open standards | The [NGSI-LD API](https://www.etsi.org/deliver/etsi_ts/104100_104199/104175/01.01.01_60/ts_104175v010101p.pdf), served by a context broker (Orion-LD, Scorpio) |
| **MIM1 Interlinking Data** | Data from different sources is linked, so it can be combined | Not part of the minimal package |
| **MIM2 Representing Data** | The data is described with shared, standard models | [Smart Data Models](https://smartdatamodels.org/) as NGSI-LD entities, such as `WasteContainer` or `AirQualityObserved` |
| **MIM3 Exchanging Data** | Data is exchanged under clear terms and trust | The [data space](../data_spaces/index.md): connectors, contracts and policies, at [level 2](#level-2) |

NGSI-LD and Smart Data Models work as one package: the main mechanism of MIM2 is *Smart Data Models with NGSI-LD*, in which the models are NGSI-LD entities with a JSON Schema and a JSON-LD `@context`. Older versions of the MIMs had them as two separate MIMs (an older MIM1, Context information management, and MIM2, Data models), a numbering that many documents still use and that does not match the MIM1 above.

## Citcom.ai Interoperability levels

<div class="cc-levels" markdown="0">
  <div class="cc-levels__flow">
    <div class="cc-levels__node" id="level-0" style="--lvl: 0" tabindex="0">
      <p class="cc-tef__eyebrow">Level 0</p>
      <p class="cc-tef__theme">Custom integration</p>
      <p class="cc-tef__meta">One adapter per city</p>
      <ul>
        <li>Its own API</li>
        <li>Its own field names</li>
        <li>Its own authentication</li>
      </ul>
      <div class="cc-levels__text">
        <p>There is no common standard. Each platform is connected with an integration written for it: its own API, its own field names, its own authentication.</p>
        <p>It works, but every new city means a new integration, and the data cannot be reused easily by others.</p>
      </div>
    </div>
    <div class="cc-levels__step" aria-hidden="true"><span class="cc-levels__arrow"></span><small>Adopt NGSI-LD and Smart Data Models</small></div>
    <div class="cc-levels__node" id="level-1" style="--lvl: 1" tabindex="0">
      <p class="cc-tef__eyebrow">Level 1</p>
      <p class="cc-tef__theme">Pivotal points</p>
      <p class="cc-tef__meta">Same API and models everywhere</p>
      <ul>
        <li>NGSI-LD API <span>MIM0</span></li>
        <li>Smart Data Models <span>MIM2</span></li>
        <li>Open, or an ad hoc key</li>
      </ul>
      <div class="cc-levels__text">
        <p>The platform exposes its data through <strong>NGSI-LD</strong> and describes it with <strong>Smart Data Models</strong>, the package of MIM2. The platform can keep its own internals: what matters is that the interface is the same. A service written for level 1 reads waste containers in Valencia and in any other level-1 city with the same code.</p>
        <p>What is still missing is <em>control</em>: a level-1 broker is usually either open to everyone or protected with an ad hoc key.</p>
      </div>
    </div>
    <div class="cc-levels__step" aria-hidden="true"><span class="cc-levels__arrow"></span><small>Add a connector</small></div>
    <div class="cc-levels__node" id="level-2" style="--lvl: 2" tabindex="0">
      <p class="cc-tef__eyebrow">Level 2</p>
      <p class="cc-tef__theme">Data space</p>
      <p class="cc-tef__meta">Same API, plus trust and access control</p>
      <ul>
        <li>Trust framework</li>
        <li>Verifiable credentials</li>
        <li>Access policies <span>ODRL</span></li>
      </ul>
      <div class="cc-levels__text">
        <p>The NGSI-LD interface is placed behind a <strong>data space connector</strong>. Level 1 stays as it is, and the connector adds what is needed to share data between organisations that do not know each other in advance:</p>
        <ul>
          <li>a <strong>trust framework</strong>: who belongs to the data space, managed by a trust anchor;</li>
          <li><strong>identity</strong>: each organisation, person and machine proves who it is with verifiable credentials;</li>
          <li><strong>authorisation</strong>: access rules (ODRL policies) that the provider defines and the connector enforces, usually created when a consumer buys an offer in the marketplace.</li>
        </ul>
        <p><a href="../data_spaces/">Data spaces in 5 minutes</a> explains these pieces.</p>
      </div>
    </div>
  </div>
</div>

### The levels in practice

The [MIAIS](../miais/index.md), the worked example of this site, has one version per level. Its code shows what really changes from one level to the next:

| Level | How the MIAIS gets the waste containers |
|---|---|
| 0 | From a custom API of the city platform |
| 1 | From an NGSI-LD broker, as `WasteContainer` entities |
| 2 | From the same NGSI-LD API, through the Valencia connector, after buying the offer in the marketplace and presenting a credential |

For a city that already runs an NGSI-v2 platform, [Lepus](../toolbox/lepus.md) is a shortcut to level 1: it serves the NGSI-v2 data as NGSI-LD without migrating the platform. Valencia uses it this way.

!!! tip "Learn more"

    - OASC: [MIMs Plus](https://mims.oascities.org/) (v9, June 2026) and the [MIMs toolkit](../toolbox/mims_toolkit.md).
    - IDSA: [Interoperability in data spaces](https://docs.internationaldataspaces.org/ids-knowledgebase/idsa-rulebook/idsa-rulebook/3.-functional_requirements/3.11-interoperability_in_data_spaces), with its four layers: technical, semantic, organisational and legal.
