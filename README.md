# Riverbraid-Interface-Gold
## The Universal Deterministic Sidecar

This module acts as a stateless verification proxy. It intercepts LLM traffic to enforce:
1. **Entropy Bans:** Rejects non-deterministic tokens.
2. **State Anchoring:** Maintains the Merkle root of the interaction.
3. **Fail-Closed Governance:** Blocks unauthorized execution calls.

### Usage
Connect your LLM client to `http://localhost:8080/v1`.
