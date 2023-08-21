const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3005;

// Endpoint to fetch data from another API
app.get("/load", async (req, res) => {
  const apiUrl = "https://api.example.com/data"; // Replace with the actual API URL

  const customHeaders = { ...req.headers };
  const queryParameters = req.query; // Get query parameters from the URL

  try {
    const response = await axios.get(apiUrl, {
      headers: customHeaders,
      params: queryParameters, // Pass through the query parameters
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
