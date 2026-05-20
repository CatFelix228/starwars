import { LocalStarshipType, StarshipType } from "../../types";
import { mapResources } from "./mapCharacterData";

export const mapStarshipData = (
  starship: StarshipType
): LocalStarshipType => {
  return {
    ...starship,

    films: mapResources(starship.films, "films"),
    pilots: mapResources(starship.pilots, "characters"),

    residents: mapResources(starship.residents, "characters"),
    species: mapResources(starship.species, "species"),
    vehicles: mapResources(starship.vehicles, "vehicles"),
    characters: mapResources(starship.characters, "characters"),
    planets: mapResources(starship.planets, "planets"),
    starships: mapResources(starship.starships, "starships"),
    people: mapResources(starship.people, "people"),

    homeworld: starship.homeworld
      ? {
          name: "",
          url: `/planets/${starship.homeworld.split("/").filter(Boolean).pop()}`,
        }
      : undefined,
  };
};