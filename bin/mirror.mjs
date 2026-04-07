import { execSync } from 'child_process';

const getPetalState = (cmd) => {
  try {
    return JSON.parse(execSync(cmd).toString());
  } catch (e) {
    return { error: "OFFLINE", frequency: -1 };
  }
};

const reflectSwarm = () => {
  const cognition = getPetalState('node /workspaces/Riverbraid-Cognition/bin/evaluate_coherence.mjs');
  const temporal = getPetalState('node /workspaces/Riverbraid-Temporal-Gold/bin/chronos_gate.mjs');
  
  const dashboard = {
    header: "--- RIVERBRAID STATIONARY STATE ---",
    anchor: "adef13",
    signals: {
      cognition: cognition.signal,
      temporal: temporal.alignment_active ? "ALIGNED" : "OUT_OF_CADENCE",
      frequency: cognition.frequency
    },
    system_integrity: (cognition.frequency === 1) ? "NOMINAL" : "CRITICAL_DRIFT",
    timestamp: new Date().toISOString()
  };

  console.log(JSON.stringify(dashboard, null, 2));
};

reflectSwarm();
