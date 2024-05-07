import { create } from "zustand";

export type PaginationProps = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

type PaginationStore = {
  pagination: PaginationProps;
  setPagination: (pagination: PaginationProps) => void;
  resetPagination: () => void;
};

export const usePaginationStore = create<PaginationStore>((set) => ({
  pagination: {
    page: 1,
    pageCount: 1,
    pageSize: 10,
    total: 0,
  },
  setPagination: (newPage) => set({ pagination: newPage }),
  resetPagination: () =>
    set({ pagination: { page: 1, pageCount: 1, pageSize: 10, total: 0 } }),
}));
