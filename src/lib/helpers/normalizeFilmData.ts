type NormalizedEntity = Record<string, any>;

export function normalizeFilmData(raw: any): NormalizedEntity {
  const props = raw.result.properties;

  const wrapArray = (arr: string[], prefix: string) =>
    arr.map((url, idx) => ({
      name: `${prefix} ${idx + 1}`,
      url,
    }));

  return {
    title: props.title,
    episode_id: props.episode_id,
    director: props.director,
    producer: props.producer,
    release_date: props.release_date,
    opening_crawl: props.opening_crawl,

    planets: wrapArray(props.planets, "Planet"),
    starships: wrapArray(props.starships, "Starship"),
    vehicles: wrapArray(props.vehicles, "Vehicle"),
    characters: wrapArray(props.characters, "Character"),
    species: wrapArray(props.species, "Species"),
  };
}
