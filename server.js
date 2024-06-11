const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTE2YzdkNTk3NTU2ZmJiZjhjZjk4MDIzOTE2YzIwNyIsInN1YiI6IjY2NDIyYTg3MmI1MWE4MjQ4NDIxMDdjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WEtex5blNrgiv-n7vr3meb1-g9xJOvskdsCaWFQAIKQ",
    },
};

app.use("/", express.static("public"));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
    })
);
app.get("/api/genres", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?language=en`,
            options
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

app.post("/api/films", async (req, res) => {
    const { additionalString } = req.body;
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US${additionalString}`,
            options
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

app.post("/api/singlemovie", async (req, res) => {
    const { id } = req.body;
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

app.post("/api/trailler", async (req, res) => {
    const { id } = req.body;
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            options
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

app.get("/api/img/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    const imageUrl = `https://image.tmdb.org/t/p/w200/${id}`;
    try {
        const response = await axios.get(imageUrl, { responseType: "stream" });

        res.setHeader("Content-Type", response.headers["content-type"]);
        response.data.pipe(res);
    } catch (error) {
        console.error("Error fetching image from remote server:", error);
        res.status(500).json({
            error: "Error fetching image from remote server",
        });
    }
});
app.get("/api/bigimg/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    const imageUrl = `https://image.tmdb.org/t/p/w300/${id}`;
    try {
        const response = await axios.get(imageUrl, { responseType: "stream" });
        res.setHeader("Content-Type", response.headers["content-type"]);
        response.data.pipe(res);
    } catch (error) {
        console.error("Error fetching image from remote server:", error);
        res.status(500).json({
            error: "Error fetching image from remote server",
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
