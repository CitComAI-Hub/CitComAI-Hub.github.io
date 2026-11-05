---
title: "Valencia: a city platform in the data space"
description: "How the Ajuntament de València offers its NGSI-v2 platform in the data space through Lepus, without migrating it."
next_step:
  url: guides/join/
  title: "Join the data space"
  description: "The first step of every guide: register your organisation."
---

# Valencia: a city platform in the data space

The **Ajuntament de València** (City Council) was one of the first participants of the [CitCom.ai Data Space](../data_spaces/index.md). Its case is the reference for a city that already runs an urban platform and wants to offer that data to other organisations, without migrating the platform or copying the data.

Where the [MIAIS](../miais/index.md) shows the side of an AI service, this example shows the side of a **data provider**.

## The starting point

The city data lives in **VLCi**, the urban platform of the Ajuntament: an NGSI-v2 broker protected by Keystone, with its own data models. The goal was to reach [interoperability level 2](../getting_started/interoperability.md): the same data, as NGSI-LD with [Smart Data Models](../toolbox/smart_data_models.md), bought and accessed through the data space.

The steps were:

1. **Join the data space** as the participant `townhall-vlc`, with its own connector. See [Join the data space](../guides/join.md).
2. **Serve VLCi as NGSI-LD** with [Lepus](../toolbox/lepus.md) inside the connector, so that VLCi stays as it is.
3. **Publish one offer per dataset** in the marketplace, each limited to its entity type. See [Publish a dataset](../guides/publish_dataset.md).

## Data in the data space

The Ajuntament offers four datasets in the [marketplace](../marketplace/index.md), one offer each, all as NGSI-LD with [Smart Data Models](../toolbox/smart_data_models.md):

