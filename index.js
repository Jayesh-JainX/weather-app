const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://online-weather-updates.netlify.app",
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/weather", (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ message: "Missing city parameter" });
  }

  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((weatherData) => {
      res.json(weatherData);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
