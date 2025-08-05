/*
Write a script that: 
  fetches a list of EV chargers, 
  normalizes the data, 
  and identifies chargers that may need attention (e.g., offline, unknown status, or missing data).
*/

/*
Take your normalized charger data and group it by siteName. For each site, print:

Total number of connections

Number of connections that need attention

Total available power (sum of all powerKW * quantity)

Only include sites where at least one connection needs attention.
*/

const API_KEY = "7ea76f10-1472-471e-a557-d88ce3ab1e1c";
const BASE_URL =
  "https://api.openchargemap.io/v3/poi/?output=json&countrycode=CA&camelcase=true&compact=true&maxresults=100";

const getStatusTypeMap = async () => {
  try {
    const response = await fetch(
      "https://api.openchargemap.io/v3/referencedata/",
      {
        headers: {
          "X-API-Key": API_KEY,
          Accept: "application/json",
        },
      }
    );

    // console.log("status:", response.status);

    if (response.ok) {
      const jsonResponse = await response.json();

      console.log(jsonResponse.StatusTypes);

      // Build a lookup map: {50: 'Operational', 100: 'Not Operational', ...}
      const statusMap = jsonResponse.StatusTypes.reduce((acc, status) => {
        return { ...acc, [status.ID]: status.Title };
      }, {});

      console.log(statusMap);
      return statusMap;
    } else {
      // Handles response if unsuccessful
      throw new Error("Request failed!");
    }
  } catch (err) {
    console.log(err);
  }
};

const getData = async () => {
  try {
    // send request
    const response = await fetch(BASE_URL, {
      headers: {
        "X-API-Key": API_KEY,
        Accept: "application/json",
      },
    });

    // console.log("Status:", response.status);

    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse[0]);
      return jsonResponse;
    } else {
      // Handles response if unsuccessful
      throw new Error("Request failed!");
    }
  } catch (err) {
    console.log(err);
  }
};

//getData();

const main = async () => {
  const statusMap = await getStatusTypeMap();
  const data = await getData();

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

  const normalized = normalizeChargers(data, statusMap);

  const needingAttention = normalized.filter(
    (charger) => charger.needsAttention
  );

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

    // Only include sites with at least one problem
    // Object.entries(summary).forEach(([site, stats]) => {
    //   if (stats.needsAttentionCount > 0) {
    //     console.log(`site: ${site}`);
    //     console.log(`  Total Connections: ${stats.totalConnections}`);
    //     console.log(`  Needs Attention: ${stats.needsAttentionCount}`);
    //     console.log(`  Total Power (kW): ${stats.totalPowerKW}`);
    //     console.log();
    //   }
    // });
  };

  summarizeBySite(normalized);

  // console.log(needingAttention.length);
  // console.log("Chargers needing attention:", needingAttention);
};

main();
