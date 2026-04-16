const crypto = require('crypto');

/**
 * Folds a new state into a previous proof.
 * previousProof + currentRoot + hardwareId = New Proof
 */
function foldProof(previousProof, currentRoot, hardwareId) {
    const input = `${previousProof}:${currentRoot}:${hardwareId}`;
    return crypto.createHash('sha256').update(input).digest('hex');
}

module.exports = { foldProof };

// Internal self-test for recursion
const genesis = "0".repeat(64);
const p1 = foldProof(genesis, "01a777", "NODE-01");
const p2 = foldProof(p1, "01a777", "NODE-02");

console.log(`🧬 Recursive Proof Tail: ${p2.substring(0, 8)}...`);
