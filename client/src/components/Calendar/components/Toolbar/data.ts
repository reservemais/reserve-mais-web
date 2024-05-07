import { View } from "react-big-calendar";

type handleMiddleTextProps = {
  monthYear: string;
  view: View;
  date: Date;
};

export const handleMiddleText = ({
  monthYear,
  view,
  date,
}: handleMiddleTextProps) => {
  let middleText = monthYear;

  if (view === "week") {
    const start = new Date(date);
    const end = new Date(date);

    start.setDate(start.getDate() - start.getDay());
    end.setDate(start.getDate() + 6);

    middleText = `${start.toLocaleString("pt-BR", {
      month: "long",
      day: "numeric",
    })} - ${end.toLocaleString("pt-BR", {
      month: "long",
      day: "numeric",
    })}`;
  } else if (view === "day") {
    middleText = date.toLocaleString("pt-BR", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  } else if (view === "agenda") {
    const start = new Date(date);
    const end = new Date(date);

    end.setMonth(start.getMonth() + 1);

    middleText = `${start.toLocaleString("pt-BR", {
      month: "long",
      day: "numeric",
    })} - ${end.toLocaleString("pt-BR", {
      month: "long",
      day: "numeric",
    })}`;
  }

  return middleText;
};
