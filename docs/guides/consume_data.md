---
title: Use data from your code
description: "Buy an offer and read the data from Python with ds-consumer-auth and FiLiP."
---

# Use data from your code

**What you will get**: a Python program that reads the data of another organisation through its connector, with your organisation's `MachineCredential`. The example reads the waste containers of the Ajuntament de València.

## What you need

- Your organisation [registered](join.md) in the data space.
- A **machine user** in your organisation's Keycloak, with the `MachineCredential` bound to it and only the role that the offer asks for (`clearence1` for the Valencia datasets).
- Python 3.10 or later.

## Steps

### 1. Buy the offer

The LEAR of your organisation logs in to the [marketplace](https://marketplace.citcom-vrain-dataspace.eu), opens the offer (for example *Waste containers* of the Ajuntament de València) and buys it. When the order is completed, the provider's connector trusts your organisation's `MachineCredential` and loads the access policy of the offer.

### 2. Install the libraries

```bash
pip install "ds-consumer-auth @ git+https://github.com/CitComAI-Hub/ds-consumer-auth@v0.1.0" filip
```

[ds-consumer-auth](../toolbox/ds_consumer_auth.md) gets the credential and the access token, and renews them. [FiLiP](../toolbox/ngsi_ld.md) is the NGSI-LD client.

### 3. Configure

```bash
# your organisation: who you are
export DS_ISSUER_URL="https://keycloak-<your participant>.citcom-vrain-dataspace.eu/realms/provider"
export DS_USERNAME="<machine user>"
export DS_PASSWORD="<its password>"
# the provider: who you ask
export DS_VERIFIER_URL="https://verifier-townhall-vlc.citcom-vrain-dataspace.eu/services/machine-id"
export DS_SCOPE="operator1"
```

### 4. Read the data

```python title="read_containers.py"
from filip.clients.ngsi_ld.cb import ContextBrokerLDClient
from filip.models.base import FiwareLDHeader
from ds_consumer_auth import data_space_session

cb = ContextBrokerLDClient(
    url="https://apisix-townhall-vlc.citcom-vrain-dataspace.eu/lepus",
    session=data_space_session(),  # adds the data space token to every request
    fiware_header=FiwareLDHeader(),
    create_tenant=False,
)
for container in cb.get_entity_list(entity_type="WasteContainer", limit=10):
    print(container.id, container.model_dump().get("fillingLevel"))
```

Each Valencia dataset has its own path and entity type; see the [Valencia node](../valencia/index.md#data-in-the-data-space).

## Check that it works

From the shell, the `ds-token` command of the library prints an access token:

```bash
curl -s -H "Authorization: Bearer $(ds-token)" -H "Accept: application/ld+json" \
  "https://apisix-townhall-vlc.citcom-vrain-dataspace.eu/lepus/ngsi-ld/v1/entities?type=WasteContainer&limit=1"
```

It returns one `WasteContainer` entity in JSON-LD.

## If something fails

| Symptom | Cause | Fix |
|---|---|---|
| `login: request failed (HTTP 401)` | Wrong machine user or password | Check them in your Keycloak |
| `vp_token: the verifier rejected the credential (HTTP 400: {})` | Your organisation is not trusted by the provider for `MachineCredential`: the offer was not bought, or the order is not completed. Or your machine user has a role the offer does not allow | Buy the offer and wait for the order to complete; leave only the offer's role on the machine user |
| `401` from the provider's gateway | A token for another verifier service, or the wrong scope | Check `DS_VERIFIER_URL` and `DS_SCOPE` |
| `403` from the provider's gateway | The token is valid, but no purchased policy allows this request | Check that the path and the entity type are those of an offer you bought |
