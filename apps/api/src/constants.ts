// movie test
import moment from "moment";

export interface Movie {
    title?: string;
    overview?: string;
    posterPath?: string;
    watchDate?: number;
}
export const TEST_MOVIE: Movie = {
    "title": "The Silence of the Lambs",
    "overview": "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
    "posterPath": "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    "watchDate": moment.now(),
};