// summarize.js

const summarizeBySite = (chargers) => {
  const summary = {};

  chargers.forEach((charger) => {
    const { siteName, powerKW, quantity, needsAttention } = charger;

    if (!summary[siteName]) {
      summary[siteName] = {
        totalConnections: 0,
        needsAttentionCount: 0,
        totalPowerKW: 0,
      };
    }

    summary[siteName].totalConnections += 1;
    summary[siteName].totalPowerKW += (powerKW || 0) * (quantity || 1);
    if (needsAttention) {
      summary[siteName].needsAttentionCount += 1;
    }
  });

  // Only return sites that need attention
  return Object.entries(summary)
    .filter(([_, stats]) => stats.needsAttentionCount > 0)
    .map(([siteName, stats]) => ({ siteName, ...stats }));
};

module.exports = { summarizeBySite };
