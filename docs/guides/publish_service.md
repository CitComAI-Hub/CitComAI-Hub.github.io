---
title: Publish a web service
description: "Offer a web app that people open with their wallet."
---

# Publish a web service

**What you will get**: a web application offered in the marketplace. People from the organisations that buy it open it with their wallet; you write no login code. The [MIAIS](../miais/index.md#offer-it-as-a-service) is published this way.

## What you need

- Your organisation [registered](join.md), with its own [connector](deploy_connector.md).
- The web application deployed next to the connector, reachable by its gateway (APISIX) but not published directly.
- The application must work **under a path prefix** (for example `/waste-collection/`): use relative URLs in its pages and calls.

## Steps

### 1. Choose a role for the service

Create a role for the service in your Keycloak, in the client of the data space roles (`roles-dataspace`), for example `waste_collection_user`. This role goes into the `ServiceCredential` of the people who use the service. Every organisation that buys the service creates the same role in its own Keycloak and gives it **only to the people who will use it**.

### 2. Put the application behind the gateway

Add a route to your APISIX for the prefix, `/waste-collection/*`, with:

- the **`openid-connect`** plugin with `bearer_only: false`, pointing to your verifier's `service-id` service: a visitor without a session is sent to the verifier's QR login, and after it, APISIX keeps an encrypted session cookie;
- the **`opa`** plugin, so the policy engine checks the token on every request, as on the data routes.

Point the public host name of the service to your APISIX, and redirect `/` to the prefix.

### 3. Create the offer

As in [Publish a dataset](publish_dataset.md#3-create-the-offer-in-the-marketplace), with:

- the verifier policy for `ServiceCredential` and your role (`allowedValues: ["waste_collection_user"]`);
- an ODRL policy for the path `/waste-collection`, with `vc:type` `ServiceCredential` and `vc:role` your role;
- the category *AI services*, and a screenshot as the image.

The policy works by path, not by host name: that is why the service lives under its own prefix, and why the policy does not give access to anything else in your gateway.

## Check that it works

1. A test organisation buys the service and gives the role to a test user, with the `ServiceCredential` bound to that user.
2. The test user [puts the credential in a wallet](wallet.md), opens the service URL, scans the QR code and shares the credential.
3. The service opens. A user of an organisation that did not buy it is rejected at the QR login.

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| The login loops or the app loads without styles | The app uses absolute URLs | Use relative URLs so everything stays under the prefix |
| The verifier rejects a user of a buying organisation | The user's credential carries more data space roles than the purchase allows | Give the user only the service role |
| *You have no verifiable credentials yet* for the user | The `ServiceCredential` is not bound to the user | Bind the credential to the user in Keycloak, not only the role |
| `403` after a successful login | The ODRL policy does not match the path or the role | Check the path prefix and the role in the policy |
