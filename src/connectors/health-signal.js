import fs from 'fs';
import path from 'path';

export function getPublicSignal() {
    const root = fs.readFileSync(path.join(process.cwd(), 'MERKLE_ROOT'), 'utf8').trim();
    const manifest = JSON.parse(fs.readFileSync('/workspaces/Riverbraid-Core/MANIFEST.json', 'utf8'));
    
    return {
        status: "COHERENT",
        node: manifest.nodeId,
        merkle_root: root,
        braid_frequency: "Flame",
        timestamp: new Date().toISOString()
    };
}

console.log("📡 Relational Connector: Signal generated.");
console.log(JSON.stringify(getPublicSignal(), null, 2));
