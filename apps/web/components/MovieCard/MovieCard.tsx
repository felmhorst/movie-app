import {Movie} from "@/constants/types";
import styles from "./MovieCard.module.css";
import {Button} from "@/components/Button/Button";

interface MovieCardProps {
    movie: Movie
}

export const MovieCard = (props: MovieCardProps) => {
    const {
        movie
    } = props;

    return (
        <section className={styles.container}>
            <div className={styles.card}>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <Button>Ansehen</Button>
            </div>
        </section>
    )
};