# Riverbraid V1.5 Sovereignty Invocation

To couple your creative variation (p5.js or Hydra) to the Riverbraid Core:

```javascript
const { bindP5, bindHydra } = require('./src/runtime-binding.js');

// For p5.js
bindP5(p5Instance);

// For Hydra
bindHydra(hydraInstance);
```

**Requirements:** GPG-signed .anchor must match Merkle Root 01a777. The system Fail-Closed on breach.
