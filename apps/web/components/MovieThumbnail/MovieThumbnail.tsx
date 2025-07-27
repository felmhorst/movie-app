import styles from "./MovieThumbnail.module.css";
import Image from "next/image";

interface MovieThumbnailProps {
    poster_path: string;
    title: string;
}

export const MovieThumbnail = ({
    poster_path,
    title
}: MovieThumbnailProps) => {

    return (
        <div className={styles.thumbnail}>
            <Image
                className={styles.image}
                src={poster_path}
                alt={title}
                fill={true}/>
        </div>
    );
};