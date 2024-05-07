import { create } from "zustand";

import { reservationModel } from "@/models";
import { getReservations, updateReservation } from "@/services";
import { formatReservationData } from "@/utils";
import { PaginationProps } from "./paginationStore";

interface ISolicitation {
  solicitations: reservationModel[];
  selectedSolicitation: reservationModel | null;
  paginationData: PaginationProps | null;
  isLoading: boolean;
  hasFilteredAmbiences: boolean;
  selectedFilter: Pick<reservationModel, "status"> | null;
  fetchData: (params?: any, filters?: any) => void;
  changeStatusAndReasonSolicitation: (
    status: string,
    reason?: string,
    params?: any
  ) => void;
  selectSolicitation: (id?: number) => void;
}

export const useSolicitationStore = create<ISolicitation>((set, get) => ({
  solicitations: [],
  selectedSolicitation: null,
  selectedFilter: null,
  paginationData: null,
  isLoading: true,
  hasFilteredAmbiences: false,
  fetchData: async (params, filters = null) => {
    const { data, meta } = await getReservations(params);

    const formattedData = data.map(formatReservationData);

    set({
      solicitations: formattedData,
      paginationData: meta.pagination,
      hasFilteredAmbiences: !!filters ? true : false,
      selectedFilter: filters,
      isLoading: false,
    });
  },
  changeStatusAndReasonSolicitation: async (status, reason, params) => {
    const selectedSolicitation = get().selectedSolicitation;

    const body = {
      data: {
        ...selectedSolicitation,
        status: status,
        reasonForDisapproved: reason,
      },
    };

    const { data } = await updateReservation(
      selectedSolicitation?.id!,
      body,
      params
    );

    const formattedData = formatReservationData(data.data);

    // Atualize a lista de solicitações com a solicitação atualizada
    const updatedSolicitations = get().solicitations.map((solicitation) => {
      if (solicitation.id === formattedData.id) {
        return formattedData;
      } else {
        return solicitation;
      }
    });

    set({
      selectedSolicitation: formattedData,
      solicitations: updatedSolicitations,
    });
  },
  selectSolicitation: (id) => {
    const solicitations = get().solicitations;

    const selectedSolicitation =
      solicitations.find((solicitation) => solicitation.id === id) || null;

    set({ selectedSolicitation: !!id ? selectedSolicitation : null });
  },
}));
