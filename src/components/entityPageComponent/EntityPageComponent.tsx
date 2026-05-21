import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./entityPageComponent.module.scss";

interface EntityProps<T> {
  entity: T | null;
  titleKey: keyof T;
  fields: {
    label: string;
    key: keyof T;
    isLink?: boolean;
  }[];
}

type LinkItem = {
  name: string;
  url: string;
};

const linksCache: Record<string, LinkItem> = {};

function EntityPageComponent<T>({ entity, titleKey, fields }: EntityProps<T>) {
  const [linkNames, setLinkNames] =
    useState<Record<string, LinkItem>>(linksCache);

  if (!entity) return null;

  const getLocalPath = (url: string) => {
    const parts = url.split("/").filter(Boolean);

    const id = parts.at(-1);
    const type = parts.at(-2);

    return `/${type}/${id}`;
  };

  useEffect(() => {
    const urls: string[] = [];

    fields.forEach(({ key, isLink }) => {
      if (!isLink) return;

      const value = entity[key];

      if (Array.isArray(value)) {
        urls.push(...value);
      } else if (typeof value === "string") {
        urls.push(value);
      }
    });

    const uniqueUrls = [...new Set(urls)];

    uniqueUrls.forEach(async (url) => {
      if (linksCache[url]) return;

      try {
        const response = await fetch(url);

        const data = await response.json();

        const item = {
          name:
            data?.result?.properties?.name ||
            data?.result?.properties?.title ||
            "Unknown",
          url,
        };

        linksCache[url] = item;

        setLinkNames((prev) => ({
          ...prev,
          [url]: item,
        }));
      } catch {
        const item = {
          name: "Failed to load",
          url,
        };

        linksCache[url] = item;

        setLinkNames((prev) => ({
          ...prev,
          [url]: item,
        }));
      }
    });
  }, [entity]);

  const renderLink = (url: string) => {
    const item = linkNames[url];

    return <Link to={getLocalPath(url)}>{item?.name || "Loading..."}</Link>;
  };

  const renderFieldValue = (value: any, isLink?: boolean) => {
    if (!value || value === "n/a") {
      return <p>N/A</p>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <p>N/A</p>;
      }

      return (
        <>
          {value.map((item) => (
            <p key={item}>{isLink ? renderLink(item) : item}</p>
          ))}
        </>
      );
    }

    if (isLink && typeof value === "string") {
      return <p>{renderLink(value)}</p>;
    }

    if (typeof value === "object") {
      return <p>{JSON.stringify(value)}</p>;
    }

    return <p>{String(value)}</p>;
  };

  return (
    <div className={styles.entitywrapper}>
      <div className={styles.mainBlock}>
        <div className={styles.title}>
          <h2>{String(entity[titleKey])}</h2>
        </div>

        <div className={styles.info}>
          {fields.map(({ label, key, isLink }) => (
            <div className={styles.block} key={String(key)}>
              <h2>{label}:</h2>

              {renderFieldValue(entity[key], isLink)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EntityPageComponent;
