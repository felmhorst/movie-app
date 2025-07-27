import {MovieThumbnail} from "../../../components/MovieThumbnail/MovieThumbnail";
import {MovieSection} from "../../../components/MovieSection/MovieSection";

const TEST_MOVIE = {
    "title": "The Silence of the Lambs",
    "overview": "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
    "poster_path": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg"
};

const TEST_WATCHLIST = [TEST_MOVIE, TEST_MOVIE, TEST_MOVIE]

export default function Watchlist() {
    return (
        <>
            <h1>Watchlist</h1>
            <MovieSection title={"Kostenlos in deinen Abos"}>
                {TEST_WATCHLIST.map((movie, index) => (
                    <MovieThumbnail
                        key={index}
                        title={movie.title}
                        poster_path={movie.poster_path}/>
                ))}
            </MovieSection>
        </>
    );
}