const { verifySwarm, getCurrentRoot } = require('../bin/verify-swarm.cjs');
const shield = require('../riverbraid-shield');

function bindP5(p5Instance) {
  const originalSetup = p5Instance.setup;
  const originalDraw = p5Instance.draw;

  p5Instance.setup = async function () {
    const root = getCurrentRoot();
    if (!verifySwarm(root)) {
      console.error("❌ Riverbraid: p5 runtime failed stationary check");
      return;
    }
    shield.logAttestation("p5-setup", root);
    if (originalSetup) originalSetup.call(this);
  };

  p5Instance.draw = async function () {
    if (!verifySwarm(getCurrentRoot())) {
      console.error("❌ Riverbraid: p5 draw cycle drifted");
      return;
    }
    if (originalDraw) originalDraw.call(this);
  };
  console.log(`✅ Riverbraid p5.js bound to root ${getCurrentRoot()}`);
}

function bindHydra(hydraSynth) {
  const originalEval = hydraSynth.eval;
  hydraSynth.eval = async function (code) {
    const root = getCurrentRoot();
    if (!verifySwarm(root)) {
      console.error("❌ Riverbraid: Hydra code execution failed stationary check");
      return;
    }
    shield.logAttestation("hydra-eval", root);
    return originalEval.call(this, code);
  };
  console.log(`✅ Riverbraid Hydra bound to root ${getCurrentRoot()}`);
}

module.exports = { bindP5, bindHydra };
