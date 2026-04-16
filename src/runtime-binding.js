const path = require('path');
const fs = require('fs');

// Anchor to the actual workspace root
const repoRoot = path.resolve(process.cwd());
const binPath = path.join(repoRoot, 'bin/verify-swarm.cjs');
const shieldPath = path.join(repoRoot, 'riverbraid-shield.js');

const { verifySwarm, getCurrentRoot } = require(binPath);

let shield = { logAttestation: () => {} };
if (fs.existsSync(shieldPath)) {
  shield = require(shieldPath);
}

function enforceCoreValidator(context) {
  const root = getCurrentRoot(); 
  if (!verifySwarm(root)) {
    console.error(`❌ Riverbraid: ${context} failed stationary check`);
    process.exit(1);
  }
  shield.logAttestation(context, root);
  console.log(`✅ Riverbraid Core validator passed for ${context} (root: ${root})`);
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
  console.log("✅ p5.js fully coupled to Riverbraid-Core");
}

module.exports = { bindP5, enforceCoreValidator };
