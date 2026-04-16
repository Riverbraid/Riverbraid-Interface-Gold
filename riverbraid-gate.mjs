import { execSync } from 'child_process';

export function checkSovereignty() {
    console.log("[Stage 0]: Thermodynamic Enforcer...");
    try {
        execSync('node /workspaces/Riverbraid-Core/bin/enforcer.cjs', { stdio: 'inherit' });
    } catch (e) {
        console.error("❌ Sovereignty Violated. Access Denied.");
        process.exit(1);
    }
}
