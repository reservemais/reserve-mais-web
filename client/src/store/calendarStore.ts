import { SlotInfo } from "react-big-calendar";
import { create } from "zustand";

import { reservationModel } from "@/models";

interface ICalendar {
  calendarData: SlotInfo | null;
  selectedCalendarData: reservationModel | null;
  calendarEvent: "" | "selectSlot" | "selectEvent";
  addCalendarData: (slotInfo: SlotInfo) => void;
  addSelectedCalendarData: (reservation: reservationModel) => void;
  cleanData: () => void;
  setCalendarEvent: (event: "" | "selectSlot" | "selectEvent") => void;
}

export const useCalendarStore = create<ICalendar>((set) => ({
  calendarData: null,
  selectedCalendarData: null,
  calendarEvent: "",
  addCalendarData: (slotInfo) => {
    set({
      calendarData: slotInfo,
    });
  },
  addSelectedCalendarData: (reservation) => {
    set({
      selectedCalendarData: reservation,
    });
  },
  cleanData: () => {
    set({ calendarData: null, selectedCalendarData: null });
  },
  setCalendarEvent: (event) => {
    set({ calendarEvent: event });
  },
}));
