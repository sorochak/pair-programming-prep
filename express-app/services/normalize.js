// normalize.js

const normalizeChargers = (data, statusMap) => {
  const result = [];

  // console.log(data);

  data.forEach((poi) => {
    const connections = poi.connections || [];

    connections.forEach((conn) => {
      result.push({
        connectionId: conn.id,
        powerKW: conn.powerKW,
        quantity: conn.quantity || 1,
        statusTypeID: conn.statusTypeID,
        status: statusMap[conn.statusTypeID] || "Unknown",
        needsAttention:
          conn.statusTypeID === 0 || // Unknown
          conn.statusTypeID === 100 || // Not Operational
          conn.statusTypeID === null,
        poiId: poi.id,
        siteName: poi.addressInfo?.title || "Unnamed",
        lat: poi.addressInfo?.latitude,
        lon: poi.addressInfo?.longitude,
      });
    });
  });

  return result;
};

module.exports = { normalizeChargers };
