export const PETAL = "Interface-Gold";
export const INVARIANT = "INTERFACE_STATIONARY";
export function verify(input) {
  if (!input || typeof input !== "object") {
    return {
      pass: false,
      stationary: false,
      signal: "interface-gold:INVALID_INPUT",
      reason: "input must be an object"
    };
  }
  const stationary =
    input.repo === "Riverbraid-Interface-Gold" &&
    input.petal === "Interface-Gold" &&
    input.ring === 1 &&
    input.invariant === "INTERFACE_STATIONARY";
  return {
    pass: true,
    stationary,
    signal: stationary ? "interface-gold:STATIONARY" : "interface-gold:DRIFT",
    reason: stationary
      ? "Stationary fields match declared petal identity"
      : "One or more stationary fields drift from declaration"
  };
}
