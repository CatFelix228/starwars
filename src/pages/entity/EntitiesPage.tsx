import { useEffect } from "react";
import { Entities, FilmType } from "../../types/entities";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "./entitiesPage.module.scss";
import Pagination from "../../components/ui/pagination/Pagination";
import EntityCard from "../../components/ui/entityCard/EntityCard";
import SearchInput from "../../components/ui/searchInput/SearchInput";

type EntitiesWithoutFilms = Exclude<Entities, FilmType>;

interface EntityListPageProps<T extends EntitiesWithoutFilms> {
  fetchAllAction: (page: string) => any;
  setPageAction: (page: number) => any;
  selector: (state: any) => {
    list: T[];
    status: string;
    currentPage: number;
    count: number;
  };
  basePath: string;
  fetchOnSearch: (searchQuery: string) => any;
}

const EntitiesPage = <T extends EntitiesWithoutFilms>({
  fetchAllAction,
  setPageAction,
  selector,
  basePath,
  fetchOnSearch,
}: EntityListPageProps<T>) => {
  const dispatch = useAppDispatch();
  const { list, status, currentPage, count } = useAppSelector(selector);
  const totalPages = Math.ceil(count / 10);

  useEffect(() => {
    dispatch(fetchAllAction(String(currentPage)));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPageAction(page));
  };

  const handleSearch = (searchQuery: string) => {
    dispatch(fetchOnSearch(searchQuery));
  };

  return (
    <div className={styles.pageWrapper}>
      {<SearchInput fetchOnSearch={handleSearch} />}
      <div className={styles.list}>
        {status === "loading" && (
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
        )}
        {status === "completed" && (
          <>
            <div className={styles.listWrapper}>
              {list.map((entity, index) => (
                <EntityCard
                  entity={entity}
                  basePath={basePath}
                  key={entity.url}
                  index={index}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EntitiesPage;
