---
title: The CitCom.ai Data Space
description: "The data space shared by all CitCom partners: how it works today, its marketplace and how to join."
hide:
  - toc
---

# The CitCom.ai Data Space

<p class="cc-lead">Where CitCom partners share data and AI services under their own rules. Operated by VRAIN-UPV for every partner, built on the FIWARE Data Space Connector, and open to any organisation that joins.</p>

<div class="cc-infra" markdown="0">
  <div class="cc-infra__band">
    <p class="cc-infra__eyebrow">Shared services, operated by VRAIN-UPV for all of CitCom</p>
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
      <span class="cc-infra__tag">Provider</span>
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
      <span class="cc-infra__tag">Consumer</span>
      <strong>VRAIN-UPV</strong>
      <small>Its AI service, the MIAIS, reads the data it bought</small>
      <span class="cc-infra__conn">Connector</span>
    </a>
  </div>
</div>

<div class="cc-steps" markdown="0">
  <ol class="cc-infra__legend">
    <li><span class="cc-infra__step">1</span><span><strong>Join.</strong> Both organisations register in the onboarding portal. Once approved, they are in the trust anchor and their credentials are trusted.</span></li>
    <li><span class="cc-infra__step">2</span><span><strong>Publish.</strong> The Ajuntament offers a dataset in the marketplace, for example its waste containers.</span></li>
    <li><span class="cc-infra__step">3</span><span><strong>Buy.</strong> VRAIN-UPV buys the offer. The purchase sets up the contract in the Ajuntament's connector.</span></li>
    <li><span class="cc-infra__step">4</span><span><strong>Read.</strong> The MIAIS of VRAIN-UPV reads the data from the Ajuntament's connector. The data never goes through the shared services.</span></li>
  </ol>
  <div class="cc-infra__cta-row"><a class="cc-infra__cta" href="../guides/join/">Join the data space</a>
</div>
</div>

The Ajuntament de València and VRAIN-UPV are the first participants, and both are told step by step as worked examples. The technical view, with every component and the public addresses, is in [How it works](fiware.md#the-deployment-today).


## Also in CitCom

Libelium operates a second, separate data space built on Eclipse EDC, for the partners that work with that technology. It has its own portal and catalogue; see [Eclipse EDC data space](eclipse/index.md).

