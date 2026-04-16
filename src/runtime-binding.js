import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
const binPath = path.join(repoRoot, 'bin', 'verify-swarm.cjs');

const { verifySwarm, getCurrentRoot } = require(binPath);

export function enforceCoreValidator(context) {
    const root = getCurrentRoot();
    if (!verifySwarm(root)) {
        console.error(`❌ Riverbraid: ${context} failed stationary check`);
        process.exit(1);
    }
    console.log(`✅ Validator OK: ${context} (${root})`);
}
