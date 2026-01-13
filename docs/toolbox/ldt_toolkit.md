---
title: LDT Toolkit
---

# LDT Toolkit

## LDT Demonstrator
The LDT Toolkit is not merely a collection of tools but a deployable demonstrator that integrates various open-source components to showcase advancements in interoperability, AI-readiness, and the practical implementation of Local Digital Twins (LDTs) in real-world scenarios.

### Introduction
In the context of task 3.2, and more precisely related to the gap analysis performed by the Luxembourg TEF site, an evolution of its electromobility Local Digital Twin (LDT) is planned. This effort will culminate in the development of an LDT demonstrator which will be made available to showcase advancements in interoperability and AI-readiness.

The development process will follow several iterations, each aimed at progressively extending the digital twin's capabilities. These iterations align with the three twin models described in the section "Project Iterations & Twin Capabilities": the Descriptive Twin, the Predictive Twin, and the Prospective Twin. Each model builds upon the previous one, enhancing the ability to monitor, predict, and simulate real-world assets effectively.

The LDT demonstrator will be built using open-source components, ensuring transparency, accessibility, and community-driven development. Furthermore, it will align with the key standards and interfaces outlined in the EU LDT Toolbox, such as NGSI-LD and Smart Data Models, to guarantee interoperability and compliance with European frameworks.

---

### Features

#### Real-Time Monitoring
- View live asset status, locations, and entity charts via the Mapbox React app.
- [Access Mapbox React App]()

#### Historical Dashboards
- Analyze historical data trends and insights using Grafana dashboards.
- [Access Grafana Dashboards]()

#### Analytical Tool
- Perform advanced analytics and reporting via Superset.
- [Access Superset Analytics]()

---

### Developer Resources

- **[Context Broker API Documentation](https://stellio.readthedocs.io/en/latest/)**: Access the NGSI-LD API documentation and OpenAPI spec for the Stellio Context Broker.
- **[Smart Data Models](https://smartdatamodels.org/)**: Browse the Smart Data Models library for standardized context information schemas.
- **[Source Code Repository](https://git.list.lu/citcom.ai_tef/ldt-demonstrator)**: Explore the source code for the demonstrator and related components.

---

### System Architecture

![System Architecture Diagram](img/ldt-demonstrator.svg)

The demonstrator integrates S3 and IoT data via Kafka, processes events through an IoT Agent, and manages context in Stellio Context Broker. All changes are published as Kafka events, feeding analytics and visualization tools.

---

### Technology Stack

#### Key Components

- **[Stellio Context Broker](https://stellio.readthedocs.io/en/latest/)**: NGSI-LD context management for smart cities.
- **[NGSI-LD](https://ngsi-ld.org)**: Next Generation Service Interfaces - Linked Data.
- **[Apache Kafka](https://kafka.apache.org/)**: Distributed event streaming platform.
- **[Redpanda](https://www.redpanda.com/connect)**: Pre-built connectors for event streaming.
- **[Mapbox](https://www.mapbox.com/)**: Geospatial mapping and visualization SDK.
- **[Grafana](https://grafana.com/)**: Open-source dashboards & analytics platform.
- **[Superset](https://superset.apache.org/)**: Open-source analytics & dashboarding framework.

---

### Project Iterations & Digital Twin Capabilities*

#### Iteration 1: Descriptive Twin
- Presents the current and historical state of the real-world asset, including both static and dynamic characteristics.
    <figure>
    <img src="../img/descriptive-twin.png"  width="350"/>
    <figcaption>

    <small>Figure 1: Descriptive Twin Model(Source: [ETSI GR CIM 017 V1.1.1](https://www.etsi.org/deliver/etsi_gr/CIM/001_099/017/01.01.01_60/gr_CIM017v010101p.pdf))</small>
    </figcaption>
    </figure>
    
#### Iteration 2: Predictive Twin
- Builds on the descriptive twin by providing predictions of how the asset may evolve.
    <figure>
    <img src="../img/predictive-twin.png"  width="350"/>
    <figcaption>

    <small>Figure 2: Predicitve Twin Model (Source: [ETSI GR CIM 017 V1.1.1](https://www.etsi.org/deliver/etsi_gr/CIM/001_099/017/01.01.01_60/gr_CIM017v010101p.pdf))</small>
    </figcaption>
    </figure>

#### Iteration 3: Prospective Twin
- Enables “what-if” analysis by allowing users to simulate the impact of potential actions on the asset.
    <figure>
    <img src="../img/prospective-twin.png"  width="350"/>
    <figcaption>

    <small>Figure 3: Prospective Twin Model (Source: [ETSI GR CIM 017 V1.1.1](https://www.etsi.org/deliver/etsi_gr/CIM/001_099/017/01.01.01_60/gr_CIM017v010101p.pdf))</small>
    </figcaption>
    </figure>

For further information we refer to [ETSI GR CIM 017 V1.1.1](https://www.etsi.org/deliver/etsi_gr/CIM/001_099/017/01.01.01_60/gr_CIM017v010101p.pdf): *Context Information Management (CIM); Feasibility of NGSI-LD for Digital Twins*.

