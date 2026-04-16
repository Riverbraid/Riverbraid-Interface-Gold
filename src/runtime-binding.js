// Riverbraid-Interface-Gold/src/runtime-binding.js
// Tight runtime coupling: Riverbraid-Core validator injected into every initialization loop
const { verifySwarm, getCurrentRoot } = require('../bin/verify-swarm.cjs');
const shield = require('../riverbraid-shield');

function enforceCoreValidator(context) {
  const root = getCurrentRoot(); // must be 01a777
  if (!verifySwarm(root)) {
    console.error(`❌ Riverbraid: ${context} failed stationary check (root drift detected)`);
    process.exit(1); // hard fail-closed
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

function bindHydra(hydraSynth) {
  const originalEval = hydraSynth.eval || function () {};

  hydraSynth.eval = function (code) {
    enforceCoreValidator("hydra-eval");
    return originalEval.call(this, code);
  };

  console.log("✅ Hydra fully coupled to Riverbraid-Core");
}

module.exports = { bindP5, bindHydra, enforceCoreValidator };
