/*
Fetch recent SpaceX launches from a public API. Normalize the data and group launches by year. Print a summary for each year with:

The number of launches

Names of the missions launched that year
*/

const BASE_URL = "https://api.spacexdata.com/v5/launches";

const fetchData = async () => {
  try {
    // send request
    const res = await fetch(BASE_URL);

    if (res.ok) {
      const data = await res.json();
      const normalized = data.map((launch) => {
        return {
          missionName: launch.name,
          date: launch.date_utc,
          year: new Date(launch.date_utc).getFullYear(),
        };
      });
    } else {
      throw new Error(`Error: ${res.status}`);
    }
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  const data = await fetchData();
  return data;
};

main();
