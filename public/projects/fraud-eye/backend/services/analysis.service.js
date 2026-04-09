import { Transaction } from "../modals/Transaction.modals.js";
import { detectCycles, detectSmurfing, detectLayeredChains } from "../utils/aiUtilities/fraudAlgorithms.js";
import { v4 as uuidv4 } from 'uuid';

const analyzeTransactions = async (transactions) => {
    // 1. Basic Counts
    const allAccounts = new Set();
    transactions.forEach(t => {
        allAccounts.add(t.sender_id);
        allAccounts.add(t.receiver_id);
    });

    // 2. Run Algorithms
    const cycles = detectCycles(transactions);
    const smurfing = detectSmurfing(transactions);
    const chains = detectLayeredChains(transactions);

    const suspiciousAccounts = new Map();
    const fraudRings = [];

    // Helper to add/update suspicion
    const markSuspicious = (accountId, score, pattern, ringId = null) => {
        if (!suspiciousAccounts.has(accountId)) {
            suspiciousAccounts.set(accountId, {
                account_id: accountId,
                suspicion_score: 0,
                detected_patterns: [],
                ring_id: ringId
            });
        }
        const acc = suspiciousAccounts.get(accountId);
        acc.suspicion_score = Math.min(100, acc.suspicion_score + score);
        if (!acc.detected_patterns.includes(pattern)) {
            acc.detected_patterns.push(pattern);
        }
        if (ringId && !acc.ring_id) acc.ring_id = ringId;
    };

    // Process Cycles
    cycles.forEach(cycle => {
        const ringId = `RING_${uuidv4().slice(0, 8).toUpperCase()}`;
        fraudRings.push({
            ring_id: ringId,
            member_accounts: cycle,
            pattern_type: "cycle",
            risk_score: 90 + Math.random() * 10
        });
        cycle.forEach(acc => markSuspicious(acc, 40, `cycle_length_${cycle.length}`, ringId));
    });

    // Process Smurfing
    smurfing.suspiciousFanIn.forEach(item => {
        markSuspicious(item.receiver, 30, "fan_in_smurfing");
    });
    smurfing.suspiciousFanOut.forEach(item => {
        markSuspicious(item.sender, 30, "fan_out_smurfing");
    });

    // Process Chains
    chains.forEach(chain => {
        const ringId = `RING_${uuidv4().slice(0, 8).toUpperCase()}`;
        fraudRings.push({
            ring_id: ringId,
            member_accounts: chain,
            pattern_type: "layered_chain",
            risk_score: 85 + Math.random() * 15
        });
        chain.forEach(acc => markSuspicious(acc, 35, "layered_shell_chain", ringId));
    });

    const sortedAccounts = Array.from(suspiciousAccounts.values())
        .sort((a, b) => b.suspicion_score - a.suspicion_score);

    return {
        suspicious_accounts: sortedAccounts,
        fraud_rings: fraudRings,
        summary: {
            total_accounts_analyzed: allAccounts.size,
            suspicious_accounts_flagged: sortedAccounts.length,
            fraud_rings_detected: fraudRings.length,
            processing_time_seconds: 1.5 // Placeholder, calculate if needed
        }
    };
};

export { analyzeTransactions };
