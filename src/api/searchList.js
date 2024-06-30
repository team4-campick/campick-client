import getURL from "./url.js";

export default async function handler(req, res) {
  const { query } = req;
  const queryStr = Object.entries(query)
    .map(([key, value]) => `&${key}=${encodeURI(value)}`)
    .join("");
  try {
    const response = await fetch(`${getURL("searchList")}${queryStr}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
