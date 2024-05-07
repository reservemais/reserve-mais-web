import { create } from "zustand";

type ModalType =
  | "filter"
  | "form"
  | "delete"
  | "view"
  | "approved"
  | "edit"
  | "add"
  | null;

interface IModal {
  open: boolean;
  modalType:
    | "filter"
    | "form"
    | "delete"
    | "view"
    | "approved"
    | "edit"
    | "add"
    | null;
  toggleVisibility: (isOpen: boolean, modalType?: ModalType) => void;
}

export const useModalStore = create<IModal>((set) => ({
  open: false,
  modalType: null,
  toggleVisibility: (isOpen: boolean, modalType?: ModalType) =>
    set((state) => ({
      open: isOpen,
      modalType: modalType || state.modalType,
    })),
}));
