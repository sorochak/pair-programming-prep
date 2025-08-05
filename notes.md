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
