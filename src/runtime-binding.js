const path = require('path');
const fs = require('fs');
const { verifySwarm, getCurrentRoot } = require(path.resolve(__dirname, '../bin/verify-swarm.cjs'));

// Shield is optional; fail gracefully if not linked
let shield = { logAttestation: () => {} };
try {
  shield = require(path.resolve(__dirname, '../riverbraid-shield.js'));
} catch (e) {}

function enforceCoreValidator(context) {
  const root = getCurrentRoot(); 
  if (!verifySwarm(root)) {
    console.error(`❌ Riverbraid: ${context} failed stationary check (root drift detected)`);
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
