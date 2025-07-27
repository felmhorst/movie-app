import {MovieThumbnail} from "../../../components/MovieThumbnail/MovieThumbnail";
import {MovieSection} from "../../../components/MovieSection/MovieSection";


export default function History() {
    return (
        <>
            <h1>History</h1>
            <MovieSection title={"Juli 2025"}>
                <MovieThumbnail/>
                <MovieThumbnail/>
                <MovieThumbnail/>
            </MovieSection>
        </>
    );
}