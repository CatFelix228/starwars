import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice, createSearchFetchThunk } from "../Entity/entitySlice";
import { StarshipType } from "../../types";


export const fetchAllStarships = createFetchAllThunk<StarshipType>("starships", "starships");
export const fetchStarshipById = createFetchByIdThunk<StarshipType>("starships", "starships");
export const fetchSearchStarship = createSearchFetchThunk<StarshipType>("starships", "starships");

const starshipsSlice = createEntitySlice<StarshipType>( 
  "starships", 
  fetchAllStarships,
  fetchStarshipById,
  fetchSearchStarship
)

export const { setPage } = starshipsSlice.actions;
export default starshipsSlice.reducer;
