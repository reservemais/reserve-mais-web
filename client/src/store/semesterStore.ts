import { create } from "zustand";

import { semesterApiModel, semesterModel } from "@/models";
import {
  createSemester,
  deleteSemester,
  editSemester,
  getSemesters,
} from "@/services";
import { PaginationProps } from "./paginationStore";

interface ISemester {
  semesters: semesterModel[];
  selectedSemester: semesterModel | null;
  paginationData: PaginationProps | null;
  isLoading: boolean;
  errorMessage: string;
  clearErrorMessage: () => void;
  fetchData: (params?: any) => void;
  selectSemester: (id?: number) => void;
  addSemester: (newSemester: semesterModel) => void;
  editSemester: (id: number, newSemester: semesterModel) => void;
  removeSemester: (id: number) => void;
}

export const useSemesterStore = create<ISemester>((set, get) => ({
  semesters: [],
  selectedSemester: null,
  isLoading: true,
  errorMessage: "",
  paginationData: null,
  fetchData: async (params) => {
    const { data, meta } = await getSemesters(params);

    const formattedData = data.map((semester: semesterApiModel) => ({
      id: semester.id,
      semester: semester.attributes.semester,
      initialDayOfSemester: semester.attributes.initialDayOfSemester,
      lastDayOfSemester: semester.attributes.lastDayOfSemester,
      currentSemester: semester.attributes.currentSemester,
    }));

    set({
      semesters: formattedData,
      paginationData: meta.pagination,
      isLoading: false,
    });
  },
  clearErrorMessage: () => set({ errorMessage: "" }),
  selectSemester: (id) => {
    const semesters = get().semesters;
    const selectedSemester =
      semesters.find((semester) => semester.id === id) || null;

    set({ selectedSemester: !!id ? selectedSemester : null });
  },
  addSemester: async (newSemester) => {
    const response = await createSemester({ data: newSemester });

    if (!response.data && !!response.error) {
      set({ errorMessage: response.error.message });

      return response;
    }

    get().fetchData();

    return response;
  },
  editSemester: async (id, newSemester) => {
    const response = await editSemester(id, { data: newSemester });

    if (!response.data && !!response.error) {
      set({ errorMessage: response.error.message });

      return response;
    }

    get().fetchData();

    return response;
  },
  removeSemester: async (id) => {
    await deleteSemester(id);

    get().fetchData();
  },
}));
