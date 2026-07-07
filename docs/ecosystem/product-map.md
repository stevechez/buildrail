---
title: BuildRail Product Map
description: Complete ecosystem overview showing BuildRail products, modules, shared services, and relationships.
category: Ecosystem
status: Active
owner: BuildRail Product Team
last_updated: 2026-07-07
---

# BuildRail Product Map

> **BuildRail is not a collection of applications. It is a unified operating system for modern contractors.**

This document defines the relationship between BuildRail products, shared platform services, and the customer lifecycle.

The purpose of this document is to answer:

- What products exist?
- What problem does each product solve?
- How do products communicate?
- What belongs in the platform layer?
- Where should future features be built?

---

# 1. BuildRail Ecosystem Overview

```mermaid
flowchart TB

subgraph Customer["Contractor Customer Journey"]

Sites["BuildRail Sites<br/>Digital Presence"]

Growth["Growth System<br/>Lead Generation"]

LeadOS["Local Lead OS<br/>Opportunity Management"]

Receptionist["AI Receptionist<br/>Instant Response"]

Estimator["Estimator<br/>Pricing & Proposals"]

Field["BuildRail Field<br/>Project Operations"]

Verdict["SiteVerdict<br/>Quality Verification"]

Vault["BuildRail Vault<br/>Business Memory"]

Proof["LocalProof<br/>Marketing Engine"]

end


Sites --> Growth
Growth --> LeadOS
LeadOS --> Receptionist
LeadOS --> Estimator
Estimator --> Field
Field --> Verdict
Verdict --> Vault
Vault --> Proof
Proof --> Sites
```
