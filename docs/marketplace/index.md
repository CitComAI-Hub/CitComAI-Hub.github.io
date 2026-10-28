---
title: Marketplace
icon: material/storefront-outline
---

# Marketplace

The **CitCom marketplace** is where the participants of the FIWARE data space publish their datasets and services, and where other organisations find and buy them. It replaces the data catalogue and the list of services that this site used to keep.

[Open the marketplace](https://marketplace.citcom-vrain-dataspace.eu){ .md-button .md-button--primary }

Anyone can browse it. To buy or to publish, your organisation must [join the data space](../guides/join.md), and its legal representative logs in with a [wallet](../toolbox/wallets.md).

## What is on offer

| Offer | Provider | Kind | Category |
|---|---|---|---|
| Waste containers (`WasteContainer`) | Ajuntament de València | Dataset | Data › Waste management |
| Air quality (`AirQualityObserved`) | Ajuntament de València | Dataset | Data › Environment |
| Traffic flow (`TrafficFlowObserved`) | Ajuntament de València | Dataset | Data › Mobility |
| Traffic state (`TrafficState`) | Ajuntament de València | Dataset | Data › Mobility |
| Access to the MIAIS Waste Collection | VRAIN-UPV | Web service | AI services |

The datasets are described in the [Valencia node](../valencia/index.md#data-in-the-data-space), and the service in [MIAIS](../miais/index.md).

## How the marketplace is organised

- **Services** lists every offer of every provider, datasets and services alike.
- **Catalogues** group the offers by provider.
- The **home page** shows the offers that have an image.

### Categories

The categories are shared by the whole data space, so the filters work the same for every provider:

```
Data
├── Waste management
├── Environment
└── Mobility
AI services
```

New categories are added by the data space operator when a new kind of offer needs one.

## Buying an offer

1. Log in with the wallet of your organisation's legal representative.
2. Open the offer, read its description and terms of use, and buy it.
3. When the order is completed, the provider's connector applies the contract on its own: it trusts your organisation's credentials and loads the access policy of the offer. See [the purchase flow](../data_spaces/fiware.md#purchase-an-offer).

Then:

- for a **dataset**, your programs read it with a `MachineCredential`: [Use data from your code](../guides/consume_data.md);
- for a **web service**, the people of your organisation open it with their wallet and a `ServiceCredential` with the service's role: [Get a wallet and your credentials](../guides/wallet.md).

## Publishing an offer

See [Publish a dataset](../guides/publish_dataset.md) and [Publish a web service](../guides/publish_service.md).

## Other data in CitCom

- The [Eclipse EDC data space](../data_spaces/eclipse/index.md) has its own catalogue at [citcom.dataspaceready.eu](https://citcom.dataspaceready.eu).
- Each [TEF node](../tef/index.md) describes the data platforms and open data it offers.
