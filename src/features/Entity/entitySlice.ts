// redux/slices/entitySlice.ts
import { createAsyncThunk, createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { Entities } from "../../types";

// Типизация ответа SWAPI
export interface SWAPIResponse<T> {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  result?: T[];
  results?: T[];
}

// Статусы
type Status = "idle" | "loading" | "completed" | "error";

// Состояние слайса
interface EntityState<T> {
  status: Status;
  list: T[];
  count: number;
  currentPage: number;
  selectedEntity: T | null;
  selectedStatus: Status;
  error: string | null;
  search: string;
}

// Универсальный fetchAll thunk
export const createFetchAllThunk = <T extends Entities>(entityName: string, endpoint: string) =>
  createAsyncThunk<{ count: number; result: T[] }, string, { rejectValue: string }>(
    `@@${entityName}/fetchAll`,
    async (page: string, { rejectWithValue }) => {
      try {
        const data = await client<SWAPIResponse<T>>(`${endpoint}?page=${page}&limit=10`);
        if(endpoint === "films") {
        return {
          count: data?.total_records ?? 0,
          result: data?.result ?? [],
        };
        } else {
        return {
          count: data?.total_records ?? 0,
          result: data?.results ?? [],
        };
        }

      } catch {
        return rejectWithValue("Failed to fetch entity data");
      }
    }
  );

// Универсальный fetchById thunk
export const createFetchByIdThunk = <T extends Entities>(entityName: string, endpoint: string) =>
  createAsyncThunk<T | null, string, { rejectValue: string }>(
    `@@${entityName}/fetchById`,
    async (id: string, { rejectWithValue }) => {
      try {
        const data = await client<any>(`${endpoint}/${id}`);
        if (!data) return rejectWithValue("Entity not found");

        // Здесь можно добавить преобразование полей, если нужно
        return data.result.properties;
      } catch {
        return rejectWithValue("Failed to fetch entity data");
      }
    }
  );

// Универсальный search thunk
export const createSearchFetchThunk = <T extends Entities>(entityName: string, endpoint: string) =>
  createAsyncThunk<{ count: number; result: T[] }, string, { rejectValue: string }>(
    `@@${entityName}/fetchBySearch`,
    async (search: string, { rejectWithValue }) => {
      try {
        const data = await client<SWAPIResponse<T>>(
          search === "" ? `${endpoint}/?page=1` : `${endpoint}/?name=${search}`
        );
        return {
          count: data?.total_records ?? 0,
          result: data?.result?.map((item: any) => item.properties) ?? [],
        };
      } catch {
        return rejectWithValue("Failed to fetch entity data");
      }
    }
  );

// Создание слайса сущности
export const createEntitySlice = <T extends Entities>(
  entityName: string,
  fetchAllThunk: ReturnType<typeof createFetchAllThunk<T>>,
  fetchByIdThunk: ReturnType<typeof createFetchByIdThunk<T>>,
  fetchSearchThunk?: ReturnType<typeof createSearchFetchThunk<T>> | null
) => {
  const initialState: EntityState<T> = {
    status: "idle",
    list: [],
    count: 0,
    currentPage: 1,
    selectedEntity: null,
    selectedStatus: "idle",
    error: null,
    search: "",
  };

  const entitySlice = createSlice({
    name: entityName,
    initialState,
    reducers: {
      setPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
      setSearch: (state, action: PayloadAction<string>) => {
        state.search = action.payload;
      },
    },
    extraReducers: (builder) => {
      if (fetchAllThunk) {
        builder
          .addCase(fetchAllThunk.pending, (state) => { state.status = "loading"; })
          .addCase(fetchAllThunk.fulfilled, (state, action) => {
            state.status = "completed";
            state.list = action.payload.result as Draft<T>[];
            state.count = action.payload.count;
          })
          .addCase(fetchAllThunk.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload ?? "Failed to fetch";
          });
      }

      if (fetchByIdThunk) {
        builder
          .addCase(fetchByIdThunk.pending, (state) => { state.selectedStatus = "loading"; })
          .addCase(fetchByIdThunk.fulfilled, (state, action) => {
            state.selectedStatus = "completed";
            state.selectedEntity = action.payload as Draft<T> | null;
          })
          .addCase(fetchByIdThunk.rejected, (state, action) => {
            state.selectedStatus = "error";
            state.error = action.payload ?? "Failed to fetch";
          });
      }

      if (fetchSearchThunk) {
        builder
          .addCase(fetchSearchThunk.pending, (state) => { state.status = "loading"; })
          .addCase(fetchSearchThunk.fulfilled, (state, action) => {
            state.status = "completed";
            state.list = action.payload.result as Draft<T>[];
            state.count = action.payload.count;
          })
          .addCase(fetchSearchThunk.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload ?? "Failed to fetch";
          });
      }
    },
  });

  return entitySlice;
};
