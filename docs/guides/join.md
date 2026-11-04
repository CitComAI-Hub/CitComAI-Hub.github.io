---
title: Join the data space
description: "Register your organisation in the onboarding portal, so that the other participants trust it."
---

# Join the data space

**What you will get**: your organisation registered in the CitCom FIWARE data space. The other participants trust the credentials it issues, and its legal representative can log in to the marketplace to buy offers.

## Before you start: how will your programs read data?

Joining is the same for everyone. What you can do afterwards depends on **who issues the credentials of your organisation**. Logging in to the marketplace needs a `LegalPersonCredential`; reading data from code needs a `MachineCredential`. Your organisation issues both, so it needs a credential issuer.

| Option | What you deploy | Buy in the marketplace | Programs read data | Status |
|---|---|---|---|---|
| **A. Shared consumer connector** | Nothing | Yes | Yes | In preparation |
| **B. Your own connector** | A small consumer connector: Keycloak and did-helper | Yes | Yes | Available: [Deploy your own connector](deploy_connector.md) |
| **C. Identity from the portal only** | Nothing | Yes | No | Available |

!!! info "Option A is on its way"

    CitCom is preparing a shared connector that issues credentials for organisations that do not want to run their own. Until it is ready, reading data from code needs option B. To explore the marketplace first, start with option C: you can move to A or B later.

With option B, deploy your connector **before** registering: you register with its DID.

## What you need

- The **legal representative** (LEAR) of the organisation, who acts for it and signs the participation agreement.
- With option B: the DID of your connector, for example `did:web:did.example.org`, with its document reachable at `https://did.example.org/.well-known/did.json`.

## Steps

### 1. Fill in the registration form

Open the [onboarding portal](https://onboarding.citcom-vrain-dataspace.eu) and start a new registration. Fill in the legal data of the organisation and the contact of its representative.

- **Option B**: enter the DID of your connector.
- **Option C**: leave the DID empty; the portal creates one for you.

### 2. Sign the participation agreement

Download the participation agreement from the form, have the LEAR sign it, and upload the signed copy. Submit the registration.

### 3. Wait for the approval

The data space operator reviews the request. When it approves it, the portal **registers your DID in the trust anchor** automatically. From that moment the credentials your organisation issues are trusted in the data space. You can follow the status of the request in the portal.

With option C, the approval also creates your credential issuer: a realm of its own in the Keycloak of the onboarding portal, with a new DID (`did:web:onboarding.citcom-vrain-dataspace.eu:<your realm>`). The link to its admin console appears in your registration in the portal.

### 4. Create the user of the legal representative

In the admin console of your Keycloak (your own one with option B, the realm from the portal with option C):

1. Create a user for the LEAR, with email, first name and last name, and set its password.
2. Let it receive the `LegalPersonCredential`:
    - **Option B**: follow [Create the users](deploy_connector.md#5-create-the-users) of the connector guide.
    - **Option C**: give it the realm role `consumer`.

### 5. Get the credential and log in to the marketplace

Follow [Get a wallet and your credentials](wallet.md) to put the `LegalPersonCredential` in the LEAR's wallet. Then open the [marketplace](https://marketplace.citcom-vrain-dataspace.eu), click **Log in** and scan the QR code with the wallet. The first login creates your organisation in the marketplace.

### 6. Complete the profile

In the marketplace, complete the profile of your organisation: trading name, website, country and a short description, in English.

## Check that it works

- After logging in, the marketplace shows the name of your organisation.
- The LEAR can open any offer and sees the button to buy it.

## Next

- To read data from your code: [Use data from your code](consume_data.md).
- To offer your own data later, add the provider components to your connector: see [Become a provider](deploy_connector.md#become-a-provider).

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| The marketplace rejects the LEAR's login | The registration is not approved yet, or the credential is not a `LegalPersonCredential` of your organisation | Check the status in the portal and the credential in the wallet |
| A registration with your own DID is not approved | The operator cannot resolve your DID | Open `https://<your DID host>/.well-known/did.json` from outside your network: it must return your DID document |
| *You have no verifiable credentials yet* in the account console | The credential is not assigned to the user | Repeat step 4 for that user |
| The marketplace home is empty and the browser console shows `401` on `/catalog/…` | An expired session in the browser | Log out, or delete the marketplace cookies |
