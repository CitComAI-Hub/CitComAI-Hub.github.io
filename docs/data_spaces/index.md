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

## The FIWARE data space today

<div class="cc-infra" markdown="0">
  <div class="cc-infra__band">
    <p class="cc-infra__eyebrow">Shared services · operated by VRAIN-UPV for all of CitCom</p>
    <div class="cc-infra__shared">
      <a class="cc-infra__svc" href="../guides/join/">
        <strong>Onboarding portal</strong>
        <small>An organisation asks to join</small>
      </a>
      <a class="cc-infra__svc" href="fiware/#shared-services">
        <strong>Trust anchor</strong>
        <small>The list of trusted organisations, checked on every access</small>
      </a>
      <a class="cc-infra__svc" href="../marketplace/">
        <strong>Marketplace</strong>
        <small>Providers publish offers, consumers buy them</small>
      </a>
    </div>
  </div>
  <div class="cc-infra__links" aria-hidden="true">
    <div class="cc-infra__label cc-infra__label--center"><span class="cc-infra__step">1</span><small>Both join</small></div>
    <div class="cc-infra__label cc-infra__label--left"><span class="cc-infra__step">2</span><small>Publishes an offer</small></div>
    <div class="cc-infra__label cc-infra__label--right"><span class="cc-infra__step">3</span><small>Buys it</small></div>
  </div>
  <div class="cc-infra__flow">
    <a class="cc-infra__part" href="../valencia/">
      <span class="cc-infra__tag">Provider · example</span>
      <strong>Ajuntament de València</strong>
      <small>Its connector serves the city data it offers</small>
      <span class="cc-infra__conn">Connector</span>
    </a>
    <div class="cc-infra__arrow">
      <span class="cc-infra__step">4</span>
      <span class="cc-infra__line"></span>
      <small>Reads the data, connector to connector</small>
    </div>
    <a class="cc-infra__part" href="../miais/">
      <span class="cc-infra__tag">Consumer · example</span>
      <strong>VRAIN-UPV</strong>
      <small>Its AI service, the MIAIS, reads the data it bought</small>
      <span class="cc-infra__conn">Connector</span>
    </a>
  </div>
  <ol class="cc-infra__legend">
    <li><span class="cc-infra__step">1</span><span><strong>Join.</strong> Both organisations register in the onboarding portal. Once approved, they are in the trust anchor and their credentials are trusted.</span></li>
    <li><span class="cc-infra__step">2</span><span><strong>Publish.</strong> The Ajuntament offers a dataset in the marketplace, for example its waste containers.</span></li>
    <li><span class="cc-infra__step">3</span><span><strong>Buy.</strong> VRAIN-UPV buys the offer. The purchase sets up the contract in the Ajuntament's connector.</span></li>
    <li><span class="cc-infra__step">4</span><span><strong>Read.</strong> The MIAIS of VRAIN-UPV reads the data from the Ajuntament's connector. The data never goes through the shared services.</span></li>
  </ol>
  <div class="cc-infra__cta-row"><a class="cc-infra__cta" href="../guides/join/">Join &rarr;</a></div>
</div>

The Ajuntament de València and VRAIN-UPV are the first participants, and both are told step by step as worked examples. The technical view, with every component and the public addresses, is in [FIWARE data space](fiware.md#the-deployment-today). The [Eclipse EDC data space](eclipse/index.md) is separate, operated by Libelium.

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
