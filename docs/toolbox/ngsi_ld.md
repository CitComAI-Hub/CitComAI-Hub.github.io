---
title: NGSI-LD and FiLiP
description: "The NGSI-LD calls you need most, and FiLiP to make them from Python."
---

# NGSI-LD and FiLiP

**NGSI-LD** is the API of [MIM1](../getting_started/interoperability.md#mims): an ETSI standard to read, write and subscribe to data about real-world entities. Every entity has an `id`, a `type` and attributes, and a JSON-LD `@context` that gives the attributes their meaning, usually from [Smart Data Models](smart_data_models.md).

## The calls you need most

| Call | Does |
|---|---|
| `GET /ngsi-ld/v1/entities?type=WasteContainer&limit=100` | List entities of a type |
| `GET /ngsi-ld/v1/entities?type=WasteContainer&q=fillingLevel>0.8` | Filter by attribute |
| `GET /ngsi-ld/v1/entities/{id}` | One entity |
| `…&options=keyValues` | Only the values, without the NGSI-LD structure |
| `POST /ngsi-ld/v1/entityOperations/upsert` | Create or update several entities |
| `POST /ngsi-ld/v1/subscriptions` | Be notified of changes |

Send `Accept: application/ld+json` to get the `@context` inside the body.

## FiLiP

[FiLiP](https://github.com/RWTH-EBC/FiLiP) (FIWARE Library for Python), by RWTH Aachen, is a Python client for FIWARE APIs, NGSI-LD included, with Pydantic models for the entities. CitCom uses it in the [MIAIS](../miais/index.md).

```bash
pip install filip
```

=== "Local broker (level 1)"

    ```python
    from filip.clients.ngsi_ld.cb import ContextBrokerLDClient
    from filip.models.base import FiwareLDHeader

    cb = ContextBrokerLDClient(url="http://localhost:1026", fiware_header=FiwareLDHeader())
    containers = cb.get_entity_list(entity_type="WasteContainer", limit=100)
    ```

=== "Data space (level 2)"

    ```python
    from filip.clients.ngsi_ld.cb import ContextBrokerLDClient
    from filip.models.base import FiwareLDHeader
    from ds_consumer_auth import data_space_session

    cb = ContextBrokerLDClient(
        url="https://apisix-townhall-vlc.citcom-vrain-dataspace.eu/lepus",
        session=data_space_session(),  # see ds-consumer-auth
        fiware_header=FiwareLDHeader(),
        create_tenant=False,
    )
    containers = cb.get_entity_list(entity_type="WasteContainer", limit=100)
    ```

The code is the same at both levels; only the session changes. See [ds-consumer-auth](ds_consumer_auth.md).

## Brokers

| Broker | Notes |
|---|---|
| [Orion-LD](https://github.com/FIWARE/context.Orion-LD) | FIWARE, MongoDB. Used in Valencia for the traffic state |
| [Scorpio](https://github.com/ScorpioBroker/ScorpioBroker) | NEC, PostgreSQL. Comes with the FIWARE Data Space Connector |
| [Lepus](lepus.md) | Not a broker: serves an NGSI-v2 broker as NGSI-LD |

!!! tip "Learn more"

    - The [NGSI-LD specification](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.08.01_60/gs_cim009v010801p.pdf) (ETSI GS CIM 009).
    - The FIWARE [NGSI-LD step-by-step tutorials](https://ngsi-ld-tutorials.readthedocs.io/).