| Dataset | Entity type | Source | Endpoint path | Category |
|---|---|---|---|---|
| Waste containers | [`WasteContainer`](https://github.com/smart-data-models/dataModel.WasteManagement/tree/master/WasteContainer) | VLCi, through Lepus | `/lepus/ngsi-ld` | Waste management |
| Air quality | [`AirQualityObserved`](https://github.com/smart-data-models/dataModel.Environment/tree/master/AirQualityObserved) | VLCi, through Lepus | `/lepus/ngsi-ld` | Environment |
| Traffic flow | [`TrafficFlowObserved`](https://github.com/smart-data-models/dataModel.Transportation/tree/master/TrafficFlowObserved) | VLCi, through Lepus | `/lepus/ngsi-ld` | Mobility |
| Traffic state | `TrafficState` | VLCi open data | `/ngsi-ld` | Mobility |

The endpoints are under `https://apisix-townhall-vlc.citcom-vrain-dataspace.eu`. Each offer gives access to its entity type only, with a `MachineCredential`. To use them, follow [Use data from your code](../guides/consume_data.md).

## How the data flows

```mermaid
flowchart LR
    subgraph CITY["Ajuntament de València"]
        VLCI[("VLCi platform<br/>NGSI-v2 + Keystone")]
        OD["Open data<br/>traffic state"]
    end
    subgraph TV["townhall-vlc connector"]
        GW["APISIX<br/>verifier token + ODRL policy"]
        LE["Lepus<br/>NGSI-LD → NGSI-v2"]
        OR[("Orion-LD")]
        EDC["Route for EDC<br/>OAuth2"]
    end
    CONS["Consumers of the<br/>CitCom.ai Data Space"]
    EDCC["Eclipse EDC<br/>data space"]

    CONS -- "/lepus/ngsi-ld" --> GW
    CONS -- "/ngsi-ld" --> GW
    GW --> LE --> VLCI
    GW --> OR
    OD --> OR
    EDCC -- "/edc/lepus/ngsi-ld" --> EDC --> LE
```

- **Lepus** serves the VLCi data live. It translates each NGSI-LD query into NGSI-v2, authenticates with the city platform on its own, and returns the entities as NGSI-LD with their Smart Data Models `@context`. VLCi never sees the data space tokens, and nothing is copied. See [Lepus](../toolbox/lepus.md).
- **APISIX** protects every path with the same mechanism: a token from the verifier and the ODRL policy of the purchased offer.
- The same Lepus also serves the [Eclipse EDC data space](../data_spaces/eclipse/index.md), through its own route. See [below](#the-same-data-in-the-eclipse-edc-data-space).

## The same data in the Eclipse EDC data space

Some CitCom partners use the [Eclipse EDC data space](../data_spaces/eclipse/index.md) instead. So that they can use the Valencia data too, the Ajuntament can publish the same source there, without copying it. The two data spaces stay separate: this is one provider making its data available in both.

### How it works

An EDC connector does not present verifiable credentials. To fetch an asset, its data plane calls a fixed HTTP address and authenticates with **OAuth2 client credentials**. The Ajuntament's FIWARE connector accepts exactly that on one dedicated route:

```mermaid
flowchart LR
    subgraph EDC["Eclipse EDC data space"]
        CONS["Consumer connector"] -- "DSP negotiation<br/>and transfer" --> PROV["Provider connector<br/>(asset)"]
    end
    subgraph TV["Ajuntament de València · FIWARE connector"]
        KC["Keycloak<br/>client edc-citcom"]
        GW["APISIX<br/>/edc/lepus/ngsi-ld/v1/entities"]
        LE["Lepus"]
    end
    VLCI[("VLCi platform<br/>NGSI-v2")]
    PROV -- "1 client credentials" --> KC
    KC -- "token (scope lepus-read)" --> PROV
    PROV -- "2 GET + token" --> GW
    GW --> LE --> VLCI
```

1. The asset in the EDC data space points to the Ajuntament's gateway and holds an OAuth2 client of the Ajuntament's Keycloak.
2. When a consumer has negotiated a contract for the asset, the provider's EDC data plane gets a token and reads the entities. The consumer receives them through EDC as usual.

The route is deliberately narrow:

- It accepts only tokens with its own scope, which no other client of the realm has. A token for this route does not work on the rest of the connector, and the credentials-based tokens of the CitCom.ai Data Space do not work on this route.
- It only allows `GET` on `/entities`, only for the entity types that are published, and with a rate limit.
- It always returns JSON-LD, so the `@context` travels with the data.

Lepus is the same instance used in the CitCom.ai Data Space: both read the same, live data.

### What is published

The Valencia datasets that Lepus serves can be published as EDC assets, one per entity type: `WasteContainer`, `AirQualityObserved` and `TrafficFlowObserved`. The bridge has been tested end to end: an EDC consumer negotiated a contract and downloaded the waste containers of Valencia through this route.

### Differences to keep in mind

| | CitCom.ai Data Space | Eclipse EDC data space |
|---|---|---|
| Who is the consumer for the Ajuntament? | Each organisation, by its DID | The EDC connector that holds the asset |
| Access rules | ODRL policy per purchase, enforced by the Ajuntament's connector | Contract policy in EDC; the Ajuntament's route only knows the client |
| Queries | Any NGSI-LD query | The fixed address of the asset |

In other words, in the EDC data space the access control between consumers happens in EDC. The Ajuntament's connector only trusts the EDC asset as a whole.

## Who uses this data

| Service | Provider | What it does |
|---|---|---|
| [MIAIS Waste Collection](../miais/index.md) | VRAIN | Plans waste collection routes from the filling level of the Valencia containers. It reads the containers through the data space, and other organisations can use it by logging in with a wallet. |

## Do the same in your city

- An NGSI-v2 platform: put [Lepus](../toolbox/lepus.md) in front of it, as here.
- An NGSI-LD broker already: publish it directly through your connector.
- Another kind of platform: see [NGSI-LD and FiLiP](../toolbox/ngsi_ld.md) and the [other tools](../toolbox/index.md) to bring it to NGSI-LD.

Then follow the guides from [Get a wallet](../guides/wallet.md) to [Publish a dataset](../guides/publish_dataset.md). The Valencia TEF site itself is described in [TEF network](../tef/south_connect/valencia.md).
