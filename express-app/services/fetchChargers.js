// fetchChargers.js
const API_KEY = process.env.OPENCHARGEMAP_API_KEY;
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

    if (response.ok) {
      const jsonResponse = await response.json();

      // Build a lookup map: {50: 'Operational', 100: 'Not Operational', ...}
      const statusMap = jsonResponse.StatusTypes.reduce((acc, status) => {
        return { ...acc, [status.ID]: status.Title };
      }, {});

      return statusMap;
    } else {
      // handle response if unsuccessful
      throw new Error(`StatusMap fetch failed: ${response.status}`);
    }
  } catch (err) {
    console.error("Error in getStatusTypeMap:", err);
    throw err;
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

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      // handle unsuccessful response
      throw new Error(`data fetch failed: ${response.status}`);
    }
  } catch (err) {
    console.error("Error in getData:", err);
    throw err;
  }
};

const fetchAndMergeData = async () => {
  const statusMap = await getStatusTypeMap();
  const data = await getData();
  return { data, statusMap };
};

module.exports = { fetchAndMergeData, getData, getStatusTypeMap };
