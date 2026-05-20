import { useEffect } from "react";
import { FilmType } from "../../types/entities";
import styles from "./styles/filmsPage.module.scss";
import FilmCard from "../../components/ui/film/FilmCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { fetchAllFilms } from "../../features/Film/filmSlice";
import { Circles } from "react-loader-spinner";

const breakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1000: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

const FilmsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const films = useAppSelector((state) => state.films.list);
  const status = useAppSelector((state) => state.films.status);
  console.log(films);

  useEffect(() => {
    dispatch(fetchAllFilms(""));
  }, []);

  return (
    <div className={styles.wrapper}>
      {status === "loading" && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {status === "completed" && (
        <Swiper className={styles.swiper} breakpoints={breakpoints}>
          {films?.map((film: FilmType) => {
            return (
              <SwiperSlide
                key={film.properties?.episode_id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <FilmCard {...film.properties} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default FilmsPage;
