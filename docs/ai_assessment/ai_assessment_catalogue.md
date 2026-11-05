---
title: AI Assessment Catalogue
hide:
  - toc
description: "The tools and methods used to assess each dimension of trustworthiness."
---

<!-- Floating toggle for showing the left navigation on hover -->
<button class="catalog-nav-toggle" aria-label="Show navigation" title="Show navigation">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 12c0-.55.45-1 1-1h12.59l-4.3-4.29a1.003 1.003 0 0 1 1.42-1.42l6 6c.39.39.39 1.02 0 1.41l-6 6a1.003 1.003 0 0 1-1.42-1.42L16.59 13H4c-.55 0-1-.45-1-1Z"/>
        </svg>
 </button>

<div class="catalog-header" markdown>
<div markdown>
The AI Assessment Catalogue showcases the evaluation tools, testing frameworks, and assessment solutions available across the CitCom.ai TEF network.
It is regularly updated as new methodologies and tools become available at each TEF site. 
If you would like to request an assessment or learn more about a tool, please contact the relevant TEF sites.
</div>
</div>

<!-- Search and filters: javascripts/catalog.js fills the filters from the table -->
<div class="cc-cat-tools">
  <label class="cc-cat-search">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/></svg>
    <input type="search" id="catalogSearch" placeholder="Search the catalogue" aria-label="Search the catalogue">
  </label>
  <button type="button" id="catalogFiltersToggle" aria-expanded="false" aria-controls="catalogFilters">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.989.989 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12H14Z"/></svg>
    Filters
  </button>
  <span class="cc-cat-count" id="catalogCount" aria-live="polite"></span>
</div>
<div class="cc-cat-filters" id="catalogFilters" hidden></div>

<div class="ai-assessment-table" markdown>

| Solution Name | Provider | Licensing Type | Project Phase / TRL | Domain of Application | AI Risk Category | Ethical Dimensions | Security & Securitization of Data | Resources | Example of Use Case |
| ------------- | -------- | -------------- | ------------------- | --------------------- | ---------------- | ------------------ | --------------------------------- | --------- | ------------------- |
| **FAIRGAME**  | LIST     | Open-source    | TRL 6–8             | LLM bias testing, AI agents behavioural testing, jailbreaking testing | General Purpose AI | Fairness, Robustness | Depends on the use case (whether the chatbot/AI agent has access to sensitive data) | GitHub: <https://github.com/aira-list/FAIRGAME>, Paper: "FAIRGAME: A Framework for AI Agents Bias Recognition Using Game Theory", Frontiers in AI and Applications, Vol. 413: ECAI 2025 | A city aims to test its citizen-facing chatbot before launch. FAIRGAME enables the creation of simulated users with diverse identities, personalities, and requests using LLMs, allowing evaluation in dynamic, real-world-like conversations. |
| **MLA-BiTe**  | LIST     | To be open sourced | TRL 6–8 | LLM bias testing | General Purpose AI | Fairness, Robustness | No data privacy requirements | — | A city plans to evaluate fairness in its citizen-facing chatbot. MLA-BiTe allows non-technical staff to create local scenario-based prompts to uncover discriminatory behaviour across sensitive categories, supporting multiple languages and augmentations. |
| **Legal KG-RAG** | LIST | Proprietary | TRL 5–7 | LLM factuality accuracy testing | General Purpose AI | Transparency, Explainability, Robustness | Depends on whether the RAG is performed on sensitive data | — | A city using a standard RAG pipeline obtains irrelevant results. Legal KG-RAG rebuilds the legal corpus as a Neo4j knowledge graph, enabling direct comparison between traditional and KG-enhanced retrieval. |
| **MLA-Reject** | LIST | To be open sourced | TRL 6–8 | LLM robustness to jailbreaking | General Purpose AI | Robustness | Depends on whether the system has access to sensitive data | — | A public administration operates a multilingual assistant for internal queries. They want to test robustness against unsafe or misleading prompts. MLA-Reject generates difficult negative prompts to test refusal behaviour and safety guardrails, revealing weaknesses and improving configurations. |

</div>
