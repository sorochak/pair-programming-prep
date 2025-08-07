# Useful Patterns

## Fetch in Node

- wrap in `try/catch` for error handling
- Always `.json()` the response

## useEffect in React

```js
useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch("/api");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  }
  fetchData();
}, []);
```

## async GET Requests

```js
const getData = () => {

  try{
    // Send request
    const response = await fetch('url');

    // handle response if successful
    if (response.ok) {
      const jsonResponse = await response.json();
      // Code to execute with jsonResponse
      console.log(jsonResponse);
    } else {
      // Handles response if unsuccessful
      throw new Error('Request failed!');
    }

  } catch (err) {
    console.log(error);
  }
}
```

## async POST Requests

```js
// async await POST

const getData = async () => {
  try {
    // Sends request
    const response = await fetch("https://api-to-call.com/endpoint", {
      method: "POST",
      body: JSON.stringify({ id: 200 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handles response if successful
    if (response.ok) {
      const jsonResponse = await response.json();
      // Code to execute with jsonResponse
      console.log(jsonResponse);
    } else {
      // Handles response if unsuccessful
      throw new Error("Request failed!");
    }
  } catch (error) {
    console.log(error);
  }
};
```

## groupBy function:

```js
const groupBy = (arr, keyFn) => {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] ?? [];
    acc[key].push(item);
    return acc;
  }, {});
};
```

# Starter Script:

```js
// script.js

async function fetchData() {
  const res = await fetch("https://api.example.com/data");
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main(); // <--- kick off your script
```

# Testing Utilities with Jest

## Install Jest

```bash
npm install --save-dev jest
```

In your `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

---

## Basic Test Template

```js
// example.test.js

describe("description of the function group", () => {
  test("what the test checks", () => {
    const result = myFunction(input);
    expect(result).toBe(expectedValue);
  });
});
```

---

## Test: Filter items from array

```js
// utils.test.js
const { filterCanadianNetworks } = require("./utils");

test("filters only Canadian networks", () => {
  const networks = [
    { location: { country: "CA" } },
    { location: { country: "US" } },
    { location: { country: "CA" } },
  ];
  const result = filterCanadianNetworks(networks);
  expect(result.length).toBe(2);
  expect(result.every((n) => n.location.country === "CA")).toBe(true);
});
```

---

## Test: Summarize data from array

```js
// utils.test.js
const { summarizeStations } = require("./utils");

test("calculates total stations and available bikes", () => {
  const stations = [
    { free_bikes: 3 },
    { free_bikes: 5 },
    { free_bikes: null },
    {},
  ];
  const result = summarizeStations(stations);
  expect(result.totalStations).toBe(4);
  expect(result.totalBikes).toBe(8); // 3 + 5 + 0 + 0
});
```

---

## Test: Format output string

```js
// utils.test.js
const { formatSummary } = require("./utils");

test("formats the network summary correctly", () => {
  const network = { name: "Mobi", city: "Vancouver" };
  const summary = { totalStations: 100, totalBikes: 200 };
  const result = formatSummary(network, summary);
  expect(result).toContain("Mobi - Vancouver");
  expect(result).toContain("Stations: 100");
  expect(result).toContain("Available Bikes: 200");
});
```

---

## Testing async function

```js
// asyncFn.test.js
const { fetchAllNetworks } = require("./api");
const fetch = require("node-fetch");

jest.mock("node-fetch", () => jest.fn());

test("fetchAllNetworks returns parsed data", async () => {
  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ networks: [{ id: "abc" }] }),
  });

  const result = await fetchAllNetworks();
  expect(result).toEqual([{ id: "abc" }]);
});
```
