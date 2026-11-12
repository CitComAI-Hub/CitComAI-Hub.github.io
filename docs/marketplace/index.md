---
title: Marketplace
description: "What is on offer in the CitCom marketplace and how to buy it."
next_step:
  url: guides/join/
  title: "Join the data space"
  description: "Register your organisation in the onboarding portal, so that the other participants trust it."
---

# Marketplace

The **CitCom marketplace** is where the participants of the CitCom.ai Data Space publish their datasets and services, and where other organisations find and buy them. It is the place to find what is available: the datasets and services of every participant, with their descriptions and terms of use.

[Open the marketplace](https://marketplace.citcom-vrain-dataspace.eu){ .md-button .md-button--primary }

Anyone can browse it. To buy or to publish, your organisation must [join the data space](../guides/join.md), and its legal representative logs in with a [wallet](../toolbox/wallets.md).

## How the marketplace is organised

- **Services** lists every offer of every provider, datasets and web services alike.
- **Catalogues** group the offers by provider.
- **Categories** are shared by the whole data space, so the filters work the same for every provider. The data space operator adds a category when a new kind of offer needs one.
- The **home page** shows the offers that have an image.

Each offer describes itself: what it contains, how to access it and its terms of use, which come from its policy class in the [rulebook](../rulebook/index.md). This site does not keep a copy of the list: the marketplace is the only inventory.

## Buying an offer

1. Log in with the wallet of your organisation's legal representative.
2. Open the offer, read its description and terms of use, and buy it.
3. When the order is completed, the provider's connector applies the contract on its own: it trusts your organisation's credentials and loads the access policy of the offer. See [the purchase flow](../data_spaces/fiware.md#purchase-an-offer).

Then:

- for a **dataset**, your programs read it with a `MachineCredential`: [Use data from your code](../guides/consume_data.md);
- for a **web service**, the people of your organisation open it with their wallet and a `ServiceCredential` with the service's role: [Get a wallet and your credentials](../guides/wallet.md).

## Publishing an offer

Providers publish from **My offerings → Offers → New offer**: an offer wizard asks what kind of offer it is and a few fields, and generates its access policies and terms of use from the [rulebook](../rulebook/index.md). See [Publish a dataset](../guides/publish_dataset.md) and [Publish a web service](../guides/publish_service.md).

## Other data in CitCom

- The [Eclipse EDC data space](../data_spaces/eclipse/index.md) has its own catalogue at [citcom.dataspaceready.eu](https://citcom.dataspaceready.eu).
- Each [TEF node](../tef/index.md) describes the data platforms and open data it offers.
