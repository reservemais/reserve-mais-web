"use client";

import React, { useEffect } from "react";
import { ToolbarProps } from "react-big-calendar";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

import { useAmbiencesStore, useModalStore, useReservationStore } from "@/store";
import { formatDateToFullMonthWithYear } from "@/utils";

import * as D from "./data";

const Toolbar = ({ date, view, onView, onNavigate }: ToolbarProps) => {
  const { filterReservations, hasFilteredReservations, selectedFilter } =
    useReservationStore();
  const { ambiences } = useAmbiencesStore();
  const { toggleVisibility } = useModalStore();

  const monthYear = formatDateToFullMonthWithYear(date);

  useEffect(() => {
    toggleVisibility(true, "filter");
  }, []);

  return (
    <div className="flex flex-col items-center justify-between p-1 sm:flex-row">
      <div className="flex items-center space-x-2">
        <button
          className="p-2 text-gray-700 rounded hover:bg-secondary hover:text-primary focus:bg-secondary focus:outline-none"
          onClick={() => onNavigate("PREV")}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          className="p-2 text-gray-700 rounded hover:bg-secondary hover:text-primary focus:bg-secondary focus:outline-none"
          onClick={() => onNavigate("TODAY")}
        >
          Hoje
        </button>
        <button
          className="p-2 text-gray-700 rounded hover:bg-secondary hover:text-primary focus:bg-secondary focus:outline-none"
          onClick={() => onNavigate("NEXT")}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="font-bold text-center pl-44 text-primary">
        {D.handleMiddleText({ monthYear, view, date })}
      </div>
      <div className="flex items-center space-x-2">
        {hasFilteredReservations && !!selectedFilter?.value && (
          <div className="inline-flex items-center p-2 space-x-2 rounded-lg shadow-md bg-secondary">
            <span className="font-medium text-primary">
              {
                ambiences.find(
                  (item) => item.id === Number(selectedFilter?.value)
                )?.value
              }
            </span>
            <button
              className="px-2 font-medium border-l text-primary border-primary hover:text-red-400"
              onClick={() => filterReservations()}
            >
              X
            </button>
          </div>
        )}
        <button
          className={`p-2 text-gray-700 rounded hover:bg-secondary hover:text-primary focus:bg-secondary focus:outline-none ${
            view === "month" ? "bg-secondary" : ""
          }`}
          onClick={() => onView("month")}
        >
          Mês
        </button>
        <button
          className={`p-2 text-gray-700 rounded hover:bg-secondary hover:text-primary focus:bg-secondary focus:outline-none ${
            view === "week" ? "bg-secondary" : ""
          }`}
          onClick={() => onView("week")}
        >
          Semana
        </button>
        <button
          className={`p-2 text-gray-700 rounded hover:bg-secondary hover:text-primary focus:bg-secondaryfocus:outline-none ${
            view === "day" ? "bg-secondary" : ""
          }`}
          onClick={() => onView("day")}
        >
          Dia
        </button>
        <button
          className={`p-2 text-gray-700 rounded hover:bg-secondary hover:text-primary focus:bg-secondaryfocus:outline-none ${
            view === "agenda" ? "bg-secondary" : ""
          }`}
          onClick={() => onView("agenda")}
        >
          Agenda
        </button>
        <div className="relative inline-block">
          <div
            className={`${
              hasFilteredReservations ? "bg-secondary" : ""
            }  cursor-pointer gap-2 flex items-center justify-center p-2 space-x-2 text-gray-700 rounded hover:bg-secondary hover:text-primary focus:bg-secondary focus:outline-none`}
            onClick={() => toggleVisibility(true, "filter")}
          >
            <FunnelIcon title="Filtrar" className="w-6 h-6" />
            Filtrar
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
