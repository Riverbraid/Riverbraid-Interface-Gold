import { enforceCoreValidator } from './src/runtime-binding.js';
import { translateState } from './src/semantic-bridge.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { verifyEntropySignal } = require('./bin/entropy-signal.cjs');

const checks = [
    { name: "Mechanical", fn: () => enforceCoreValidator('Final-Seal') },
    { name: "Entropy",    fn: () => verifyEntropySignal() },
    { name: "Semantic",   fn: () => translateState("01a777") }
];

console.log("🚀 EXECUTING COMPOSABLE GATE");
try {
    for (const check of checks) {
        if (!check.fn()) throw new Error(`${check.name} check failed`);
    }
    console.log("\n💎 SYSTEM: DEFENSIBLE + COHERENT");
} catch (e) {
    console.error(`\n🚨 GATE FAILURE: ${e.message}`);
    process.exit(1);
}
