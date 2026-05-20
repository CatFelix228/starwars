import { Link } from "react-router";
import styles from "./entityCard.module.scss";

interface EntityProps<T extends { name: string; url: string }> {
  entity: T;
  basePath: string;
  index?: number;
}

const EntityCard = <T extends { name: string; url: string }>({
  entity,
  basePath,
  index = 0,
}: EntityProps<T>) => {
  const match = entity.url.match(/\/(\d+)\/?$/);

  const id = match ? match[1] : null;

  return (
    <Link
      to={id ? `/${basePath}/${id}` : "#"}
      className={styles.card}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <p>{entity.name}</p>
    </Link>
  );
};

export default EntityCard;
