import fs from 'fs';
import path from 'path';
import { generateTruthReport } from '../bridge/semantic-engine.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { calculateShannonEntropy } = require('/workspaces/Riverbraid-Core/lib/thermodynamics/governor.cjs');

export function getPublicSignal() {
    const manifestPath = '/workspaces/Riverbraid-Core/MANIFEST.json';
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const entropy = calculateShannonEntropy(manifestContent);
    
    const report = generateTruthReport(entropy);
    
    return {
        status: "COHERENT",
        timestamp: new Date().toISOString(),
        ...report,
        entropy_signal: entropy.toFixed(4)
    };
}

console.log("📡 Relational Connector: Signal generated.");
console.log(JSON.stringify(getPublicSignal(), null, 2));
