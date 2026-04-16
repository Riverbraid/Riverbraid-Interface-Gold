const { bindP5, bindHydra } = require('./src/runtime-binding.js');
console.log("Riverbraid Interface harness initializing...");

if (typeof p5 !== 'undefined') bindP5(p5);
if (typeof hydra !== 'undefined') bindHydra(hydra);

console.log("✅ Creative variations tightly coupled to Core.");
