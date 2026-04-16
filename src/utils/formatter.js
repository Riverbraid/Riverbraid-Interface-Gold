module.exports = {
    formatSignal: (signal) => {
        return `[${signal.timestamp}] ${signal.braid_state}: ${signal.relational_truth}`;
    }
};
