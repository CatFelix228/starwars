// types/entities.ts

export type BaseEntity = {
  url: string;
  created: string;
  edited: string;
  films?: string[];
  species?: string[];
  starships?: string[];
  vehicles?: string[];
  characters?: string[];
  planets?: string[];
  pilots?: string[];
  residents?: string[];
  homeworld?: string;
  people?: string[];
};

export type FilmType = BaseEntity & {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string; // используем string, чтобы не парсить дату
};

export type CharacterType = BaseEntity & {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
};

export type PlanetType = BaseEntity & {
  name: string;
  climate: string;
  diameter: string;
  gravity: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
};

export type SpecieType = BaseEntity & {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  language: string;
  skin_colors: string;
};

export type StarshipType = BaseEntity & {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
};

export type VehicleType = BaseEntity & {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
};

export type Entities =
  | FilmType
  | CharacterType
  | PlanetType
  | SpecieType
  | StarshipType
  | VehicleType;


  export type LocalEntity = {
  name: string;
  url: string;
};

export type LocalBaseEntity = Omit<
  BaseEntity,
  | "films"
  | "species"
  | "starships"
  | "vehicles"
  | "characters"
  | "planets"
  | "pilots"
  | "residents"
  | "homeworld"
  | "people"
> & {
  films?: LocalEntity[];
  species?: LocalEntity[];
  starships?: LocalEntity[];
  vehicles?: LocalEntity[];
  characters?: LocalEntity[];
  planets?: LocalEntity[];
  pilots?: LocalEntity[];
  residents?: LocalEntity[];
  homeworld?: LocalEntity;
  people?: LocalEntity[];
};

export type LocalCharacterType = Omit<CharacterType, keyof BaseEntity> &
  LocalBaseEntity;

export type LocalFilmType = Omit<FilmType, keyof BaseEntity> &
  LocalBaseEntity;

export type LocalPlanetType = Omit<PlanetType, keyof BaseEntity> &
  LocalBaseEntity;

export type LocalSpecieType = Omit<SpecieType, keyof BaseEntity> &
  LocalBaseEntity;

export type LocalStarshipType = Omit<StarshipType, keyof BaseEntity> &
  LocalBaseEntity;

export type LocalVehicleType = Omit<VehicleType, keyof BaseEntity> &
  LocalBaseEntity;  

export type LocalEntities =
  | LocalFilmType
  | LocalCharacterType
  | LocalPlanetType
  | LocalSpecieType
  | LocalStarshipType
  | LocalVehicleType;