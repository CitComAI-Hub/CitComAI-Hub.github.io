---
title: Data spaces in 5 minutes
description: "The core concepts: participant, trust anchor, connector, credential, offer and policy."
next_step:
  url: data_spaces/
  title: "The CitCom.ai Data Space"
  description: "How the CitCom.ai Data Space works today, its marketplace and how to join."
---

# Data spaces in 5 minutes

**Data space (DS)** refer to structured and managed environments where data from various sources is securely stored, shared, and utilized for AI and robotics applications within smart and sustainable cities. These data spaces are **the project's core technology**, enabling participants to **access** and leverage **high-quality data for testing**, **experimentation**, and **validation of AI technologies**.

Data spaces support **interoperability**, ensuring that data from different sources can be combined and used while **complying with** regulations such as the **GDPR and other EU directives**. They provide the necessary infrastructure for managing data in a way that supports ethical considerations, cybersecurity, and the broader goals of creating a more digital and sustainable urban environment.

This is how a data space works, from joining it to reading data. Follow the steps and watch which pieces take part in each one; the pieces are explained below.

<div class="cc-pieces" markdown="0">
  <div class="cc-pieces__head">
    <div class="cc-pieces__texts">
      <div class="cc-pieces__text"><p class="cc-tef__eyebrow">Registration</p><p>Provider and consumer are <strong>registered in the trust anchor</strong>. From then on, the credentials they issue are accepted by the others.</p></div>
      <div class="cc-pieces__text"><p class="cc-tef__eyebrow">Publication</p><p>Once registered, the provider <strong>publishes an offer</strong> in the marketplace.</p></div>
      <div class="cc-pieces__text"><p class="cc-tef__eyebrow">Step 1</p><p>The consumer <strong>buys the offer</strong> in the marketplace. The provider's connector registers the contract.</p></div>
      <div class="cc-pieces__text"><p class="cc-tef__eyebrow">Step 2</p><p>The consumer's program gets a <strong>credential</strong> from its own organisation.</p></div>
      <div class="cc-pieces__text"><p class="cc-tef__eyebrow">Step 3</p><p>It presents the credential to the provider's connector, which checks it against the trust anchor, and receives a short-lived <strong>access token</strong>.</p></div>
      <div class="cc-pieces__text"><p class="cc-tef__eyebrow">Step 4</p><p>It calls the data API with that token. The connector checks the policy and <strong>returns the data</strong>.</p></div>
    </div>
    <ol class="cc-pieces__bar" aria-label="Phases of the exchange">
      <li><button type="button" aria-label="Registration"><span></span></button></li>
      <li><button type="button" aria-label="Publication"><span></span></button></li>
      <li><button type="button" aria-label="Step 1"><span></span></button></li>
      <li><button type="button" aria-label="Step 2"><span></span></button></li>
      <li><button type="button" aria-label="Step 3"><span></span></button></li>
      <li><button type="button" aria-label="Step 4"><span></span></button></li>
    </ol>
  </div>
  <div class="cc-pieces__map">
    <div class="cc-pieces__who cc-pieces__who--provider">
      <p class="cc-tef__eyebrow">Provider</p>
      <p class="cc-tef__meta">Offers data or services</p>
      <div class="cc-pieces__piece" data-steps="2 4 5"><strong>Connector</strong><small>Checks who asks, applies the policy</small></div>
      <div class="cc-pieces__piece" data-steps="5"><strong>Data</strong><small>Stays at the provider</small></div>
    </div>
    <div class="cc-pieces__piece cc-pieces__trust" data-steps="0 4"><strong>Trust anchor</strong><small>Who belongs to the data space</small></div>
    <div class="cc-pieces__piece cc-pieces__market" data-steps="1 2"><strong>Marketplace</strong><small>Offers and contracts</small></div>
    <div class="cc-pieces__arrow cc-pieces__a1 cc-pieces__arrow--r" data-steps="0"><small>registered in</small><span></span></div>
    <div class="cc-pieces__arrow cc-pieces__a2 cc-pieces__arrow--l" data-steps="0"><small>registered in</small><span></span></div>
    <div class="cc-pieces__arrow cc-pieces__a3 cc-pieces__arrow--r" data-steps="1"><small>publishes an offer</small><span></span></div>
    <div class="cc-pieces__arrow cc-pieces__a4 cc-pieces__arrow--l" data-steps="2"><small>buys the offer</small><span></span></div>
    <div class="cc-pieces__arrow cc-pieces__a5 cc-pieces__arrow--l cc-pieces__arrow--data" data-steps="4 5"><small>reads the data with a credential</small><span></span></div>
    <div class="cc-pieces__who cc-pieces__who--consumer">
      <p class="cc-tef__eyebrow">Consumer</p>
      <p class="cc-tef__meta">Uses data or services</p>
      <div class="cc-pieces__piece" data-steps="2 3 4 5"><strong>Connector or app</strong><small>Asks for the data</small></div>
      <div class="cc-pieces__piece" data-steps="3 4"><strong>Wallet / credentials</strong><small>Proves who it is</small></div>
    </div>
  </div>
