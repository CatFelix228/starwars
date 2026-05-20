import { fetchFilmsById } from "../../features/Film/filmSlice";
import { FilmType } from "../../types";
import EntityPage from "../entity/EntityPage";

const FilmPage: React.FC = () => {
  return (
    <EntityPage<FilmType>
      entityName="films"
      fetchByIdAction={fetchFilmsById}
      titleKey="title"
      fields={[
        { label: "Opening Crawl", key: "opening_crawl" },
        { label: "Director", key: "director" },
        { label: "Producer", key: "producer" },
        { label: "Release date", key: "release_date" },
      ]}
    />
  );
};

export default FilmPage;
