import "react-toastify/dist/ReactToastify.css";

import { create } from "zustand";
import { toast } from "react-toastify";

type ToastNotificationState = {
  isVisible: boolean;
  message: string;
  type: "success" | "error" | "info";
  show: (message: string, type: "success" | "error" | "info") => void;
};

export const useToastNotificationStore = create<ToastNotificationState>(
  (set) => ({
    isVisible: false,
    message: "",
    type: "info",
    show: (message, type) => {
      set(() => ({
        isVisible: true,
        message,
        type,
      }));
      switch (type) {
        case "success":
          toast.success(message, { position: "bottom-right" });
          break;
        case "error":
          toast.error(message, { position: "bottom-right" });
          break;
        default:
          toast.info(message, { position: "bottom-right" });
          break;
      }
    },
  })
);
