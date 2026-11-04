---
title: Publish a dataset
description: "Offer a dataset in the marketplace with its access policy."
---

# Publish a dataset

**What you will get**: a dataset of your organisation offered in the marketplace. Whoever buys it can read it through your connector, and only it.

## What you need

- Your organisation [registered](join.md), with its own [connector](deploy_connector.md) and the contract management address in its marketplace profile.
- The data in an **NGSI-LD broker** behind your connector, described with [Smart Data Models](../toolbox/smart_data_models.md):
    - a broker of your own (Orion-LD, Scorpio), loaded by your ingestion process; or
    - your existing NGSI-v2 platform, served as NGSI-LD by [Lepus](../toolbox/lepus.md), as the Ajuntament de València does.
- A route in your connector's gateway (APISIX) to that broker, protected by the verifier token and the policy engine (OPA), as the default `/ngsi-ld/*` route is.

## Steps

### 1. Decide what the offer grants

One offer per dataset keeps things simple. For each one, write down:

- the **path** of its route, e.g. `/ngsi-ld` or `/lepus/ngsi-ld`;
- its **entity type**, e.g. `WasteContainer`;
- the **credential and role** that buyers will present: `MachineCredential` and a role such as `clearence1`.

### 2. Write the two characteristics

An offer carries two characteristics that your connector applies on every purchase:

=== "Verifier policy"

    Which credentials the verifier accepts from the buyer (`credentialsConfiguration`): the credential type and the allowed values of the data space roles.

    ```json
    {
      "credentialsType": "MachineCredential",
      "claims": [{
        "name": "roles",
        "path": "$.roles[?(@.target==\"roles-dataspace\")].names[*]",
        "allowedValues": ["clearence1"]
      }]
    }
    ```

=== "ODRL policy"

    What the buyer can do (`authorizationPolicy`): here, use the `WasteContainer` entities under `/lepus/ngsi-ld`, with a `MachineCredential` that has the role `clearence1`.

    ```json
    {
      "@type": "odrl:Policy",
      "odrl:uid": "https://<participant>.<domain>/policy/waste-containers-access",
      "odrl:permission": [{
        "odrl:assigner": "did:web:<participant>.<domain>",
        "odrl:action": "odrl:use",
        "odrl:target": {
          "@type": "odrl:AssetCollection",
          "odrl:source": "urn:asset",
          "odrl:refinement": {
            "@type": "odrl:LogicalConstraint",
            "odrl:and": [
              {"odrl:leftOperand": "http:path", "odrl:operator": "http:isInPath",
               "odrl:rightOperand": "/lepus/ngsi-ld"},
              {"odrl:leftOperand": "ngsi-ld:entityType", "odrl:operator": "odrl:eq",
               "odrl:rightOperand": "WasteContainer"}
            ]
          }
        },
        "odrl:assignee": {
          "@type": "odrl:PartyCollection",
          "odrl:source": "urn:user",
          "odrl:refinement": {
            "@type": "odrl:LogicalConstraint",
            "odrl:and": [
              {"odrl:leftOperand": "vc:role", "odrl:operator": "odrl:hasPart",
               "odrl:rightOperand": "clearence1"},
              {"odrl:leftOperand": "vc:type", "odrl:operator": "odrl:hasPart",
               "odrl:rightOperand": "MachineCredential"}
            ]
          }
        }
      }]
    }
    ```

    The full version, with the `@context` and typed values, is in the [Valencia offers](../valencia/index.md#data-in-the-data-space) used as reference.

### 3. Create the offer in the marketplace

Log in to the [marketplace](https://marketplace.citcom-vrain-dataspace.eu) with the LEAR's wallet, and in **My offerings**:

1. Create a **catalogue** for your organisation, if you do not have one.
2. Create the **product specification**: name, description, terms of use, an image (it is required to show the offer on the home page) and the two characteristics above.
3. Create the **product offering** in your catalogue, with a [category](../marketplace/index.md#categories) and a price (free is fine), and launch it.

Write all texts in English: CitCom is international.

## Check that it works

Buy the offer from a test organisation, then read the data as in [Use data from your code](consume_data.md). Also check what must fail: another entity type returns `403`, and an organisation that did not buy returns an error at the verifier.

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| The purchase completes but nothing changes in your connector | The contract management address is missing in your profile, or a characteristic was saved without its value type | Fix the profile; recreate the characteristics with `credentialsConfiguration` and `authorizationPolicy` value types |
| The buyer gets `403` for the right path and type | The policy was not loaded in the policy engine | Check the policy; if you load one by hand, use an id without hyphens: hyphenated ids are accepted but never applied |
| The buyer's credential is rejected even though they bought | Their credential carries a role that the offer does not allow | All the data space roles of a credential must be allowed by the purchase: give machine users only the data role |
| The offer does not appear on the marketplace home | The specification has no image | Add a *Profile Picture* attachment |
