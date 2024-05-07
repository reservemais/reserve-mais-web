import { create } from "zustand";

import { PaginationProps } from "@/store";
import { ambienceModel } from "@/models";
import { buildQuery, formatAmbienceData } from "@/utils";
import {
  createAmbience,
  deleteAmbience,
  editAmbience,
  getAmbiences,
} from "@/services";

interface IAmbiences {
  ambiences: ambienceModel[];
  hasFilteredAmbiences: boolean;
  errorMessage: string;
  selectedAmbience: ambienceModel | null;
  selectedFilter: Pick<
    ambienceModel,
    "type" | "availability" | "numberOfMachines"
  > | null;
  paginationData: PaginationProps | null;
  isLoading: boolean;
  clearErrorMessage: () => void;
  fetchData: (params?: any, filters?: any) => void;
  fetchDataToSelect: (params?: any, filters?: any) => void;
  selectAmbience: (id?: number) => void;
  addAmbience: (newAmbience: ambienceModel) => void;
  editAmbience: (id: number, newAmbience: ambienceModel) => void;
  removeAmbience: (id: number) => void;
}

export const useAmbiencesStore = create<IAmbiences>((set, get) => ({
  ambiences: [],
  selectedAmbience: null,
  selectedFilter: null,
  errorMessage: "",
  hasFilteredAmbiences: false,
  isLoading: true,
  paginationData: null,
  clearErrorMessage: () => set({ errorMessage: "" }),
  fetchData: async (params, filters = null) => {
    const { data, meta } = await getAmbiences(params);

    const formattedData = data.map(formatAmbienceData);

    set({
      ambiences: formattedData,
      paginationData: meta.pagination,
      hasFilteredAmbiences: !!(
        filters &&
        (filters.type !== "" ||
          filters.availability !== "" ||
          filters.numberOfMachines !== "")
      )
        ? true
        : false,
      selectedFilter: filters,
      isLoading: false,
    });
  },
  fetchDataToSelect: async (params) => {
    const { data } = await getAmbiences(params);

    const formattedData = data.map(formatAmbienceData);

    set({
      ambiences: formattedData,
    });
  },
  selectAmbience: (id) => {
    const ambiences = get().ambiences;
    const selectedAmbience =
      ambiences.find((ambience) => ambience.id === id) || null;

    set({ selectedAmbience: !!id ? selectedAmbience : null });
  },
  addAmbience: async (newAmbience) => {
    const response = await createAmbience({ data: newAmbience });
    const params = buildQuery({
      populate: {
        responsibles: {
          populate: "*",
        },
      },
      pagination: {
        page: 1,
        pageSize: 10,
      },
    });

    if (!response.data && !!response.error) {
      set({ errorMessage: response.error.message });

      return response;
    }

    get().fetchData(params);

    return response;
  },
  editAmbience: async (id, newSemester) => {
    const response = await editAmbience(id, { data: newSemester });
    const params = buildQuery({
      populate: {
        responsibles: {
          populate: "*",
        },
      },
      pagination: {
        page: 1,
        pageSize: 10,
      },
    });

    if (!response.data && !!response.error) {
      set({ errorMessage: response.error.message });

      return response;
    }

    get().fetchData(params);

    return response;
  },
  removeAmbience: async (id) => {
    await deleteAmbience(id);
    const params = buildQuery({
      populate: {
        responsibles: {
          populate: "*",
        },
      },
      pagination: {
        page: 1,
        pageSize: 10,
      },
    });

    get().fetchData(params);
  },
}));
