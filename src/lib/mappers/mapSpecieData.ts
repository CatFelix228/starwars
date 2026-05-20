import { SpecieType, LocalSpecieType } from "../../types";
import { mapResources } from "./mapCharacterData";

export const mapSpecieData = (
  specie: SpecieType
): LocalSpecieType => {
  return {
    ...specie,

    films: mapResources(specie.films, "films"),
    residents: mapResources(specie.residents, "characters"),
    species: mapResources(specie.species, "species"),
    starships: mapResources(specie.starships, "starships"),
    vehicles: mapResources(specie.vehicles, "vehicles"),
    characters: mapResources(specie.characters, "characters"),

    planets: mapResources(specie.planets, "planets"),

    pilots: mapResources(specie.pilots, "pilots"),
    people: mapResources(specie.people, "people"),

    homeworld: specie.homeworld
      ? {
          name: "",
          url: `/planets/${specie.homeworld
            .split("/")
            .filter(Boolean)
            .pop()}`,
        }
      : undefined,
  };
};