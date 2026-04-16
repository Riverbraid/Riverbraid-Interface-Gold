// Riverbraid-Interface-Gold/src/runtime-binding.js
// FINAL TIGHT RUNTIME COUPLING — Path-Robust & GPG-Enforced

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// PATH RESOLUTION: Use absolute paths to prevent symlink/relative drift
const coreDir = '/workspaces/Riverbraid-Core';
const verifyPath = path.join(coreDir, 'bin/verify-swarm.cjs');
const shieldPath = path.join(coreDir, 'riverbraid-shield.js');

// Late-binding requires to ensure physical files are ready
function enforceCoreValidator(context) {
    if (!fs.existsSync(verifyPath)) {
        console.error(`❌ ${context}: Physical dependency missing at ${verifyPath}`);
        process.exit(1);
    }

    const { verifySwarm, getCurrentRoot } = require(verifyPath);
    const root = getCurrentRoot(); // Expecting 01a777 or current Merkle root

    // 1. GPG-SIGNED ANCHOR CHECK
    const anchorPath = '/workspaces/Riverbraid-Interface-Gold/.anchor';
    const sigPath = '/workspaces/Riverbraid-Interface-Gold/.anchor.asc';

    if (!fs.existsSync(anchorPath) || !fs.existsSync(sigPath)) {
        console.error(`❌ ${context}: Missing GPG-signed .anchor at ${anchorPath}`);
        process.exit(1);
    }

    try {
        // Strict GPG verification against the anchor predicate
        execSync(`gpg --verify "${sigPath}" "${anchorPath}"`, { stdio: 'ignore' });
    } catch (e) {
        console.error(`❌ ${context}: GPG signature verification failed. Unauthorized substrate.`);
        process.exit(1);
    }

    // 2. ROOT ALIGNMENT
    const anchoredRoot = fs.readFileSync(anchorPath, 'utf8').trim();
    if (anchoredRoot !== root) {
        console.error(`❌ ${context}: Anchor/Root mismatch (${anchoredRoot} vs ${root})`);
        process.exit(1);
    }

    // 3. SWARM INTEGRITY
    if (!verifySwarm(root)) {
        console.error(`❌ ${context}: verifySwarm failed for root ${root}`);
        process.exit(1);
    }

    console.log(`✅ Riverbraid Core validator passed for ${context} [Root: ${root}]`);
}

function bindP5(p5Instance) {
    const originalSetup = p5Instance.setup || function () {};
    p5Instance.setup = function () {
        enforceCoreValidator("p5-setup");
        originalSetup.call(this);
    };

    const originalDraw = p5Instance.draw || function () {};
    p5Instance.draw = function () {
        enforceCoreValidator("p5-draw");
        originalDraw.call(this);
    };
    console.log("✅ p5.js coupled to Riverbraid-Core via GPG-Anchor.");
}

function bindHydra(hydraSynth) {
    const originalEval = hydraSynth.eval || function () {};
    hydraSynth.eval = function (code) {
        enforceCoreValidator("hydra-eval");
        return originalEval.call(this, code);
    };
    console.log("✅ Hydra coupled to Riverbraid-Core via GPG-Anchor.");
}

module.exports = { bindP5, bindHydra, enforceCoreValidator };
