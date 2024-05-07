import { create } from "zustand";

import { reservationModel, semesterModel } from "@/models";
import { formatReservationData } from "@/utils";
import {
  createReservation,
  deleteReservation,
  getReservations,
  updateReservation,
} from "@/services";
import { PaginationProps } from "@/store";
import { getReservationWithSemester } from "@/components/Calendar/data";

interface IReservation {
  reservations: reservationModel[];
  filteredReservations: reservationModel[];
  hasFilteredReservations: boolean;
  selectedFilter: { value: string; type: string } | null;
  errorMessage: string;
  paginationData: PaginationProps | null;
  fetchData: (params?: any, filters?: any) => void;
  addReservation: (newReservation: reservationModel) => any;
  setErrorMessage: (message: string) => void;
  editReservation: (id: number, value: reservationModel) => any;
  removeReservation: (id: number) => void;
  clearErrorMessage: () => void;
  filterReservations: (
    type?: string,
    value?: string,
    semesters?: semesterModel[]
  ) => void;
}

export const useReservationStore = create<IReservation>((set, get) => ({
  reservations: [],
  filteredReservations: [],
  hasFilteredReservations: false,
  selectedFilter: null,
  errorMessage: "",
  paginationData: null,
  fetchData: async (params) => {
    const { data, meta } = await getReservations(params);

    const formattedData = data.map(formatReservationData);

    set({
      reservations: formattedData,
      paginationData: meta.pagination,
    });
  },
  addReservation: async (newReservation) => {
    const updatedReservation = {
      data: {
        ...newReservation,
        requester: { id: newReservation.requester.id },
        ...(newReservation.isSemester && {
          semester: { id: newReservation.semester?.id },
        }),
        ambience: { id: newReservation.ambience.id },
      },
    };

    const response = await createReservation(updatedReservation);

    if (response.status >= 400 || response.status <= 500) {
      return { status: response.status, data: response.data };
    }

    return { status: response.status, data: response.data.data };
  },
  editReservation: async (id, value) => {
    const updatedReservation = {
      data: {
        ...value,
        status: "pending",
        requester: { id: value.requester.id },
        ambience: { id: value.ambience.id },
        ...(value.isSemester && {
          semester: { id: value.semester?.id },
        }),
      },
    };

    const response = await updateReservation(id, updatedReservation);

    if (response.status >= 400 || response.status <= 500) {
      return { status: response.status, data: response.data };
    }

    return { status: response.status, data: response.data.data };
  },
  removeReservation: async (id) => {
    await deleteReservation(id);

    set((state) => ({
      reservations: state.reservations.filter(
        (reservation) => reservation.id !== id
      ),
    }));
  },
  setErrorMessage: (message) => set({ errorMessage: message }),
  clearErrorMessage: () => set({ errorMessage: "" }),
  filterReservations: (type = "", value = "", semesters) => {
    if (type.trim() === "" && value.trim() === "") {
      set({
        filteredReservations: [],
        selectedFilter: null,
        hasFilteredReservations: false,
      });
    } else {
      set((state) => {
        let filteredReservations = getReservationWithSemester(
          state.reservations
        );

        if (type.trim() !== "") {
          const isSemester = type === "Semestral";

          filteredReservations = filteredReservations.filter(
            (item) => item.isSemester === isSemester
          );
        }
        if (value.trim() !== "") {
          filteredReservations = filteredReservations.filter(
            (item) => item.ambience.id === Number(value)
          );
        }

        return {
          filteredReservations,
          selectedFilter: { type, value },
          hasFilteredReservations: true,
        };
      });
    }
  },
}));
