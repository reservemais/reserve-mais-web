"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import React, { useEffect, useState } from "react";
import { Calendar as ReactBigCalendar, SlotInfo } from "react-big-calendar";
import { ToastContainer } from "react-toastify";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import {
  useCalendarStore,
  useReservationStore,
  useModalStore,
  useToastNotificationStore,
  useSemesterStore,
  useAmbiencesStore,
} from "@/store";
import { reservationModel } from "@/models";
import { ambienceQueries, reservationQueries } from "@/queries";
import { useAuth } from "@/hooks";
import {
  Modal,
  ReservationViewModal,
  ReservationForm,
  NoAuthenticatedViewModal,
  CalendarFilter,
} from "@/components";

import { Event, Toolbar } from "./components";
import * as D from "./data";

const DnDCalendar = withDragAndDrop(ReactBigCalendar);

const Calendar = () => {
  const {
    reservations,
    editReservation,
    hasFilteredReservations,
    filteredReservations,
    fetchData,
  } = useReservationStore();
  const { fetchData: fetchDataSemester, semesters } = useSemesterStore();
  const { toggleVisibility, modalType } = useModalStore();
  const { isVisible, show } = useToastNotificationStore();
  const {
    addCalendarData,
    addSelectedCalendarData,
    calendarEvent,
    setCalendarEvent,
  } = useCalendarStore();
  const { fetchDataToSelect } = useAmbiencesStore();
  const { isAuthenticated, session } = useAuth();
  const [currentView, setCurrentView] = useState("month");

  const { queryToSelect } = ambienceQueries();
  const { query } = reservationQueries(Number(session?.user?.id!));

  const handleOpenModalToNewEvent = (slotInfo: SlotInfo) => {
    toggleVisibility(true, "form");
    addCalendarData(slotInfo);
  };

  const handleOpenModalToSelectedReservation = (event: reservationModel) => {
    toggleVisibility(true, "view");
    addSelectedCalendarData(event);
  };

  const handleDnDAndResizeReservation = async (event: any) => {
    const newData: reservationModel = {
      id: event.event.id,
      requester: event.event.requester,
      ambience: event.event.ambience,
      semester: event.event.semester,
      start: event.start,
      end: event.end,
      title: event.event.title,
      isSemester: event.event.isSemester,
      status: event.event.status,
      color: event.event.color,
    };

    const response = await editReservation(event.event.id, newData);
    if (response.status === 200) {
      toggleVisibility(false);
      fetchData(query);
    } else {
      show("Já existe uma reserva nesta sala neste horário.", "error");
    }
  };

  useEffect(() => {
    (async () => {
      fetchData(query);
      fetchDataSemester();
      fetchDataToSelect(queryToSelect);
    })();
  }, [fetchData, fetchDataSemester, fetchDataToSelect, query, queryToSelect]);

  return (
    <div className="mx-2 shadow-md App">
      <DnDCalendar
        views={["month", "week", "day", "agenda"]}
        messages={D.Messages()}
        selectable
        step={10}
        min={new Date(new Date().setHours(7, 10, 0))}
        max={new Date(new Date().setHours(22, 0, 0))}
        timeslots={5}
        localizer={D.localizer}
        components={{
          toolbar: Toolbar,
          event: Event,
        }}
        eventPropGetter={D.getEventStyle}
        defaultDate={new Date()}
        defaultView="week"
        events={
          hasFilteredReservations
            ? filteredReservations
            : D.getReservationWithSemester(reservations)
        }
        className="bg-slate-50"
        onSelectEvent={(reservation: any) => {
          setCalendarEvent("selectEvent");
          handleOpenModalToSelectedReservation(reservation);
        }}
        onSelectSlot={(slotInfo: SlotInfo) => {
          setCalendarEvent("selectSlot");
          handleOpenModalToNewEvent(slotInfo);
        }}
        style={{ height: "90vh", borderRadius: 8, overflow: "hidden" }}
        onEventDrop={handleDnDAndResizeReservation}
        onEventResize={handleDnDAndResizeReservation}
        resizableAccessor={() => currentView !== "month"}
        onView={(view) => setCurrentView(view)}
        draggableAccessor={(event: any) => {
          if (event.requester.id !== Number(session?.user?.id!)) return false;

          return true;
        }}
      />

      {isVisible && <ToastContainer />}

      {modalType !== "filter" && calendarEvent === "selectEvent" ? (
        <Modal>
          <ReservationViewModal />
        </Modal>
      ) : modalType === "filter" ? (
        <Modal>
          <CalendarFilter />
        </Modal>
      ) : !isAuthenticated ? (
        <Modal>
          <NoAuthenticatedViewModal />
        </Modal>
      ) : (
        <Modal>
          <ReservationForm />
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
