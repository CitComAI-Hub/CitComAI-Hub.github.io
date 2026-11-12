---
title: Publish a web service
description: "Offer a web app that people open with their wallet, with the offer wizard."
---

# Publish a web service

**What you will get**: a web application offered in the marketplace. People from the organisations that buy it open it with their wallet; you write no login code. Your connector's gateway does the login and checks the purchase on every request.

You put the application behind your gateway, then publish it from the marketplace with the **offer wizard**. Its access policies and its terms of use come from the [rulebook](../data_spaces/rulebook.md) (class `service-access`), so you write no policy and no legal text.

In this guide, replace:

| Placeholder | What it is | Example |
|---|---|---|
| `<service>` | A short name for your service: its path prefix | `route-planner` |
| `<service>_user` | The role that the people who use it carry; the wizard proposes it from the short name | `route_planner_user` |

## What you need

- Your organisation [registered](join.md), with its own [connector](deploy_connector.md#become-a-provider), including the gateway (APISIX) and the verifier.
- Your organisation **enabled as a provider**: before your first offer, the data space operator reviews your connector once (rulebook R8.7). Ask the operator.
- The web application deployed next to the connector, reachable by its gateway but not published directly.
- The application must work **under a path prefix**, `/<service>/`: use relative URLs in its pages and calls.

## Steps

### 1. Put the application behind the gateway

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
    opa:                      # the access policy of the purchase, on every request
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

The rulebook also asks for a request limit per buying organisation on the route, **600 requests per minute** (APISIX `limit-count`, counted per issuer of the buyer's credential; a web page makes many requests), and that the gateway removes the `X-Stripped-Path` header that the browser sends.

### 2. Publish it with the offer wizard

Log in to the [marketplace](https://marketplace.citcom-vrain-dataspace.eu) with the wallet of your organisation's legal representative, acting as your organisation. In **My offerings**, create a catalogue if you have none, then in **Offers** press **New offer** and choose **Service**:

1. **The offer**: title, description, short name (`<service>`), path (`/<service>`, proposed from the short name), the role of its users (`<service>_user`, proposed too) and a screenshot as its image.
2. **Catalogue and categories**, such as *AI services*.
3. **Terms of use**: about this service (its name in the terms, what it produces, where its data comes from, what users can expect, and optional notes on fair use, availability and data protection) and about your organisation (remembered for your next offers).
4. **Preview the offer**, then **Publish the offer**.

The access policy works by path, not by host name: that is why the service lives under its own prefix, and why the policy gives no access to anything else in your gateway.

If your organisation already offers other services, a person may hold the roles of several of them, and the verifier rejects a credential that carries a role the purchase does not allow. The wizard takes care of it: when a new service adds a role, it updates your earlier service offers to accept it too, and the preview says so.

!!! example "A real one: the MIAIS"

    The [MIAIS](../miais/index.md#offer-it-as-a-service) of VRAIN-UPV is offered this way: short name and path `waste-collection`, role `waste_collection_user`, at `https://apps-vrain.citcom-vrain-dataspace.eu/waste-collection/`.

## Check that it works

1. A test organisation buys the service, creates the role `<service>_user` in its own Keycloak (client `roles-dataspace`) and gives it to a test user, with the `ServiceCredential` bound to that user.
2. The test user [puts the credential in a wallet](wallet.md), opens `https://<public host of the service>/<service>/`, scans the QR code and shares the credential.
3. The service opens. A user of an organisation that did not buy it is rejected at the QR login.

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| The wizard says *Act on behalf of your organisation*, *Only providers can create offers* or *Only organisations with their own connector* | You are not acting as an organisation enabled as a provider, with its own `did:web` | Switch to your organisation in the user menu, or ask the data space operator |
| *Not generated from the CitCom rulebook: …* | The specification or the offer was edited by hand | Create the offer again with the wizard |
| The login loops or the app loads without styles | The app uses absolute URLs | Use relative URLs so everything stays under the prefix |
| The verifier rejects a user of a buying organisation | The user's credential carries more data space roles than the purchase allows | Give the user only the service role |
| *You have no verifiable credentials yet* for the user | The `ServiceCredential` is not bound to the user | Bind the credential to the user in Keycloak, not only the role |
| `403` after a successful login | The path in the offer does not match the route | Check that the route prefix is the path of the offer |
