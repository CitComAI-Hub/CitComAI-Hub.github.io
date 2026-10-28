---
title: Join the data space
---

# Join the data space

**What you will get**: your organisation registered in the CitCom FIWARE data space, trusted by the other participants, and with its profile in the marketplace.

!!! warning "To be checked"

    The screens of the onboarding portal may differ from these steps. Report any difference in the [repository](https://github.com/CitComAI-Hub/CitComAI-Hub.github.io/issues).

## What you need

- The legal representative (LEAR) of the organisation, who will act for it.
- A decentralised identifier (DID) for the organisation. If you run a [connector](deploy_connector.md), it already has one (`did:web:<participant>.<domain>`). If not, the onboarding portal can create one.
- A [wallet](wallet.md) for the LEAR.

=== "Consumer only"

    To buy and use offers you do not need your own connector, but your programs and people need credentials issued by your organisation. Talk to the data space operator about the options.

=== "Provider"

    To publish data or services you need your own connector, which serves them and applies the contracts. See [Deploy your own connector](deploy_connector.md).

## Steps

1. **Register the organisation** in the [onboarding portal](https://onboarding.citcom-vrain-dataspace.eu): its legal data and its DID.
2. **Sign the participation agreement** that the portal offers to download, and upload the signed copy.
3. **Wait for approval.** The operator reviews the request and adds the organisation's DID to the trust anchor. From that moment, the credentials it issues are accepted in the data space.
4. **Log in to the [marketplace](https://marketplace.citcom-vrain-dataspace.eu)** with the LEAR's wallet and its `LegalPersonCredential`.
5. **Complete the organisation's profile**: trading name, website, country and a short description, in English.
6. **Providers only: set the contract management address** of your connector in the profile (`https://contract-management-<participant>.<domain>`, client ID `contract-management`). Without it, purchases of your offers never reach your connector.

## Check that it works

- In the marketplace, the organisation's profile shows its name and description.
- A provider can create a catalogue in **My offerings**.

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| The marketplace rejects the LEAR's login | The organisation is not in the trust anchor yet, or the credential is not a `LegalPersonCredential` | Wait for the approval; check the credential in the wallet |
| The marketplace home is empty and the browser console shows `401` on `/catalog/…` | An expired session in the browser | Log out, or delete the marketplace cookies |
| A purchase of your offer completes but the buyer is still rejected | The contract management address is missing or wrong in your profile | Fix it in the profile, then ask the buyer to repeat the purchase |

**Next**: [Use data from your code](consume_data.md) or [Publish a dataset](publish_dataset.md).
