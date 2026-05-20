import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import styles from "./entityPage.module.scss";
import EntityPageComponent from "../../components/entityPageComponent/EntityPageComponent";
import { RootStateKeys } from "../../store";
import { Entities } from "../../types";

interface EntityPageProps<T> {
  entityName: RootStateKeys;
  fetchByIdAction: (id: string) => any;
  fields: { label: string; key: keyof T; isLink?: boolean }[];
  titleKey: keyof T;
}

const EntityPage = <T extends Entities>({
  entityName,
  fetchByIdAction,
  fields,
  titleKey,
}: EntityPageProps<T>) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state[entityName].selectedStatus);
  const entity = useAppSelector(
    (state) => state[entityName]?.selectedEntity,
  ) as T | null;
  const error = useAppSelector((state) => state[entityName].error);

  useEffect(() => {
    if (id) {
      dispatch(fetchByIdAction(id));
    }
  }, [id, dispatch, fetchByIdAction]);

  return (
    <div className={styles.wrapper}>
      {status === "loading" && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          visible={true}
        />
      )}

      {status === "error" && <h2>{error}</h2>}

      {status === "completed" && entity && (
        <EntityPageComponent<T>
          entity={entity}
          titleKey={titleKey}
          fields={fields}
        />
      )}
    </div>
  );
};

export default EntityPage;
