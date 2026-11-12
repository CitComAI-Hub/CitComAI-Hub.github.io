---
title: Toolbox
description: "The open-source tools used in the CitCom.ai Data Space."
summary: "Open-source tools to connect a city platform and build services."
---

# Toolbox

<p class="cc-lead">Open-source tools to bring city data to the data space and use it from your code. Several are made in CitCom.</p>

<div class="cc-tools" markdown="0">
  <article class="cc-tool">
    <h3>Lepus</h3>
    <p class="cc-tool__meta">For city platforms<br>A CitCom fork</p>
    <p>Serve an NGSI-v2 platform as NGSI-LD with Smart Data Models, live and without migrating it.</p>
    <p class="cc-tool__links"><a class="cc-tool__go" href="lepus/">Read the guide</a><a class="cc-tool__ext" href="https://github.com/CitComAI-Hub/lepus" target="_blank" rel="noopener">GitHub</a></p>
  </article>
  <article class="cc-tool">
    <h3>ds-consumer-auth</h3>
    <p class="cc-tool__meta">For developers<br>Made in CitCom</p>
    <p>Get the access token of the data space from Python. One line, and it is renewed for you.</p>
    <p class="cc-tool__links"><a class="cc-tool__go" href="ds_consumer_auth/">Read the guide</a><a class="cc-tool__ext" href="https://github.com/CitComAI-Hub/ds-consumer-auth" target="_blank" rel="noopener">GitHub</a></p>
  </article>
  <article class="cc-tool">
    <h3>Wallets</h3>
    <p class="cc-tool__meta">For everyone<br>Made in CitCom</p>
    <p>Keep your credentials and log in with a QR code: atesta-id-wallet on the desktop, Lissi ID Wallet on the phone.</p>
    <p class="cc-tool__links"><a class="cc-tool__go" href="wallets/">Read the guide</a><a class="cc-tool__ext" href="https://github.com/CitComAI-Hub/atesta-id-wallet" target="_blank" rel="noopener">GitHub</a></p>
  </article>
  <article class="cc-tool">
    <h3>NGSI-LD and FiLiP</h3>
    <p class="cc-tool__meta">For developers</p>
    <p>The NGSI-LD calls you need most, and FiLiP to make them from Python against any broker.</p>
    <p class="cc-tool__links"><a class="cc-tool__go" href="ngsi_ld/">Read the guide</a><a class="cc-tool__ext" href="https://github.com/RWTH-EBC/FiLiP" target="_blank" rel="noopener">GitHub</a></p>
  </article>
  <article class="cc-tool">
    <h3>Smart Data Models</h3>
    <p class="cc-tool__meta">For data providers</p>
    <p>The shared vocabulary of city data: entity types, attributes and units that every city reads the same way.</p>
    <p class="cc-tool__links"><a class="cc-tool__go" href="smart_data_models/">Read the guide</a><a class="cc-tool__ext" href="https://smartdatamodels.org/" target="_blank" rel="noopener">Website</a></p>
  </article>
</div>

Built something that helps CitCom partners? [Propose your tool with a pull request](../faq/pull_request_procedure.md).

## More tools

<ul class="cc-rows cc-rows--two" markdown="0">
  <li><a href="ai_toolkit/"><strong>AI Toolkit</strong><span>Frameworks and projects to build and manage AI services</span></a></li>
  <li><a href="ai_logging_monitor/"><strong>AI Logging Monitor</strong><span>Log and monitor the behaviour of an AI system</span></a></li>
  <li><a href="mims_toolkit/"><strong>MIMs Toolkit</strong><span>Tools to comply with the OASC Minimal Interoperability Mechanisms</span></a></li>
  <li><a href="ldt_toolkit/"><strong>LDT Toolkit</strong><span>A deployable demonstrator of interoperable local digital twins</span></a></li>
  <li><a href="iot_agent/"><strong>FIWARE IoT Agent</strong><span>An experiment: NGSI-v2 to NGSI-LD through subscriptions</span></a></li>
  <li><a href="other_toolkit/"><strong>Other tools</strong><span>Grafana plugin, NGSI-LD clients and more</span></a></li>
</ul>

## Where each tool fits

Which tools you need depends on where your data is today. Whatever the starting point, the path is the same: reach [interoperability level 1](../getting_started/interoperability.md#level-1) (NGSI-LD and Smart Data Models), put a connector in front for level 2, and let programs and people use the data.

```mermaid
flowchart LR
    subgraph TODAY["Your data today"]
        direction TB
        V2[("NGSI-v2 platform")]
        OT[("Other source<br/>custom API, IoT, files")]
        LDN[("NGSI-LD broker")]
    end
    subgraph L1["Level 1"]
        LD["NGSI-LD<br/>+ Smart Data Models"]
    end
    subgraph L2["Level 2"]
        CON["Data space<br/>connector"]
    end
    subgraph USE["Who uses it"]
        direction TB
        PRG["Programs<br/>FiLiP + ds-consumer-auth"]
        PPL["People<br/>atesta-id-wallet / Lissi"]
    end
    V2 -- "Lepus" --> LD
    OT -- "IoT Agent or<br/>an ingestion job" --> LD
    LDN -- "as it is" --> LD
    LD --> CON
    CON --> PRG
    CON --> PPL
```

For example, a city with an NGSI-v2 platform puts Lepus in front of it and publishes it through its connector; the [Valencia example](../valencia/index.md) shows it step by step.
