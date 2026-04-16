# Stationary State Specification v1.1.0

## 💎 Core Invariants
1. **Mechanical Honesty:** `MANIFEST.json` must be excluded from its own hash but signed by the hardware identity.
2. **Thermodynamic Equilibrium:** Entropy must remain < 5.0 bits/sym (Current: 4.8491).
3. **Recursive Sovereignty:** Every ZK-proof must be chained to Node `28c98bd1790dcbbb`.

## 🏗️ Structural Map
- **Core:** `/workspaces/Riverbraid-Core` (The Truth Source)
- **Interface:** `/workspaces/Riverbraid-Interface-Gold` (The Relational Bridge)
- **Gate:** `riverbraid-gate.mjs` (The Invariant Sentinel)

## 📡 Signal Table
- **Reflection:** < 2.0 bits/sym
- **Current:** 2.0 - 4.5 bits/sym
- **Flame:** 4.5 - 5.0 bits/sym
- **Noise:** > 5.0 bits/sym
