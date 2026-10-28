---
title: Get a wallet and your credentials
---

# Get a wallet and your credentials

**What you will get**: a wallet with a verifiable credential of your organisation, to log in to the marketplace or to a service of the data space by scanning a QR code.

## What you need

- A user in the identity server (Keycloak) of your organisation's connector, with the credential assigned. Your organisation's administrator creates it.
- One of these wallets:

=== "Phone: Lissi ID Wallet"

    [Lissi ID Wallet](https://www.lissi.id/), from the Play Store. Scan the QR codes with the phone.

=== "Desktop: atesta-id-wallet"

    [atesta-id-wallet](https://github.com/CitComAI-Hub/atesta-id-wallet), a desktop wallet for Linux and Windows made in CitCom. Download it from its [releases page](https://github.com/CitComAI-Hub/atesta-id-wallet/releases). It reads the QR codes from a screenshot, so you never need a phone.

## Which credential

| Credential | You need it to | Who gives it to you |
|---|---|---|
| `LegalPersonCredential` | Act for your organisation in the marketplace: profile, offers, purchases | Your organisation, if you are its legal representative (LEAR) |
| `ServiceCredential` | Use a web service bought by your organisation, such as the MIAIS | Your organisation, with the role that the service asks for |

Programs do not use a wallet: they request a `MachineCredential` by themselves. See [Use data from your code](consume_data.md).

## Steps

1. Open the account console of your organisation's Keycloak: `https://keycloak-<participant>.citcom-vrain-dataspace.eu/realms/provider/account`, and log in with your user.
2. Go to **Verifiable Credentials** and choose the credential.
3. Click **Issue to wallet**. A QR code (or a link) appears.
4. Scan it with the wallet:
    - **Lissi**: scan the QR with the phone.
    - **atesta-id-wallet**: click the link, or press **Scan QR** and take a screenshot of the QR code.
5. The wallet shows who issues which credential. Accept, and enter your Keycloak user and password when the wallet asks for them.
6. The credential appears in the wallet.

## Check that it works

Open the [marketplace](https://marketplace.citcom-vrain-dataspace.eu) and click **Log in**. Scan the QR code with the wallet. It shows what will be shared; press **Share**. The browser logs you in.

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| *You have no verifiable credentials yet* in the account console | The credential is not bound to your user. Having the role is not enough | Ask your administrator to bind the credential to your user |
| The wallet rejects the offer, or the QR has expired | Offers are short-lived | Click **Issue to wallet** again |
| The verifier rejects the login | Your organisation is not trusted for this credential, or your roles do not match | For the marketplace, your organisation must be [registered](join.md). For a service, it must have bought it, and you must have only the role it asks for |
| A service rejects a credential that has several roles | The verifier requires every data space role in the credential to be allowed by the purchase | Use a user with only the role of that service |

**Next**: [Join the data space](join.md) or open a service your organisation has bought.
