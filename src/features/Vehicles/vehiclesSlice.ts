import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice, createSearchFetchThunk } from "../Entity/entitySlice";
import { VehicleType } from "../../types";


export const fetchAllVehicles = createFetchAllThunk<VehicleType>("vehicles", "vehicles");
export const fetchVehicleById = createFetchByIdThunk<VehicleType>("vehicles", "vehicles");
export const fetchSearchVehicle = createSearchFetchThunk<VehicleType>("vehicles", "vehicles");

const vehiclesSlice = createEntitySlice<VehicleType>( 
  "vehicles", 
  fetchAllVehicles,
  fetchVehicleById,
  fetchSearchVehicle
);

export const { setPage } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
