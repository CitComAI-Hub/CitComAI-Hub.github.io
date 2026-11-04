---
title: Wallets
description: "Lissi ID Wallet and atesta-id-wallet."
---

# Wallets

A wallet keeps your verifiable credentials and presents them when you log in, by scanning a QR code. In CitCom you need one to log in to the [marketplace](https://marketplace.citcom-vrain-dataspace.eu) and to the web services of the data space, such as the [MIAIS](../miais/index.md).

Both wallets below work with the CitCom data space: they receive credentials with OpenID4VCI and present them with OpenID4VP, in SD-JWT format (`dc+sd-jwt`).

<div class="grid cards" markdown>

-   :material-cellphone:{ .lg .middle } __Lissi ID Wallet__

    ---

    A mobile wallet for Android, from the Play Store. Scan the QR codes with the phone.

    [:octicons-arrow-right-24: lissi.id](https://www.lissi.id/)

-   :material-laptop:{ .lg .middle } __atesta-id-wallet__

    ---

    A desktop wallet for Linux and Windows, made in CitCom. It reads the QR codes from a screenshot, so you do not need a phone. Also a command line tool.

    [:octicons-arrow-right-24: atesta-id-wallet](https://github.com/CitComAI-Hub/atesta-id-wallet)

</div>

## atesta-id-wallet

[atesta-id-wallet](https://github.com/CitComAI-Hub/atesta-id-wallet) is a desktop wallet made in CitCom, in English, Spanish and Danish. Install it from the [releases page](https://github.com/CitComAI-Hub/atesta-id-wallet/releases): a Windows installer, a `.deb` for Debian and Ubuntu, or an AppImage for any Linux.

- **Add a credential**: in your Keycloak account, *Verifiable Credentials → Issue to wallet*. Click the link, or press **Scan QR** and take a screenshot of the QR code.
- **Log in**: click the login link, or press **Scan QR** and take a screenshot. Before sending anything, the wallet shows who is asking, where the data goes and which claims it will disclose. Nothing is sent until you press **Share**.

### Limitations

!!! warning "Uses the EUDI protocols, but it is not a certified EUDI Wallet"

    atesta-id-wallet uses the protocols of the European Digital Identity (EUDI) wallets: OpenID4VCI, OpenID4VP and SD-JWT VC. It is **not** a certified EUDI Wallet under eIDAS 2.0. That would need a provider notified by a Member State, certification at assurance level *high*, with a secure hardware key store, and wallet attestations, which are out of scope for this prototype.

- **Prototype** (TRL 5), tested against Keycloak and the CitCom marketplace. Linux is the tested platform; the Windows builds are new and not yet tested by hand, and macOS is untested.
- **Software keys**: the keys are kept encrypted on disk, not in a TPM or a secure element.
- **One holder key per profile**: verifiers can correlate the presentations made with the same profile.
- **SD-JWT VC only** (`dc+sd-jwt`, `vc+sd-jwt`): no `jwt_vc_json`, no mdoc, no deferred issuance.
- **Verifiers identified by X.509 certificates**: verifiers identified by a DID, verifier attestations or OpenID Federation are not supported.
- **No revocation check** of the credentials (Token Status List).

Read its [security model](https://github.com/CitComAI-Hub/atesta-id-wallet/blob/main/docs/SECURITY.md) before using it with real personal data.

## Step by step

The guide [Get a wallet and your credentials](../guides/wallet.md) covers which credential you need, how to get it and the usual errors.
