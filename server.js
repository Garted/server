const express = require("express");
const axios = require("axios");
const app = express();

// Маршрут для получения данных о персонаже по ID

app.use("/", express.static("public"));

app.get("/api/character/2", async (req, res) => {
    try {
        const response = await axios.get(
            `https://rickandmortyapi.com/api/character/2`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

app.get("/api/data", (req, res) => {
    res.json({
        name: "Jack",
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
