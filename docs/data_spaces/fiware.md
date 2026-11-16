---
title: How the data space works
description: "Its components and four flows: join, purchase, machine access and person access."
---

# How the data space works

The CitCom.ai Data Space is operated by VRAIN-UPV for the whole of CitCom and uses the [FIWARE Data Space Connector](https://github.com/FIWARE/data-space-connector) (version 10), which follows the recommendations of the [Data Spaces Business Alliance](https://data-spaces-business-alliance.eu/). This page describes its parts, the deployment running today and the four flows that make it work.

## Shared services

**Trust anchor**
:   Keeps the **Trusted Issuers Registry** (TIR): the list of organisations whose credentials are trusted in the data space, by their decentralised identifier (`did:web:…`). A verifier rejects any credential issued by an organisation that is not in it.

**Onboarding portal**
:   Where an organisation asks to join. Its legal representative (LEAR) registers the organisation; once approved, it is added to the trust anchor, and the LEAR acts for it with a `LegalPersonCredential`.

**Marketplace**
:   The catalogue of offers, built on the [TM Forum](https://www.tmforum.org/) APIs and the [BAE](https://github.com/FIWARE-TMForum/Business-API-Ecosystem) frontend. The LEAR of each organisation logs in with a wallet, sets up the organisation's profile, publishes offers and buys them. See [Marketplace](../marketplace/index.md).

## The deployment today

<div class="cc-infra" markdown="0">
  <div class="cc-infra__band">
    <p class="cc-infra__eyebrow">Operated by VRAIN-UPV for the whole data space</p>
    <div class="cc-infra__shared">
      <a class="cc-infra__svc" href="../../guides/join/">
        <strong>Onboarding portal</strong>
        <small>Organisations join</small>
      </a>
      <a class="cc-infra__svc" href="#shared-services">
        <strong>Trust anchor</strong>
        <small>Trusted Issuers Registry</small>
      </a>
      <a class="cc-infra__svc" href="../../marketplace/">
        <strong>Marketplace</strong>
        <small>Catalogue, offers, orders</small>
      </a>
    </div>
  </div>
  <div class="cc-infra__links cc-infra__links--steps" aria-hidden="true">
    <div class="cc-infra__label"><span class="cc-infra__step">1</span><small>The onboarding portal registers each organisation in the trust anchor</small></div>
    <div class="cc-infra__label"><span class="cc-infra__step">2</span><small>Each connector publishes offers in the marketplace</small></div>
    <div class="cc-infra__label"><span class="cc-infra__step">3</span><small>On purchase, the marketplace registers the contract in the provider's connector</small></div>
  </div>
  <div class="cc-infra__flow">
    <a class="cc-infra__part" href="../../valencia/">
      <span class="cc-infra__tag">Provider</span>
      <strong>Ajuntament de València</strong>
      <small>townhall-vlc. City data: VLCi + Lepus, Orion-LD</small>
      <span class="cc-infra__conn">Connector</span>
    </a>
    <div class="cc-infra__arrow">
      <span class="cc-infra__step">4</span>
      <span class="cc-infra__line"></span>
      <small>Reads the waste containers (MachineCredential)</small>
    </div>
    <a class="cc-infra__part" href="../../miais/">
      <span class="cc-infra__tag">Consumer</span>
      <strong>VRAIN-UPV</strong>
      <small>vrain. AI service: MIAIS</small>
      <span class="cc-infra__conn">Connector</span>
    </a>
  </div>
  <div class="cc-infra__flow cc-infra__flow--below">
    <div class="cc-infra__rise">
      <span class="cc-infra__riseline"></span>
      <span class="cc-infra__risetext"><span class="cc-infra__step">5</span><small>People log in (ServiceCredential)</small></span>
      <a class="cc-infra__part cc-infra__part--plain" href="../../toolbox/wallets/">
        <span class="cc-infra__tag">People</span>
        <strong>Wallets</strong>
        <small>atesta-id-wallet, Lissi</small>
      </a>
    </div>
  </div>
</div>

- Each participant runs its own **connector**. The diagram shows the first two: the Ajuntament de València, which provides city data, and VRAIN-UPV, which provides an AI service and consumes city data. Both are described as worked examples: [Valencia](../valencia/index.md) and the [MIAIS](../miais/index.md). New participants join the same way.
- The MIAIS reads the waste containers of Valencia through the Ajuntament's connector, after buying the offer in the marketplace. People from other organisations use the MIAIS by logging in with their wallet.

The public services are:

| Service | URL |
|---|---|
| Marketplace | <https://marketplace.citcom-vrain-dataspace.eu> |
| Onboarding portal | <https://onboarding.citcom-vrain-dataspace.eu> |
| Trust anchor (TIR) | <https://tir.citcom-vrain-dataspace.eu/v4/issuers> (list of trusted organisations) |
| Connector of a participant `<p>` | `https://apisix-<p>.citcom-vrain-dataspace.eu` (data and services), `https://keycloak-<p>…` (credentials), `https://verifier-<p>…` (tokens) |

## Inside a connector

Every participant runs the same set of components:

<div class="cc-infra" markdown="0">
  <div class="cc-infra__solo">
    <div class="cc-infra__part cc-infra__part--plain">
      <span class="cc-infra__tag">Consumer</span>
      <strong>A program or a person</strong>
      <small>With a MachineCredential or a ServiceCredential</small>
    </div>
  </div>
  <div class="cc-infra__links cc-infra__links--steps" aria-hidden="true">
    <div class="cc-infra__label"><span class="cc-infra__step">1</span><small>It presents its credential to the Verifier and gets an access token</small></div>
    <div class="cc-infra__label"><span class="cc-infra__step">2</span><small>It sends the request with the token to APISIX</small></div>
  </div>
  <div class="cc-infra__band">
    <p class="cc-infra__eyebrow">Connector of a participant</p>
    <p class="cc-infra__group">Access: who gets in</p>
    <div class="cc-infra__shared">
      <div class="cc-infra__svc"><strong>Verifier</strong><small>Credential → token (OID4VP)</small></div>
      <div class="cc-infra__svc"><strong>APISIX</strong><small>Gateway: checks the token, asks OPA</small></div>
      <div class="cc-infra__svc"><strong>NGSI-LD broker</strong><small>The data: Scorpio, Orion-LD, Lepus</small></div>
    </div>
    <p class="cc-infra__group">Rules: what they can do</p>
    <div class="cc-infra__shared">
      <div class="cc-infra__svc"><strong>Trusted Issuers List</strong><small>Who may access this connector</small></div>
      <div class="cc-infra__svc"><strong>OPA</strong><small>Allows or denies each request</small></div>
      <div class="cc-infra__svc"><strong>ODRL-PAP</strong><small>Stores the access policies</small></div>
    </div>
    <p class="cc-infra__group">Set-up: who is let in, and how</p>
    <div class="cc-infra__shared">
      <div class="cc-infra__svc"><strong>Keycloak</strong><small>Issues credentials to its people and programs (OID4VCI)</small></div>
      <div class="cc-infra__svc"><strong>contract-management</strong><small>Applies each purchase to the list and the policies</small></div>
    </div>
  </div>
  <div class="cc-infra__links cc-infra__links--steps" aria-hidden="true">
    <div class="cc-infra__label"><span class="cc-infra__step">3</span><small>When an order is completed, the marketplace notifies contract-management</small></div>
  </div>
  <div class="cc-infra__solo">
    <div class="cc-infra__part cc-infra__part--plain">
      <span class="cc-infra__tag">Shared service</span>
      <strong>Marketplace</strong>
      <small>Where the offers are bought</small>
    </div>
  </div>
</div>

| Component | Role |
|---|---|
| **Keycloak** | Identity server of the organisation. Issues `MachineCredential` and `ServiceCredential` to its programs and people with OpenID for Verifiable Credential Issuance (OID4VCI), as SD-JWT credentials. |
| **Verifier** | Receives credentials from consumers (OpenID for Verifiable Presentations), checks them against the trust anchor and the local trust list, and returns an access token. |
| **Trusted Issuers List** (TIL) | The organisations allowed to access *this* connector, per credential type and role. Filled in when someone buys an offer. |
| **APISIX** | The gateway in front of the data and services. Checks the token and asks OPA for a decision on every request. |
| **OPA + ODRL-PAP** | The policy engine. The PAP stores ODRL policies and turns them into rules for OPA, which allows or denies each request by organisation, path, entity type and method. |
| **contract-management** | Listens to the marketplace. When an order for one of this participant's offers is completed, it adds the buyer to the TIL and loads the offer's policy into the PAP. |
| **NGSI-LD broker** | The data itself. Scorpio comes with the connector; the Ajuntament also serves its data through Orion-LD and [Lepus](../toolbox/lepus.md). |

## Flows

### Join the data space

1. The organisation's LEAR registers it in the onboarding portal.
2. Once approved, the organisation's `did:web` is added to the trust anchor.
3. The LEAR logs in to the marketplace with a wallet and completes the organisation's profile. A provider also sets the address of its contract-management there, so purchases reach its connector.

The guide [Join the data space](../guides/join.md) has the details.

### Purchase an offer

```mermaid
sequenceDiagram
    autonumber
    actor P as Provider (LEAR)
    actor C as Consumer (LEAR)
    participant MK as Marketplace
    participant CM as Provider contract-management
    participant TIL as Provider TIL
    participant PAP as Provider ODRL-PAP
    P->>MK: Publish offer (credential type, roles, ODRL policy)
    C->>MK: Buy offer
    MK->>CM: Order completed
    CM->>TIL: Trust the consumer's DID for MachineCredential, role clearence1
    CM->>PAP: Load the policy (e.g. only WasteContainer under /lepus/ngsi-ld)
```

An offer carries two settings: **which credential and roles** the buyer will be allowed to present, and **which policy** limits what the buyer can do. Both are applied automatically when the order completes; nobody configures the connector by hand.

### A machine reads data

This is how a program, such as the [MIAIS](../miais/index.md), reads data from another organisation. The library [ds-consumer-auth](../toolbox/ds_consumer_auth.md) does steps 1 to 5 for you.

```mermaid
sequenceDiagram
    autonumber
    participant APP as Consumer program
    participant KC as Consumer Keycloak
    participant VF as Provider verifier
    participant GW as Provider APISIX
    participant OPA as Provider OPA
    participant BR as Provider broker
    APP->>KC: Log in and request a MachineCredential (OID4VCI)
    KC-->>APP: Signed credential (SD-JWT)
    APP->>VF: Present the credential (vp_token)
    VF->>VF: Issuer in the trust anchor? Consumer in the TIL with these roles?
    VF-->>APP: Access token (short-lived JWT)
    APP->>GW: GET /ngsi-ld/v1/entities?type=WasteContainer + token
    GW->>OPA: Allowed?
    OPA-->>GW: Yes, a purchased policy matches
    GW->>BR: Forward
    BR-->>APP: Entities (NGSI-LD)
```

If the consumer has not bought any offer, step 5 fails: the verifier does not find the consumer in its TIL. If it has bought an offer but not this dataset, step 8 fails: no policy allows that entity type. See [Use data from your code](../guides/consume_data.md).

### A person uses a web service

A provider can also offer a web application. People log in with a wallet instead of a password, and the provider's gateway does the login: the application needs no login code of its own.

```mermaid
sequenceDiagram
    autonumber
    actor U as Person with a wallet
    participant GW as Provider APISIX
    participant VF as Provider verifier
    participant OPA as Provider OPA
    participant APP as Web service (e.g. MIAIS)
    U->>GW: Open https://apps-vrain.citcom-vrain-dataspace.eu/waste-collection/
    GW-->>U: No session: redirect to the verifier
    VF-->>U: QR code
    U->>VF: Scan with the wallet, present the ServiceCredential
    VF->>VF: Issuer trusted? Organisation bought the service, with this role?
    VF-->>GW: Authorisation code → token
    GW-->>U: Encrypted session cookie
    U->>GW: Requests with the session
    GW->>OPA: Allowed? (path /waste-collection, role)
    GW->>APP: Forward
```

The person's organisation must have bought the service, and the person must have the role the service asks for in their `ServiceCredential`. See [Publish a web service](../guides/publish_service.md).

## Where to go next

- [Valencia: a city platform](../valencia/index.md): a worked example of a city offering its data here.
- [Guides](../guides/index.md): join, read data, publish a dataset or a service.
- [Deploy your own connector](../guides/deploy_connector.md): how a connector is deployed.
