---
title: Toolbox
description: "The open-source tools used in the CitCom data space."
hide:
  - toc
---

# Toolbox

<p class="cc-lead">Open-source tools to bring city data to the data space and use it from your code. Several are made in CitCom.</p>

<div class="cc-tools" markdown="0">
  <article class="cc-tool">
    <span class="cc-tool__mono" style="--tone: var(--cc-teal)">Le</span>
    <p class="cc-tool__tags"><span>City platforms</span><span class="cc-tool__made">CitCom fork</span></p>
    <h3><a href="lepus/">Lepus</a></h3>
    <p>Serve an NGSI-v2 platform as NGSI-LD with Smart Data Models, live and without migrating it.</p>
    <p class="cc-tool__links"><a href="lepus/">Docs &rarr;</a><a href="https://github.com/CitComAI-Hub/lepus" target="_blank" rel="noopener">GitHub &#8599;</a></p>
  </article>
  <article class="cc-tool">
    <span class="cc-tool__mono" style="--tone: var(--cc-green)">ds</span>
    <p class="cc-tool__tags"><span>Developers</span><span class="cc-tool__made">Made in CitCom</span></p>
    <h3><a href="ds_consumer_auth/">ds-consumer-auth</a></h3>
    <p>Get the access token of the data space from Python. One line, and it is renewed for you.</p>
    <p class="cc-tool__links"><a href="ds_consumer_auth/">Docs &rarr;</a><a href="https://github.com/CitComAI-Hub/ds-consumer-auth" target="_blank" rel="noopener">GitHub &#8599;</a></p>
  </article>
  <article class="cc-tool">
    <span class="cc-tool__mono" style="--tone: #7c6cf0">at</span>
    <p class="cc-tool__tags"><span>Everyone</span><span class="cc-tool__made">Made in CitCom</span></p>
    <h3><a href="wallets/">Wallets</a></h3>
    <p>Keep your credentials and log in with a QR code: atesta-id-wallet on the desktop, Lissi ID Wallet on the phone.</p>
    <p class="cc-tool__links"><a href="wallets/">Docs &rarr;</a><a href="https://github.com/CitComAI-Hub/atesta-id-wallet" target="_blank" rel="noopener">GitHub &#8599;</a></p>
  </article>
  <article class="cc-tool">
    <span class="cc-tool__mono" style="--tone: #f0a03c">Fi</span>
    <p class="cc-tool__tags"><span>Developers</span></p>
    <h3><a href="ngsi_ld/">NGSI-LD and FiLiP</a></h3>
    <p>The NGSI-LD calls you need most, and FiLiP to make them from Python against any broker.</p>
    <p class="cc-tool__links"><a href="ngsi_ld/">Docs &rarr;</a><a href="https://github.com/RWTH-EBC/FiLiP" target="_blank" rel="noopener">GitHub &#8599;</a></p>
  </article>
  <article class="cc-tool">
    <span class="cc-tool__mono" style="--tone: #e8607a">SDM</span>
    <p class="cc-tool__tags"><span>Data providers</span></p>
    <h3><a href="smart_data_models/">Smart Data Models</a></h3>
    <p>The shared vocabulary of city data: entity types, attributes and units that every city reads the same way.</p>
    <p class="cc-tool__links"><a href="smart_data_models/">Docs &rarr;</a><a href="https://smartdatamodels.org/" target="_blank" rel="noopener">Website &#8599;</a></p>
  </article>
  <article class="cc-tool cc-tool--add">
    <span class="cc-tool__mono" style="--tone: var(--md-default-fg-color--lighter)">+</span>
    <h3><a href="../faq/pull_request_procedure/">Add your tool</a></h3>
    <p>Built something that helps CitCom partners? Propose it with a pull request.</p>
    <p class="cc-tool__links"><a href="../faq/pull_request_procedure/">How to contribute &rarr;</a></p>
  </article>
</div>

## More tools

<div class="cc-minitools" markdown="0">
  <a href="ai_toolkit/"><strong>AI Toolkit</strong><span>Frameworks and projects to build and manage AI services</span></a>
  <a href="ai_logging_monitor/"><strong>AI Logging Monitor</strong><span>Log and monitor the behaviour of an AI system</span></a>
  <a href="mims_toolkit/"><strong>MIMs Toolkit</strong><span>Tools to comply with the OASC Minimal Interoperability Mechanisms</span></a>
  <a href="ldt_toolkit/"><strong>LDT Toolkit</strong><span>A deployable demonstrator of interoperable local digital twins</span></a>
  <a href="iot_agent/"><strong>FIWARE IoT Agent</strong><span>An experiment: NGSI-v2 to NGSI-LD through subscriptions</span></a>
  <a href="other_toolkit/"><strong>Other tools</strong><span>Grafana plugin, NGSI-LD clients and more</span></a>
</div>

## Where each tool fits

Which tools you need depends on where your data is today. Whatever the starting point, the path is the same: reach [interoperability level 1](../getting_started/interoperability.md#interoperability-levels) (NGSI-LD and Smart Data Models), put a connector in front for level 2, and let programs and people use the data.

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
        PPL["People<br/>Lissi / atesta-id-wallet"]
    end
    V2 -- "Lepus" --> LD
    OT -- "IoT Agent or<br/>an ingestion job" --> LD
    LDN -- "as it is" --> LD
    LD --> CON
    CON --> PRG
    CON --> PPL
```

For example, a city with an NGSI-v2 platform puts Lepus in front of it and publishes it through its connector; the [Valencia example](../valencia/index.md) shows it step by step.
