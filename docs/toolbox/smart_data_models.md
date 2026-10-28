---
title: Smart Data Models
---

# Smart Data Models

[Smart Data Models](https://smartdatamodels.org/) is the shared vocabulary of [MIM2](../getting_started/interoperability.md#mims): open data models for smart cities, energy, environment, mobility and more, maintained by FIWARE, TM Forum, IUDX and OASC. A model fixes the entity type, the attribute names, their units and their meaning, and publishes a JSON-LD `@context` for NGSI-LD.

When two cities publish their waste containers as `WasteContainer`, a service written for one works with the other.

## Models used in CitCom

| Model | Subject | Used for |
|---|---|---|
| [`WasteContainer`](https://github.com/smart-data-models/dataModel.WasteManagement/tree/master/WasteContainer) | Waste management | Location and filling level of the containers of Valencia; read by the MIAIS |
| [`AirQualityObserved`](https://github.com/smart-data-models/dataModel.Environment/tree/master/AirQualityObserved) | Environment | Air quality stations of Valencia |
| [`TrafficFlowObserved`](https://github.com/smart-data-models/dataModel.Transportation/tree/master/TrafficFlowObserved) | Transportation | Traffic intensity of Valencia |
| `TrafficState` | — | Real-time state of the road segments of Valencia, as modelled by the VLCi platform |
| [`VehicleModel`](https://github.com/smart-data-models/dataModel.Transportation/tree/master/VehicleModel) | Transportation | The trucks of the MIAIS |

## Using a model

1. Search [smartdatamodels.org](https://smartdatamodels.org/) for your entity before creating your own.
2. Follow the model's `schema.json` for attribute names and types; the repository of each model has examples in NGSI-LD.
3. Reference the `@context` of the subject (for example `dataModel.WasteManagement`) in your NGSI-LD requests, or let [Lepus](lepus.md) add it.
4. If nothing fits, extend an existing model or [contribute a new one](https://github.com/smart-data-models/data-models).
