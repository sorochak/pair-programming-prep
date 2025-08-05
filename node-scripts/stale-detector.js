const url =
  "https://gist.githubusercontent.com/sorochak/4503942e48ffe85dc64f78672060b5f5/raw/5138f1624c775c5f5c9450b672e5164c9c8f7cf2/mock-chargers.json";

/* 
Fetch data from the url
Parse the json safely
Compare each `lastSeen` to the current time
if `lastSeen` is older than 10 minutes (600,000 ms), consider it stale
Log a list of stale chargers
*/

const THRESHOLD = 600000;

const isStale = (lastSeen) => {
  const now = Date.now();
  return now - lastSeen > THRESHOLD;
};

const getData = async () => {
  try {
    // Send Request:
    const response = await fetch(url);

    // handle response if successful:
    if (response.ok) {
      const jsonResponse = await response.json();
      // Code to execute with jsonResponse:
      console.log(jsonResponse);
      const staleChargers = jsonResponse.filter((charger) =>
        isStale(charger.lastSeen)
      );
      console.log(staleChargers);
    } else {
      // Handles response if unsuccessful
      throw new Error("Request failed!");
    }
  } catch (error) {
    console.log(error);
  }
};

getData();
