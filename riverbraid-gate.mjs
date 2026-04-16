import { enforceCoreValidator } from './src/runtime-binding.js';
import { translateState } from './src/semantic-bridge.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { verifyEntropySignal } = require('./bin/entropy-signal.cjs');
const { verifyChain } = require('./zk/recursive-hash.cjs');
const { executeSecure } = require('./bin/wasm-sandbox.cjs');

async function runBraidAudit() {
    console.log("💎 INITIALIZING RIVERBRAID COMPOSITE AUDIT");
    const anchor = "01a777";
    // The verified deterministic truth for ('0', '01a777', 'NODE-01')
    const expectedProof = "c75f377be846694fc234df624c10ae6af47737086628e5077c96bbf2135eed6c";

    const stages = [
        { 
            name: "Mechanical", 
            fn: () => { enforceCoreValidator('Final-Seal'); return true; } 
        },
        { 
            name: "Thermodynamic", 
            fn: () => verifyEntropySignal() 
        },
        { 
            name: "Recursive", 
            fn: () => verifyChain("0", anchor, "NODE-01", expectedProof) 
        },
        { 
            name: "Execution", 
            fn: async () => await executeSecure('./wasm/core.wasm', 1) 
        },
        { 
            name: "Semantic", 
            fn: () => { translateState(anchor); return true; } 
        }
    ];

    for (const stage of stages) {
        process.stdout.write(`[Stage]: ${stage.name}... `);
        try {
            const result = await stage.fn();
            if (!result) throw new Error("Validation returned false");
            console.log("✅");
        } catch (e) {
            console.log(`❌ FAILED (${e.message})`);
            process.exit(1);
        }
    }

    console.log("\n✨ SYSTEM STATUS: FULLY ESTABLISHED AND TRUTHFUL");
}

runBraidAudit();
