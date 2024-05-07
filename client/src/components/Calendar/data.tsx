import { useMemo } from "react";
import { momentLocalizer, stringOrDate } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";

import { reservationModel, semesterModel } from "@/models";
import { getWeeklyDates } from "@/utils";

moment.locale("pt-br");

export const localizer = momentLocalizer(moment);

export const Messages = (): any => {
  return useMemo(
    () => ({
      week: "Semana",
      work_week: "Semana de trabalho",
      day: "Dia",
      month: "Mês",
      previous: "🡨",
      next: "🡪",
      today: "Hoje",
      agenda: "Agenda",
      date: "Data",
      time: "Horário",
      event: "Reserva",
      noEventsInRange: (
        <p className="h-[80vh] flex items-center justify-center text-2xl text-center text-primary">
          Não há reservas neste período.
        </p>
      ),
      showMore: (total: number) => `+${total} mais`,
      allDay: "Dia inteiro",
    }),
    []
  );
};

export const getEventStyle = (event: any) => {
  const style = {
    borderRadius: "8px",
    backgroundColor: event.color,
    color: "#fff",
    border: "1px solid #F6AD55",
  };

  return {
    style: style,
  };
};

export const getReservationWithSemester = (
  reservations: reservationModel[]
) => {
  return reservations.flatMap((reservation) => {
    if (reservation.isSemester) {
      const newSemestralReservations: reservationModel[] = [];
      const formattedStartHour = moment(reservation.start).format("HH:mm");
      const formattedEndHour = moment(reservation.end).format("HH:mm");
      const dayOfWeek = moment(reservation.start).day();

      const weeklyDates = getWeeklyDates(
        dayOfWeek,
        formattedStartHour,
        formattedEndHour,
        reservation?.semester?.initialDayOfSemester!,
        reservation?.semester?.lastDayOfSemester!
      );

      // Verifica se já existe reserva para o mesmo dia
      const hasReservationForDay = (date: stringOrDate) =>
        newSemestralReservations.some(
          (r) =>
            moment(r.start).isSame(date, "day") ||
            moment(r.end).isSame(date, "day")
        );

      weeklyDates.forEach(
        ({ start, end }: { start: stringOrDate; end: stringOrDate }) => {
          // Verifica se já existe reserva para o mesmo dia e adiciona somente se não houver
          if (!hasReservationForDay(start) && !hasReservationForDay(end)) {
            const newSemestralReservation = {
              data: {
                id: reservation.id,
                isSemester: reservation.isSemester,
                status: reservation.status,
                requester: reservation.requester,
                title: reservation.title,
                color: reservation.color,
                ambience: reservation.ambience,
                semester: reservation.semester,
                start,
                end,
              },
            };
            newSemestralReservations.push(newSemestralReservation.data);
          }
        }
      );

      // Retorna as novas reservas semestrais
      return newSemestralReservations;
    }

    // Retorna a reserva normal
    return reservation;
  });
};
