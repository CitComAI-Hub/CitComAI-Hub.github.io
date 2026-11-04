---
title: The CitCom data spaces
description: "The two data spaces shared by all CitCom partners, FIWARE and Eclipse EDC, the marketplace and how they connect."
---

# The CitCom data spaces

CitCom runs two data spaces for all its partners, built with the two main open-source technologies in Europe. Both follow the concepts in [Data spaces in 5 minutes](../getting_started/data_spaces.md); they differ in how identity and contracts work.

| | FIWARE data space | Eclipse EDC data space |
|---|---|---|
| **Technology** | [FIWARE Data Space Connector](https://github.com/FIWARE/data-space-connector) 10 | [Eclipse EDC](https://eclipse-edc.github.io/), sovity Community Edition |
| **Operated by** | [VRAIN-UPV](https://vrain.upv.es/) | [Libelium](https://www.libelium.com/) |
| **Identity** | Verifiable credentials (OID4VCI / OID4VP) and wallets | Connector identities managed by the operator's portal |
| **Contracts** | Marketplace (TMForum) → contract-management → trust list + ODRL policy | Dataspace Protocol (DSP) negotiation between connectors |
| **Data API** | NGSI-LD, served by the provider's connector | Any HTTP source, transferred by the connectors |
| **Entry point** | [marketplace.citcom-vrain-dataspace.eu](https://marketplace.citcom-vrain-dataspace.eu) | [citcom.dataspaceready.eu](https://citcom.dataspaceready.eu) |

## The infrastructure today

<div class="cc-infra" markdown="0">
  <div class="cc-infra__band">
    <p class="cc-infra__eyebrow">Shared by every participant · operated by VRAIN-UPV</p>
    <div class="cc-infra__shared">
      <a class="cc-infra__svc" href="fiware/#shared-services">
        <span class="cc-infra__icon" aria-hidden="true">&#9670;</span>
        <strong>Trust anchor</strong>
        <small>Who is trusted: the registry of participants</small>
      </a>
      <a class="cc-infra__svc" href="../guides/join/">
        <span class="cc-infra__icon" aria-hidden="true">&#43;</span>
        <strong>Onboarding portal</strong>
        <small>Organisations ask to join</small>
      </a>
      <a class="cc-infra__svc" href="../marketplace/">
        <span class="cc-infra__icon" aria-hidden="true">&#9638;</span>
        <strong>Marketplace</strong>
        <small>Offers, purchases and contracts</small>
      </a>
    </div>
  </div>
  <div class="cc-infra__bus">
    <span>Verifiable credentials</span><span>ODRL contracts</span><span>NGSI-LD and Smart Data Models</span>
  </div>
  <div class="cc-infra__parts">
    <a class="cc-infra__part" href="../valencia/">
      <span class="cc-infra__tag">Data provider</span>
      <strong>Ajuntament de València</strong>
      <small>City data from its urban platform, through Lepus</small>
      <span class="cc-infra__conn">Connector</span>
    </a>
    <a class="cc-infra__part" href="../miais/">
      <span class="cc-infra__tag">Service provider · consumer</span>
      <strong>VRAIN-UPV</strong>
      <small>AI services such as the MIAIS, which reads city data</small>
      <span class="cc-infra__conn">Connector</span>
    </a>
    <a class="cc-infra__part cc-infra__part--you" href="../guides/join/">
      <span class="cc-infra__tag">Consumer or provider</span>
      <strong>Your organisation</strong>
      <small>Join, buy an offer, read data or publish your own</small>
      <span class="cc-infra__conn">Join &rarr;</span>
    </a>
  </div>
  <div class="cc-infra__edc">
    <strong>Eclipse EDC data space</strong>
    <span>A separate data space operated by Libelium, with its own catalogue and connectors.</span>
    <a href="eclipse/">Read more &rarr;</a>
  </div>
</div>

- The **shared services** are the same for everyone: one trust anchor, one onboarding portal, one marketplace.
- Each **participant** runs its own connector, or uses a shared one, and talks to the others with the same three standards: verifiable credentials for identity, ODRL contracts for access, NGSI-LD for the data.
- The technical view, with every component and the public addresses, is in [FIWARE data space](fiware.md#the-deployment-today).

<div class="grid cards" markdown>

-   :material-shield-key-outline:{ .lg .middle } __FIWARE data space__

    ---

    Its components, the deployment running today, and the flows to join, buy and access data and services.

    [:octicons-arrow-right-24: FIWARE data space](fiware.md)

-   :material-storefront-outline:{ .lg .middle } __Marketplace__

    ---

    Where the participants of the FIWARE data space publish and buy datasets and services.

    [:octicons-arrow-right-24: Marketplace](../marketplace/index.md)

-   :material-transit-connection-variant:{ .lg .middle } __Eclipse EDC data space__

    ---

    The alternative stack: architecture and deployment.

    [:octicons-arrow-right-24: Eclipse EDC data space](eclipse/index.md)

</div>
