import { execSync } from 'child_process';
import { getPublicSignal } from './src/connectors/health-signal.js';

console.log("💎 RIVERBRAID BOOT SEQUENCE INITIATED");

try {
    // Stage 0: Physical Sovereignty (Core Enforcer)
    console.log("[Stage 0]: Thermodynamic Enforcer...");
    execSync('node /workspaces/Riverbraid-Core/bin/enforcer.cjs', { stdio: 'inherit' });

    // Stage 1: Relational Alignment
    console.log("[Stage 1]: Relational Alignment...");
    const signal = getPublicSignal();
    console.log(`📡 Current State: ${signal.braid_state} (${signal.relational_truth})`);

    console.log("\n✨ SYSTEM STATUS: ABSOLUTE COMPLETION. ALL GATES OPEN.");
} catch (e) {
    console.error("\n❌ BOOT ABORTED: System Invariants Violated.");
    process.exit(1);
}
