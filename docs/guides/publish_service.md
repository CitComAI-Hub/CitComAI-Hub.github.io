---
title: Publish a web service
description: "Offer a web app that people open with their wallet."
---

# Publish a web service

**What you will get**: a web application offered in the marketplace. People from the organisations that buy it open it with their wallet; you write no login code. Your connector's gateway does the login and checks the purchase on every request.

In this guide, replace:

| Placeholder | What it is | Example |
|---|---|---|
| `<service>` | A short name for your service: its path prefix and the name of its policy | `route-planner` |
| `<service>_user` | The role that the people who use it carry | `route_planner_user` |
| `<participant>`, `<domain>` | Your participant and the domain of your connector's host names | `acme`, `example.org` |

## What you need

- Your organisation [registered](join.md), with its own [connector](deploy_connector.md#become-a-provider), including the gateway (APISIX) and the verifier.
- The web application deployed next to the connector, reachable by its gateway but not published directly.
- The application must work **under a path prefix**, `/<service>/`: use relative URLs in its pages and calls.

## Steps

### 1. Choose a role for the service

In your Keycloak, add a role `<service>_user` to the client of the data space roles, `roles-dataspace`. It goes into the `ServiceCredential` of the people who use the service, and the verifier only lets them in if their credential carries it.

Every organisation that buys the service creates the same role in its own Keycloak and gives it **only to the people who will use it**: a credential with other data space roles is rejected (see [If something fails](#if-something-fails)).

### 2. Put the application behind the gateway

Add these routes to your APISIX. The first one does the login and the policy check; the second sends the bare prefix to the app.

```yaml
- uri: /<service>/*
  host: <public host of the service>
  upstream:
    nodes:
      <app service>:<port>: 1
    type: roundrobin
  plugins:
    openid-connect:           # login with the wallet, through your verifier
      client_id: service-id
      client_secret: unused
      discovery: http://verifier:3000/services/service-id/.well-known/openid-configuration
      bearer_only: false      # without a session, send the visitor to the QR login
      scope: operator
      redirect_uri: https://<public host of the service>/<service>/callback
      logout_path: /<service>/logout
      set_access_token_header: true
      access_token_in_authorization_header: true
      session:
        secret: <a long random secret>   # encrypts the session cookie
    opa:                      # the ODRL policy of the purchase, on every request
      host: "http://localhost:8181"
      policy: policy/main
      with_body: false
    proxy-rewrite:            # the app receives the paths without the prefix
      regex_uri: ["^/<service>/(.*)", "/$1"]

- uri: /<service>
  host: <public host of the service>
  plugins:
    redirect: { uri: /<service>/ }
```

Point the public host name of the service to your APISIX, not to the app. Several services of your organisation can share one host name, each under its own prefix.

### 3. Create the offer

As in [Publish a dataset](publish_dataset.md#3-create-the-offer-in-the-marketplace), with these two characteristics.

**Verifier policy**: which credential is accepted after a purchase, and with which role:

```json
{
  "name": "Verifier policy",
  "valueType": "credentialsConfiguration",
  "productSpecCharacteristicValue": [{
    "isDefault": true,
    "value": [{
      "credentialsType": "ServiceCredential",
      "claims": [{
        "name": "roles",
        "path": "$.roles[?(@.target==\"roles-dataspace\")].names[*]",
        "allowedValues": ["<service>_user"]
      }]
    }]
  }]
}
```

**ODRL policy**: what the buyer's people may reach, here everything under `/<service>`:

```json
{
  "name": "ODRL policy",
  "valueType": "authorizationPolicy",
  "productSpecCharacteristicValue": [{
    "isDefault": true,
    "value": [{
      "@context": {
        "odrl": "http://www.w3.org/ns/odrl/2/",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "vc": "https://www.w3.org/2018/credentials#",
        "http": "https://github.com/SEAMWARE/odrl-pap/http#"
      },
      "@id": "https://<participant>.<domain>/policy/<service>-access",
      "odrl:uid": "https://<participant>.<domain>/policy/<service>-access",
      "@type": "odrl:Policy",
      "odrl:permission": [{
        "odrl:assigner": "did:web:<participant>.<domain>",
        "odrl:action": "odrl:use",
        "odrl:target": {
          "@type": "odrl:AssetCollection",
          "odrl:source": "urn:asset",
          "odrl:refinement": {
            "@type": "odrl:Constraint",
            "odrl:leftOperand": "http:path",
            "odrl:operator": "http:isInPath",
            "odrl:rightOperand": { "@value": "/<service>", "@type": "xsd:string" }
          }
        },
        "odrl:assignee": {
          "@type": "odrl:PartyCollection",
          "odrl:source": "urn:user",
          "odrl:refinement": {
            "@type": "odrl:LogicalConstraint",
            "odrl:and": [
              { "@type": "odrl:Constraint", "odrl:leftOperand": "vc:role", "odrl:operator": "odrl:hasPart",
                "odrl:rightOperand": { "@value": "<service>_user", "@type": "xsd:string" } },
              { "@type": "odrl:Constraint", "odrl:leftOperand": "vc:type", "odrl:operator": "odrl:hasPart",
                "odrl:rightOperand": { "@value": "ServiceCredential", "@type": "xsd:string" } }
            ]
          }
        }
      }]
    }]
  }]
}
```

Give the offer the category that fits, such as *AI services*, and a screenshot as its image.

The policy works by path, not by host name: that is why the service lives under its own prefix, and why the policy gives no access to anything else in your gateway.

!!! example "A real one: the MIAIS"

    The [MIAIS](../miais/index.md#offer-it-as-a-service) of VRAIN-UPV is published this way: `<service>` is `waste-collection`, the role is `waste_collection_user`, and it lives at `https://apps-vrain.citcom-vrain-dataspace.eu/waste-collection/`.

## Check that it works

1. A test organisation buys the service and gives the role `<service>_user` to a test user, with the `ServiceCredential` bound to that user.
2. The test user [puts the credential in a wallet](wallet.md), opens `https://<public host of the service>/<service>/`, scans the QR code and shares the credential.
3. The service opens. A user of an organisation that did not buy it is rejected at the QR login.

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| The login loops or the app loads without styles | The app uses absolute URLs | Use relative URLs so everything stays under the prefix |
| The verifier rejects a user of a buying organisation | The user's credential carries more data space roles than the purchase allows | Give the user only the service role |
| *You have no verifiable credentials yet* for the user | The `ServiceCredential` is not bound to the user | Bind the credential to the user in Keycloak, not only the role |
| `403` after a successful login | The ODRL policy does not match the path or the role | Check the path prefix and the role in the policy |