</div>


## The pieces

A data space is not a single product but a set of **building blocks**, each with one job: who takes part, who is trusted, who controls access and under which rules. These are the *pieces* of the diagram above, and the terms used throughout this documentation. Knowing what each one does is enough to follow any guide.

<div class="cc-help cc-help--plain" markdown="0">
  <div class="cc-help__item">
    <p class="cc-tef__eyebrow">Connector</p>
    <p>The software each participant runs at its border. For a provider, it sits in front of the data: it checks who is asking, applies the access rules and only then forwards the request. In CitCom it is the <a href="../../data_spaces/fiware/">FIWARE Data Space Connector</a>.</p>
  </div>
  <div class="cc-help__item">
    <p class="cc-tef__eyebrow">Trust anchor</p>
    <p>The list of participants that everyone trusts. When an organisation joins, the operator of the data space adds it to the trust anchor. From then on, the credentials it issues are accepted by the others.</p>
  </div>
  <div class="cc-help__item">
    <p class="cc-tef__eyebrow">Participant</p>
    <p>An organisation in the data space: a city council, a company, a university. In CitCom, for example, the Ajuntament de València (<code>townhall-vlc</code>) and VRAIN-UPV (<code>vrain</code>). A participant can be a <strong>provider</strong> (offers data or services), a <strong>consumer</strong> (uses them), or both.</p>
  </div>
  <div class="cc-help__item">
    <p class="cc-tef__eyebrow">Verifiable credential</p>
    <p>A digital certificate, signed by an organisation, that says something about a person or a machine: "this is an employee of VRAIN", "this program acts for VRAIN with the role <code>clearence1</code>". People keep theirs in a <a href="../../toolbox/wallets/">wallet</a> on the phone or the desktop; programs request them from their organisation's identity server. CitCom uses three types, listed below.</p>
  </div>
  <div class="cc-help__item">
    <p class="cc-tef__eyebrow">Offer</p>
    <p>What a provider makes available: a dataset or a service, with a description, terms of use and the access rule it grants. Offers are published in the <strong>marketplace</strong>, where anyone can browse them.</p>
  </div>
  <div class="cc-help__item">
    <p class="cc-tef__eyebrow">Contract and policy</p>
    <p>When a consumer buys an offer, a contract is created. The provider's connector then registers two things: that the consumer's credentials are now accepted, and an <strong>access policy</strong> (written in <a href="https://www.w3.org/TR/odrl-model/">ODRL</a>) that says exactly what they can read, for example "only <code>WasteContainer</code> entities, only through this path".</p>
  </div>
</div>


## What happens when a consumer reads data

1. The consumer buys the offer in the marketplace. The provider's connector registers the contract.
2. The consumer's program gets a `MachineCredential` from its own organisation.
3. It presents the credential to the provider's connector and receives a short-lived access token.
4. It calls the data API with that token. The connector checks the policy and returns the data.

Nobody shares passwords, and the provider never creates accounts for consumers: trust comes from the trust anchor, and access from the contract. [How the data space works](../data_spaces/fiware.md#flows) shows these steps as diagrams.

## Why not just an API key?

An API key works between two organisations that already know each other. A data space works between many organisations that do not, and gives each provider:

- **sovereignty**: the data stays at home and the provider writes the rules;
- **traceability**: every access is tied to an organisation and a contract;
- **scale**: a new consumer does not need a new account or a new integration, only a purchase.

!!! info "Further reading"

    - [Data Spaces Support Centre](https://dssc.eu/): the European reference on data spaces and their building blocks.
    - [DS4SSCC](https://www.ds4sscc.eu/): data spaces for smart and sustainable cities and communities.
    - [FIWARE Data Space Connector](https://github.com/FIWARE/data-space-connector) and [Eclipse Dataspace Components](https://eclipse-edc.github.io/).
