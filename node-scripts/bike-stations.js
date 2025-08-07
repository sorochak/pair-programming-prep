// bike-stations.js

/* 
Build a Node.js script (or Express route, if you prefer) that:

Fetches all networks
Filters to networks in Canada
For each, fetches its detailed network data
Extracts:
  Network name
  City
  Number of stations
  Total available bikes
Logs a summary
Bonus: Add error handling for rate limits, missing data, or broken responses.
*/

const BASE_URL = "https://api.citybik.es/v2/networks";

const fetchAllNetworks = async () => {
  try {
    // send request
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch networks");
    const data = await response.json();
    return data.networks;
  } catch (err) {
    console.error(err);
  }
};

const filterCanadianNetworks = (networks) => {
  return networks.filter((network) => network.location?.country === "CA");
};

const summarizeStations = (stations) => {
  const totalStations = stations.length;
  const totalBikes = stations.reduce(
    (sum, station) => sum + (station.free_bikes || 0),
    0
  );
  return { totalStations, totalBikes };
};

const fetchNetworks = async () => {
  try {
    // Send request
    const allNetworks = await fetchAllNetworks();
    const canadianNetworks = filterCanadianNetworks(allNetworks);

    for (const network of canadianNetworks) {
      const networkURL = `https://api.citybik.es${network.href}`;

      const response = await fetch(networkURL);

      if (response.ok) {
        const networkData = await response.json();

        const networkName = network?.name || "Unknown";
        const city = network.location?.city || "Unknown";
        const stations = networkData.network?.stations || [];
        const summarizedStations = summarizeStations(stations);
        const { totalStations, totalBikes } = summarizedStations;

        console.log(
          `${networkName} - ${city} \nStations: ${totalStations} \nAvailable Bikes: ${totalBikes} \n`
        );
      } else {
        throw new Error("Network request failed!");
      }
    }
  } catch (err) {
    console.error(err);
  }
};

fetchNetworks();
