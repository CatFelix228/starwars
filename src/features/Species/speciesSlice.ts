import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice, createSearchFetchThunk } from "../Entity/entitySlice";
import { SpecieType } from "../../types";


export const fetchAllSpecies = createFetchAllThunk<SpecieType>("species", "species");
export const fetchSpecieById = createFetchByIdThunk<SpecieType>("species", "species");
export const fetchSearchSpecie = createSearchFetchThunk<SpecieType>("species", "species");

const speciesSlice = createEntitySlice<SpecieType>( 
  "species", 
  fetchAllSpecies,
  fetchSpecieById,
  fetchSearchSpecie
);

export const { setPage } = speciesSlice.actions;
export default speciesSlice.reducer;
