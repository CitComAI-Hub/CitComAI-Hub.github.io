---
title: Toolbox
description: "The open-source tools used in the CitCom data space."
---

# Toolbox

The tools used in the CitCom data space, from the city platform to the AI service. All of them are open source.

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

For example, the Ajuntament de València serves its NGSI-v2 platform through Lepus, loads open data on traffic into an NGSI-LD broker with an ingestion job, and publishes both through its connector. See the [Valencia node](../valencia/index.md).

<div class="grid cards" markdown>

-   :material-swap-horizontal:{ .lg .middle } __Lepus__

    ---

    Serve an NGSI-v2 platform as NGSI-LD, without migrating it.

    [:octicons-arrow-right-24: Lepus](lepus.md)

-   :material-language-python:{ .lg .middle } __NGSI-LD and FiLiP__

    ---

    Query a context broker from Python.

    [:octicons-arrow-right-24: NGSI-LD and FiLiP](ngsi_ld.md)

-   :material-key-chain-variant:{ .lg .middle } __ds-consumer-auth__

    ---

    Get the access token of the data space from your code.

    [:octicons-arrow-right-24: ds-consumer-auth](ds_consumer_auth.md)

-   :material-wallet-outline:{ .lg .middle } __Wallets__

    ---

    Keep your credentials and log in with a QR code: Lissi ID Wallet and atesta-id-wallet.

    [:octicons-arrow-right-24: Wallets](wallets.md)

-   :material-shape-outline:{ .lg .middle } __Smart Data Models__

    ---

    The data models used in the CitCom data spaces.

    [:octicons-arrow-right-24: Smart Data Models](smart_data_models.md)

</div>

## More tools

Other tools collected by the project partners: [AI toolkit](ai_toolkit.md), [AI logging monitor](ai_logging_monitor.md), [MIMs toolkit](mims_toolkit.md), [LDT toolkit](ldt_toolkit.md), the [FIWARE IoT Agent](iot_agent.md) experiment and [other tools](other_toolkit.md).
