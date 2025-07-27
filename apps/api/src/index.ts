import express from "express";
import cors from "cors";
import moment from "moment";
const PORT: number = 5000;
const app = express();

interface Movie {
    title?: string;
    overview?: string;
    posterPath?: string;
    watchDate?: number;
}

const TEST_MOVIE: Movie = {
    "title": "The Silence of the Lambs",
    "overview": "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
    "posterPath": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    "watchDate": moment.now(),
};

const corsConfig = {
    origin: "*"
};
app.use(cors(corsConfig));

app.get("/watchlist", (req, res) => {
    res.send([TEST_MOVIE, TEST_MOVIE]);
});

app.get("/history", (req, res) => {
    res.send([
        TEST_MOVIE,
        TEST_MOVIE,
        TEST_MOVIE,
        {...TEST_MOVIE, watchDate: moment().subtract(1, "month").valueOf()},
        {...TEST_MOVIE, watchDate: moment().subtract(3, "month").valueOf()}
    ]);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});