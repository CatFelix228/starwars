import { CharacterType, LocalCharacterType, LocalEntity } from "../../types";

export const mapResources = (urls: string[] | undefined, type: string): LocalEntity[] =>
  urls?.map((url) => ({
    name: "",
    url: `/${type}/${url.split("/").filter(Boolean).pop()}`,
  })) || [];

export const mapCharacterData = (character: CharacterType): LocalCharacterType => {

  return {
    ...character,
    films: mapResources(character.films, "films"),
    species: mapResources(character.species, "species"),
    starships: mapResources(character.starships, "starships"),
    vehicles: mapResources(character.vehicles, "vehicles"),
    homeworld: {
      name: "",
      url: `/planets/${character.homeworld?.split("/").filter(Boolean).pop()}`,
    },
    planets: mapResources(character.planets, "planets"),  
    characters: mapResources(character.characters, "characters"), 
    pilots: mapResources(character.pilots, "pilots"),
    residents: mapResources(character.residents, "residents"),
    people: mapResources(character.people, "people"),
  };
};
