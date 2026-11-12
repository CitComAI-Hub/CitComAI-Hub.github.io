---
title: Publish a dataset
description: "Offer a dataset in the marketplace with the offer wizard."
---

# Publish a dataset

**What you will get**: a dataset of your organisation offered in the marketplace. Whoever buys it can read it through your connector, and only it.

You publish it from the marketplace with the **offer wizard**: you choose what kind of data it is and fill in a few fields. Its access policies and its terms of use come from the [rulebook](../data_spaces/rulebook.md), so you write no policy and no legal text, and the marketplace rejects any offer that the rulebook would not generate.

## What you need

- Your organisation [registered](join.md), with its own [connector](deploy_connector.md) and the contract management address in its marketplace profile.
- Your organisation **enabled as a provider**: before your first offer, the data space operator reviews your connector once (rulebook R8.7). Ask the operator.
- The data in an **NGSI-LD broker** behind your connector, described with [Smart Data Models](../toolbox/smart_data_models.md):
    - a broker of your own (Orion-LD, Scorpio), loaded by your ingestion process; or
    - your existing NGSI-v2 platform, served as NGSI-LD by [Lepus](../toolbox/lepus.md), as the Ajuntament de València does.
- A route in your connector's gateway (APISIX) to that broker, protected by the verifier token and the policy engine (OPA), as the default `/ngsi-ld/*` route is. The rulebook also asks that the route:
    - accepts **GET only**: buyers read, they never write;
    - serves only the entity endpoints, `<path>/v1/entities` and `<path>/v1/entities/*`;
    - removes the `X-Stripped-Path` and tenant headers (`NGSILD-Tenant`, and `Fiware-Service`, `Fiware-ServicePath` in front of NGSI-v2) that the buyer sends, because the policy engine would trust them;
    - limits each buying organisation to **60 requests per minute** (APISIX `limit-count`, counted per issuer of the buyer's credential).

    The rulebook's [implementation profiles](https://github.com/CitComAI-Hub/citcom-ds-rulebook/blob/main/docs/implementation-profiles.md) explain why, for each kind of broker.

## Steps

### 1. Decide what the offer covers

One offer per dataset. For each one, have at hand:

| Field | What it is | Example |
|---|---|---|
| Kind of data | **Open data** if you already publish it as open data; **Shared data** if it is not public (rulebook R6.4) | Shared data |
| Path in your gateway | The path of its route | `/ngsi-ld` |
| Entity type | Its NGSI-LD type, a [Smart Data Model](../toolbox/smart_data_models.md) | `BikeHireDockingStation` |

Buyers read it with a `MachineCredential` that carries the role `clearence1`, the data access role that every dataset of the data space asks for (rulebook R3.4). A buyer gives that role once to the software that reads its purchases; the realms created by the onboarding portal already have it.

### 2. Publish it with the offer wizard

Log in to the [marketplace](https://marketplace.citcom-vrain-dataspace.eu) with the wallet of your organisation's legal representative, acting as your organisation. In **My offerings**:

1. In **Catalogues**, create one for your organisation if you do not have one.
2. In **Offers**, press **New offer**. The wizard asks, in order:
    1. **What do you offer?** Open data or Shared data.
    2. **The offer**: title, description (Markdown), short name, path and entity type, and an image URL (offers with an image appear on the marketplace home).
    3. **Catalogue and categories.**
    4. **Terms of use**: the details the terms of your class need, about this offer (where the data comes from and how to cite it, what users can expect of it) and about your organisation (its name, the governing law, the courts, the data protection law). The organisation's details are remembered for your next offers.
    5. **Review and publish**: **Preview the offer** shows, in plain words, what buyers get and the full terms of use. **Publish the offer** creates and launches it.

Write all texts in English: CitCom is international.

The wizard asks the rulebook for the access policies (read only, that entity type under that path, only the buyer's software) and for the terms of use of the class. Nothing generated can be edited, and the marketplace checks every offer against the rulebook again before saving it: an offer edited by hand afterwards is rejected with *"Not generated from the CitCom rulebook"*.

!!! example "A real one: the Valencia datasets"

    The Ajuntament de València offers [four datasets](../valencia/index.md#data-in-the-data-space), one offer each. Its waste containers are *Shared data*, path `/lepus/ngsi-ld`, entity type `WasteContainer`.

## Check that it works

Buy the offer from a test organisation, then read the data as in [Use data from your code](consume_data.md). Also check what must fail: another entity type returns `403`, a write (`POST`, `PATCH`, `DELETE`) is refused, and an organisation that did not buy returns an error at the verifier.

Every day, the rulebook checks every offer published in the marketplace against its class (the *marketplace offers* badge on the [rulebook page](../data_spaces/rulebook.md)).

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| The wizard says *Act on behalf of your organisation* | You are logged in as yourself | Switch to your organisation in the user menu |
| *Only providers can create offers* or *Only organisations with their own connector* | Your organisation is not enabled as a provider, or it has no `did:web` of its own | Ask the data space operator |
| **Preview the offer** stays disabled | A required field is empty | The list under the button names the fields still to fill in |
| *Not generated from the CitCom rulebook: …* | The specification or the offer was edited by hand | Create the offer again with the wizard |
| *The rulebook service is not available* | The marketplace cannot reach the rulebook service | Try again later; tell the operator if it lasts |
| The purchase completes but nothing changes in your connector | The contract management address is missing in your profile | Fix the profile |
| The buyer's credential is rejected even though they bought | Their credential carries a role that the offer does not allow | All the data space roles of a credential must be allowed by the purchase: give machine users only the data access role |
