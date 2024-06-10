const express = require("express");
const axios = require("axios");
const app = express();

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTE2YzdkNTk3NTU2ZmJiZjhjZjk4MDIzOTE2YzIwNyIsInN1YiI6IjY2NDIyYTg3MmI1MWE4MjQ4NDIxMDdjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WEtex5blNrgiv-n7vr3meb1-g9xJOvskdsCaWFQAIKQ",
    },
};

app.use("/", express.static("public"));

app.get("api/genres", async (req, res) => {
    try {
        const response = await axios.get(
            `hhttps://api.themoviedb.org/3/genre/movie/list?language=en`,
            options
        );
        res.json(response);
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

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
