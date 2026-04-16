import fs from 'fs';
import path from 'path';

export function getPublicSignal() {
    const rootPath = path.join(process.cwd(), 'MERKLE_ROOT');
    const root = fs.readFileSync(rootPath, 'utf8').trim();
    
    let nodeId = "unknown";
    try {
        const manifestPath = '/workspaces/Riverbraid-Core/MANIFEST.json';
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        nodeId = manifest.nodeId;
    } catch (e) {
        nodeId = "detached-node";
    }
    
    return {
        status: "COHERENT",
        node: nodeId,
        merkle_root: root,
        braid_frequency: "Flame",
        timestamp: new Date().toISOString(),
        integrity: "Stationary"
    };
}

console.log("📡 Relational Connector: Signal generated.");
console.log(JSON.stringify(getPublicSignal(), null, 2));
