const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const coreDir = '/workspaces/Riverbraid-Core';
const verifyPath = path.join(coreDir, 'bin/verify-swarm.cjs');

function enforceCoreValidator(context) {
        console.error('❌ ' + context + ': Physical dependency missing at ' + verifyPath);
        process.exit(1);
    }

    const { verifySwarm, getCurrentRoot } = require(verifyPath);
    const root = getCurrentRoot();

    const anchorPath = '/workspaces/Riverbraid-Interface-Gold/.anchor';
    const sigPath = '/workspaces/Riverbraid-Interface-Gold/.anchor.asc';

        console.error('❌ ' + context + ': Missing GPG-signed .anchor or .anchor.asc');
        process.exit(1);
    }

    try {
        execSync('gpg --verify "' + sigPath + '" "' + anchorPath + '"', { stdio: 'ignore' });
    } catch (e) {
        console.error('❌ ' + context + ': GPG verification failed.');
        process.exit(1);
    }

    const anchoredRoot = fs.readFileSync(anchorPath, 'utf8').trim();
    if (anchoredRoot !== root) {
        console.error('❌ ' + context + ': Anchor mismatch.');
        process.exit(1);
    }

        console.error('❌ ' + context + ': Swarm verification failed.');
        process.exit(1);
    }

    console.log('✅ Riverbraid Core validator passed for ' + context + ' [Root: ' + root + ']');
}

function bindP5(p5Instance) {
    const originalSetup = p5Instance.setup || function () {};
    p5Instance.setup = function () {
        enforceCoreValidator('p5-setup');
        originalSetup.call(this);
    };
    const originalDraw = p5Instance.draw || function () {};
    p5Instance.draw = function () {
        enforceCoreValidator('p5-draw');
        originalDraw.call(this);
    };
}

function bindHydra(hydraSynth) {
    const originalEval = hydraSynth.eval || function () {};
    hydraSynth.eval = function (code) {
        enforceCoreValidator('hydra-eval');
        return originalEval.call(this, code);
    };
}

module.exports = { bindP5, bindHydra, enforceCoreValidator };