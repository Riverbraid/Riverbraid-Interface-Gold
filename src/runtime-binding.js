const { execSync } = require('child_process');
const fs = require('fs');
const { verifySwarm, getCurrentRoot } = require('../bin/verify-swarm.cjs');
const shield = require('../riverbraid-shield');

function verifyAnchor(context) {
  const root = getCurrentRoot();
  if (!fs.existsSync('.anchor.asc')) {
    console.error(`❌ ${context}: Missing GPG-signed .anchor.asc`);
    process.exit(1);
  }
  try {
    // Structural Gate: verify the signature of the anchor
    execSync(`gpg --verify .anchor.asc .anchor`, { stdio: 'ignore' });
  } catch (e) {
    console.error(`❌ ${context}: GPG signature verification failed`);
    process.exit(1);
  }
  const anchoredRoot = fs.readFileSync('.anchor', 'utf8').trim();
  if (anchoredRoot !== root) {
    console.error(`❌ ${context}: Anchor content mismatch`);
    process.exit(1);
  }
  return true;
}

function enforceCoreValidator(context) {
  verifyAnchor(context);
  const root = getCurrentRoot();
  if (!verifySwarm(root)) {
    console.error(`❌ ${context}: failed swarm check`);
    process.exit(1);
  }
  shield.logAttestation(context, root);
  console.log(`✅ ${context}: Hardened GPG-Anchor Verified`);
}

module.exports = { enforceCoreValidator };
