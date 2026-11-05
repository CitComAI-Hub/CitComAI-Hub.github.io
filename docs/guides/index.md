---
title: Guides
description: "One guide per task, in order: join, get a wallet, use data, deploy a connector, publish a dataset or a service."
---

# Guides

Build on the [CitCom.ai Data Space](../data_spaces/index.md), in the order you will need each step. Every organisation starts the same way: join, get a wallet, and read the data it buys. To offer data or services of your own, deploy your own connector and publish. Each guide covers one task from start to finish, with the same structure: what you will get, what you need, the steps, how to check that it works and what to do if it does not.

| Guide | For | You end up with |
|---|---|---|
| [Join the data space](join.md) | The legal representative (LEAR) of an organisation | Your organisation registered and trusted, able to buy and read data |
| [Get a wallet and your credentials](wallet.md) | Anyone | A wallet with your credential, ready to log in |
| [Use data from your code](consume_data.md) | Developers of a consumer | A program that reads another organisation's data |
| [Deploy your own connector](deploy_connector.md) | Providers, and operators who want their own infrastructure | A connector that issues your organisation's credentials and serves its data |
| [Publish a dataset](publish_dataset.md) | Data providers | An offer in the marketplace that others can buy |
| [Publish a web service](publish_service.md) | Service providers | A web app that people from other organisations open with their wallet |

```mermaid
flowchart LR
    J["Join"] --> W["Get a wallet"]
    W --> C["Use data"]
    W -.-> D["Deploy your connector<br/>(providers)"]
    D --> P["Publish a dataset"]
    D --> S["Publish a service"]
```

!!! tip "To read data as soon as possible"

    Follow the first three guides. Nothing to deploy: the onboarding portal gives your organisation everything it needs.

Two worked examples put the guides together: [MIAIS](../miais/index.md), an AI service that goes from a custom integration to a data space service, and [Valencia](../valencia/index.md), a city that offers its existing platform as a data provider.

!!! tip "New to data spaces?"

    Read [Data spaces in 5 minutes](../getting_started/data_spaces.md) first. The guides use its vocabulary: participant, connector, credential, offer and policy.
