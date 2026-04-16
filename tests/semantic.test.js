import { translateFrequencies } from '../src/bridge/semantic-engine.js';
import assert from 'assert';

console.log("🧪 Testing Semantic Bridge Accuracy...");

const testCases = [
    { entropy: 1.5, expected: "Reflection" },
    { entropy: 3.5, expected: "Current" },
    { entropy: 4.8, expected: "Flame" },
    { entropy: 5.5, expected: "Noise" }
];

testCases.forEach(({ entropy, expected }) => {
    const result = translateFrequencies(entropy);
    assert.strictEqual(result.braid, expected);
    console.log(`✅ Entropy ${entropy} correctly mapped to ${expected}`);
});

console.log("✨ SEMANTIC ACCURACY VERIFIED.");
