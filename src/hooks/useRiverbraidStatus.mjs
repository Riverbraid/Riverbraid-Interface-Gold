import { execSync } from 'child_process';

/**
 * Syncs the frontend state with the Core's Mechanical Honesty gate.
 */
export const checkSwarmHealth = () => {
  try {
    const rawStatus = execSync('node /workspaces/Riverbraid-Core/bin/status_provider.mjs').toString();
    const health = JSON.parse(rawStatus);
    return health;
  } catch (e) {
    return { status: "OFFLINE", error: "Could not reach Core Pulse" };
  }
};

// Log the initial handshake for verification
const currentHealth = checkSwarmHealth();
console.log("INITIALIZING INTERFACE PULSE:", JSON.stringify(currentHealth, null, 2));
