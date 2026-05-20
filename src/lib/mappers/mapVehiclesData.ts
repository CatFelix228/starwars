import { LocalVehicleType, VehicleType } from "../../types";
import { mapResources } from "./mapCharacterData";

export const mapVehicleData = (
  vehicle: VehicleType
): LocalVehicleType => {
  return {
    ...vehicle,

    films: mapResources(vehicle.films, "films"),

    residents: mapResources(vehicle.residents, "characters"),

    starships: mapResources(vehicle.starships, "starships"),

    species: mapResources(vehicle.species, "species"),

    vehicles: mapResources(vehicle.vehicles, "vehicles"),

    characters: mapResources(vehicle.characters, "characters"),

    planets: mapResources(vehicle.planets, "planets"),

    pilots: mapResources(vehicle.pilots, "characters"),

    people: mapResources(vehicle.people, "people"),

    homeworld: vehicle.homeworld
      ? {
          name: "",
          url: `/planets/${vehicle.homeworld
            .split("/")
            .filter(Boolean)
            .pop()}`,
        }
      : undefined,
  };
};