// Graph-based Fraud Detection Algorithms

// 1. Cycle Detection (Money Loops)
const detectCycles = (transactions) => {
    const adjList = {};
    transactions.forEach(t => {
        if (!adjList[t.sender_id]) adjList[t.sender_id] = [];
        adjList[t.sender_id].push(t.receiver_id);
    });

    const cycles = [];
    const visited = new Set();
    const recStack = new Set();

    const dfs = (node, path) => {
        visited.add(node);
        recStack.add(node);
        path.push(node);

        const neighbors = adjList[node] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, [...path]);
            } else if (recStack.has(neighbor)) {
                // Cycle detected
                const cycleStartIdx = path.indexOf(neighbor);
                if (cycleStartIdx !== -1) {
                    cycles.push(path.slice(cycleStartIdx));
                }
            }
        }

        recStack.delete(node);
    };

    Object.keys(adjList).forEach(node => {
        if (!visited.has(node)) {
            dfs(node, []);
        }
    });

    return cycles; // Array of cycles, each cycle is an array of account IDs
};

// 2. Fan-in/Fan-out (Smurfing)
const detectSmurfing = (transactions) => {
    const fanIn = {};
    const fanOut = {};

    transactions.forEach(t => {
        if (!fanIn[t.receiver_id]) fanIn[t.receiver_id] = new Set();
        fanIn[t.receiver_id].add(t.sender_id);

        if (!fanOut[t.sender_id]) fanOut[t.sender_id] = new Set();
        fanOut[t.sender_id].add(t.receiver_id);
    });

    const suspiciousFanIn = Object.entries(fanIn)
        .filter(([_, senders]) => senders.size > 5)
        .map(([receiver, senders]) => ({ receiver, count: senders.size }));

    const suspiciousFanOut = Object.entries(fanOut)
        .filter(([_, receivers]) => receivers.size > 5)
        .map(([sender, receivers]) => ({ sender, count: receivers.size }));

    return { suspiciousFanIn, suspiciousFanOut };
};

// 3. Layered Shell Chains
const detectLayeredChains = (transactions) => {
    const chains = [];
    // Simplified: Find paths of length > 3 where amounts are similar
    const adjList = {};
    transactions.forEach(t => {
        if (!adjList[t.sender_id]) adjList[t.sender_id] = [];
        adjList[t.sender_id].push({ to: t.receiver_id, amount: t.amount });
    });

    const findChains = (node, currentChain, lastAmount) => {
        if (currentChain.length >= 4) {
            chains.push([...currentChain]);
            return;
        }

        const neighbors = adjList[node] || [];
        for (const neighbor of neighbors) {
            // Check if amount is within 10% tolerance for layering
            if (lastAmount === null || (neighbor.amount >= lastAmount * 0.9 && neighbor.amount <= lastAmount * 1.1)) {
                findChains(neighbor.to, [...currentChain, neighbor.to], neighbor.amount);
            }
        }
    };

    Object.keys(adjList).forEach(node => {
        findChains(node, [node], null);
    });

    return chains;
};

export { detectCycles, detectSmurfing, detectLayeredChains };
