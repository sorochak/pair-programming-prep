/*

Normalize each charger to:

{
  siteName,
  province,
  status,
  powerKW,
  quantity
}
*/

/* 
group chargers by province:

For each province, log:

  total number of chargers

  number that need attention (status = “offline” or missing status)

  total available power (sum of powerKW * quantity)
*/

const API_KEY = "7ea76f10-1472-471e-a557-d88ce3ab1e1c";
const BASE_URL =
  "https://api.openchargemap.io/v3/poi/?output=json&countrycode=CA&camelcase=true&compact=true&maxresults=100";

const groupBy = (arr, keyFn) => {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] ?? [];
    acc[key].push(item);
    return acc;
  }, {});
};

const fetchChargers = async () => {
  try {
    // send request
    const res = await fetch(BASE_URL, {
      headers: {
        "X-API-Key": API_KEY,
        Accept: "application/json",
      },
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const jsonResponse = await res.json();
    return jsonResponse;
  } catch (err) {
    console.error("Network error: ", err);
  }
};

const main = async () => {
  const data = await fetchChargers();

  const chargers = data.flatMap((site) => {
    const siteConnection = site.connections || [];

    return siteConnection.map((conn) => ({
      province: site.addressInfo?.stateOrProvince || "Unknown",
      siteName: site.addressInfo?.title || "Unknown",
      chargerID: conn.id,
      statusID: conn.statusTypeID,
    }));
  });

  console.log(chargers);
  // console.log(data.slice(0, 3));

  // const siteNames = data.forEach((site) => console.log(site.addressInfo.title));
  // const chargers = [];

  // data.forEach((site) => {
  //   const siteConnection = site.connections || [];

  //   siteConnection.forEach((conn) => {
  //     chargers.push({
  //       province: site.addressInfo?.stateOrProvince || "Unknown",
  //       siteName: site.addressInfo?.title || "Unknown",
  //       chargerID: conn.id,
  //       statusID: conn.statusTypeID,
  //     });
  //   });
  // });

  // const groupedByProvince = groupBy(chargers, (charger) => charger.province);

  // console.log(groupedByProvince);

  // console.log(siteNames);
};

main();
