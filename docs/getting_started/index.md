---
title: The project
description: "What CitCom.ai is, what a TEF is, why the sites share a common architecture and the minimal package WP3 offers them."
---

# The project

**CitCom.ai** is a European Union project that sets up Testing and Experimentation Facilities (TEFs) for AI and robotics in smart and sustainable cities and communities. A **TEF** is a place where companies test AI products in real conditions before they reach the market; the sites, the super-nodes they are grouped in and what each one offers are in the [TEF network](../tef/index.md).

## Common Infrastructure and Services

This site is the work of **work package 3 (WP3), Common Infrastructure and Services**. This page explains why the sites share a common architecture and what WP3 offers them.

### Why a common architecture

Each city already has its own data platform, often built years ago with its own interfaces. A product tested in one city would need a new integration in the next one. CitCom avoids that by agreeing on a few common points:

<div class="cc-help" markdown="0">
  <div class="cc-help__item">
    <div class="cc-help__demo" aria-hidden="true">
      <span class="cc-help__flow">
        <span class="cc-help__stack"><span>City A</span><span>City B</span><span>City C</span></span>
        <i></i>
        <span class="cc-help__box"><strong>Same API</strong><small>NGSI-LD, Smart Data Models</small></span>
      </span>
    </div>
    <p class="cc-tef__eyebrow">Level 1 · Interoperability</p>
    <p>The same <strong>API and data models</strong> to read city data, whatever platform each city runs. <a href="interoperability/#level-1">Interoperability level 1</a>.</p>
  </div>
  <div class="cc-help__item">
    <div class="cc-help__demo" aria-hidden="true">
      <span class="cc-help__flow">
        <span class="cc-help__box"><strong>Provider</strong></span>
        <i><small>contract</small></i>
        <span class="cc-help__box"><strong>Consumer</strong></span>
      </span>
    </div>
    <p class="cc-tef__eyebrow">Level 2 · Data spaces</p>
    <p>The same <strong>way to share data under control</strong>, between organisations that do not have to trust each other in advance. <a href="data_spaces/">Level 2: data spaces</a>.</p>
  </div>
</div>

A service built on those points runs in any city that follows them. The [MIAIS](../miais/index.md) shows how.

## The minimal package for TEF nodes

CitCom has two kinds of offer, for different audiences:

- **The TEF nodes offer services to AI and robotics innovators**: test sites, data, expertise and assessment. The [CitCom TEF website](https://citcomtef.eu/) lists them.
- **CitCom's work package 3 (WP3) offers the TEF nodes a *minimal package***: a common reference architecture, with the guides, tools and deployment examples to apply it. Nodes that adopt it share a common technical base, so a service built on that base can run in any of them. This hub gathers the package:

<div class="grid cards" markdown>

-   :material-server-network:{ .lg .middle } __A working data space__

    ---

    Running infrastructure that sites and companies can join, with real data from Valencia.

    [:octicons-arrow-right-24: The data spaces](../data_spaces/index.md)

-   :material-robot-outline:{ .lg .middle } __A worked example__

    ---

    An AI service that goes from a custom integration to a data space service.

    [:octicons-arrow-right-24: MIAIS](../miais/index.md)

-   :material-book-open-variant:{ .lg .middle } __Guides and tools__

    ---

    One guide per task, and the tools to connect a city platform.

    [:octicons-arrow-right-24: Guides](../guides/index.md)

-   :material-shield-check-outline:{ .lg .middle } __Trust and assessment__

    ---

    The AI Trustworthiness Label to assess the services tested in the TEFs.

    [:octicons-arrow-right-24: AI Trustworthiness Label](../ai_assessment/index.md)

</div>
