# JavaScript Cheatsheet: Explore & Understand API Data

Use these methods to inspect and debug data during interviews or real-world work.

---

## General Exploration

```js
console.log(typeof data); // 'object' or 'array'?
console.log(Array.isArray(data)); // true if it's an array
console.log(data); // print the raw data
```

---

## For Arrays (e.g. JSON lists)

### Preview data

```js
console.log(data.length); // Number of items
console.log(data[0]); // First item
console.log(data.slice(0, 3)); // Preview first few items
```

### Explore structure of one item

```js
console.log(Object.keys(data[0])); // List keys
console.log(JSON.stringify(data[0], null, 2)); // Pretty-print
```

### Check for missing or problematic fields

```js
data.forEach((item) => {
  if (!item.status || item.status === "Unknown") {
    console.warn("Needs attention:", item);
  }
});
```

### Extract a specific field

```js
const siteNames = data.map((item) => item.addressInfo?.title);
console.log(siteNames);
```

---

## For Objects (e.g. response lookup maps)

### Explore keys and values

```js
console.log(Object.keys(obj)); // ['key1', 'key2', ...]
console.log(Object.values(obj)); // ['value1', 'value2', ...]
console.log(Object.entries(obj)); // [['key1', 'value1'], ...]
```

### Loop through key/value pairs

```js
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

---

## Misc Tips

### Optional chaining (safe nested access)

```js
console.log(data[0]?.addressInfo?.title);
```

### Pretty-print deeply nested objects (Node.js)

```js
console.dir(data[0], { depth: null });
```

---

## When in Doubt

```js
console.log("DEBUG:", JSON.stringify(data[0], null, 2));
```

---
