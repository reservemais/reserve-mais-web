import moment from "moment";
import { stringOrDate } from "react-big-calendar";

export const formatDateToPtBR = (date: stringOrDate) => {
  return moment(date).format("llll");
};

export const getWeeklyDates = (
  dayOfWeek: number,
  startTime: string,
  endTime: string,
  startDate: Date,
  endDate: Date
) => {
  const selectedDaysOfWeek = [dayOfWeek]; // dia da semana selecionado pelo usuário
  const dates: { start: stringOrDate; end: stringOrDate }[] = [];

  // Itera sobre as semanas entre a data inicial e final
  const currentDate = moment(startDate);
  while (currentDate.isBefore(endDate)) {
    // Para cada semana, encontra todas as datas correspondentes ao dia da semana selecionado
    selectedDaysOfWeek.forEach((selectedDayOfWeek) => {
      const daysUntilSelectedDayOfWeek =
        (7 + selectedDayOfWeek - currentDate.day()) % 7;
      const date = moment(currentDate).add(daysUntilSelectedDayOfWeek, "days");
      const startDateTime = moment(date)
        .set("hour", Number(startTime.split(":")[0]))
        .set("minute", Number(startTime.split(":")[1]));
      const endDateTime = moment(date)
        .set("hour", Number(endTime.split(":")[0]))
        .set("minute", Number(endTime.split(":")[1]));
      dates.push({ start: startDateTime.toDate(), end: endDateTime.toDate() });
    });
    currentDate.add(1, "weeks");
  }
  return dates;
};

export const formatDateToFullMonthWithYear = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
  }).format(date);
};
