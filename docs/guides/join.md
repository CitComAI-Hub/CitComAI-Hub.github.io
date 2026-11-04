---
title: Join the data space
description: "Register your organisation in the onboarding portal, so that the other participants trust it."
next_step:
  url: guides/wallet/
  title: "Get a wallet and your credentials"
  description: "Get atesta-id-wallet or Lissi and the credential you need to log in."
---

# Join the data space

**What you will get**: your organisation registered in the CitCom FIWARE data space. The other participants trust the credentials it issues, and its legal representative can log in to the marketplace to buy offers.

## Two ways to get your organisation's identity

Your organisation needs a **credential issuer**: the service that issues the credentials of its people and programs. The legal representative logs in to the marketplace with a `LegalPersonCredential`, and your programs read data with a `MachineCredential`.

| | A. The portal creates it | B. Your own connector |
|---|---|---|
| What you deploy | Nothing | A consumer connector: Keycloak and did-helper |
| Your identity | A realm of your own in the Keycloak of the onboarding portal, with a new DID | Your connector's DID, on your domain |
| Who manages your users | You, in the admin console of your realm | You, in your Keycloak |
| Log in to the marketplace and buy | Yes | Yes |
| Your programs read the data you bought | Yes | Yes |
| Best for | Almost everyone: join, buy and read data without deploying anything | Running your own infrastructure, or becoming a provider |

Choose **A** unless you need B. With B, [deploy your connector](deploy_connector.md) first: you register with its DID.

## What you need

- The **legal representative** (LEAR) of the organisation, who acts for it and signs the participation agreement, with an email address.
- With option B: the DID of your connector, for example `did:web:did.example.org`, with its document reachable at `https://did.example.org/.well-known/did.json`.

## Steps

### 1. Fill in the registration form

Open the [onboarding portal](https://onboarding.citcom-vrain-dataspace.eu) and start a new registration. Fill in the legal data of the organisation and the contact of its representative.

### 2. Digital identity

In the **Digital identity** section of the form:

- **Option A**: leave the `did:web` field **empty**. The portal will create your identity when the registration is approved.
- **Option B**: enter the DID of your connector.

### 3. Sign the participation agreement

Download the participation agreement from the form, have the LEAR sign it, and upload the signed copy. Submit the registration.

### 4. Wait for the approval

The data space operator reviews the request. When it approves it, the portal **registers your organisation in the trust anchor** automatically. From that moment the credentials your organisation issues are trusted in the data space. You can follow the status of the request in the portal.

With option A, the approval also creates your realm in the Keycloak of the onboarding portal, with your new DID (`did:web:onboarding.citcom-vrain-dataspace.eu:<your realm>`). You receive an **email** with a link to set the password of its administrator, the user `admin`, and the address of its admin console: `https://keycloak-onboarding.citcom-vrain-dataspace.eu/admin/<your realm>/console/`.

### 5. Create the user of the legal representative

In the admin console of your Keycloak (the realm created by the portal with option A, your own one with option B):

1. Create a user for the LEAR, with email, first name and last name, and set its password.
2. Let it receive the `LegalPersonCredential`:
    - **Option A**: nothing to do. Every new user of the realm joins the group `representative`, which lets it log in to the marketplace.
    - **Option B**: follow [Create the users](deploy_connector.md#5-create-the-users) of the connector guide.

Create the users for your programs later, when you need them: see [Use data from your code](consume_data.md#2-create-a-user-for-your-program).

### 6. Get the credential and log in to the marketplace

Follow [Get a wallet and your credentials](wallet.md) to put the `LegalPersonCredential` in the LEAR's wallet. Then open the [marketplace](https://marketplace.citcom-vrain-dataspace.eu), click **Log in** and scan the QR code with the wallet. The first login creates your organisation in the marketplace.

### 7. Complete the profile

In the marketplace, complete the profile of your organisation: trading name, website, country and a short description, in English.

## Check that it works

- After logging in, the marketplace shows the name of your organisation.
- The LEAR can open any offer and sees the button to buy it.

## Next

- To read data from your code: [Use data from your code](consume_data.md).
- To offer your own data later, you need your own connector with the provider components: see [Become a provider](deploy_connector.md#become-a-provider).

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| The marketplace rejects the LEAR's login | The registration is not approved yet, or the credential is not a `LegalPersonCredential` of your organisation | Check the status in the portal and the credential in the wallet |
| A registration with your own DID is not approved | The operator cannot resolve your DID | Open `https://<your DID host>/.well-known/did.json` from outside your network: it must return your DID document |
| *You have no verifiable credentials yet* in the account console | The credential is not assigned to the user | Repeat step 5 for that user |
| No email after the approval (option A) | The message went to spam, or the address in the form is wrong | Check the spam folder; otherwise contact the operator through the portal |
| The marketplace home is empty and the browser console shows `401` on `/catalog/…` | An expired session in the browser | Log out, or delete the marketplace cookies |
