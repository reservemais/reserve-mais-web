"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import moment from "moment";

import {
  useReservationStore,
  useModalStore,
  useCalendarStore,
  useAmbiencesStore,
  useColorStore,
  useSemesterStore,
} from "@/store";
import { useAuth } from "@/hooks";
import { reservationModel } from "@/models";
import { reservationQueries } from "@/queries";
import {
  Button,
  ColorPicker,
  Error,
  Input,
  Select,
  Toggle,
} from "@/components";

import * as D from "./data";

type ReservationFormProps = {
  editedData?: reservationModel;
};

const ReservationForm = ({ editedData }: ReservationFormProps) => {
  const { session } = useAuth();
  const { toggleVisibility } = useModalStore();
  const {
    addReservation,
    editReservation,
    errorMessage,
    clearErrorMessage,
    setErrorMessage,
    fetchData,
    selectedFilter,
  } = useReservationStore();
  const { calendarData } = useCalendarStore();
  const { semesters } = useSemesterStore();
  const { setColor } = useColorStore();
  const { ambiences } = useAmbiencesStore();
  const [formData, setFormData] = useState(
    editedData
      ? editedData
      : ({
          start: calendarData?.start!,
          end: calendarData?.end!,
          status: "pending",
          isSemester: false,
          color: "#039be5",
          requester: {
            id: Number(session?.user?.id!),
            name: session?.user?.name!,
            type: session?.user?.type!,
          },
          ambience:
            ambiences.find(
              (item) => item.id === Number(selectedFilter?.value)
            ) || {},
        } as reservationModel)
  );

  const { query } = reservationQueries(Number(session?.user?.id!));
  const { reservationAmbienceOptions } = D.FormsOptions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedData) {
      const response = await editReservation(editedData.id!, formData);
      if (response.status === 200) {
        toggleVisibility(false);
        setFormData({} as reservationModel);
        clearErrorMessage();
        fetchData(query);
      } else {
        setErrorMessage(response.data);
      }
    } else {
      const response = await addReservation(formData);
      if (response.status === 200) {
        toggleVisibility(false);
        setFormData({} as reservationModel);
        clearErrorMessage();
        fetchData(query);
      } else {
        setErrorMessage(response.data);
      }
    }
  };

  useEffect(() => {
    clearErrorMessage();
  }, [clearErrorMessage]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white ">
        <Dialog.Title className="relative p-4 text-lg font-medium leading-6 text-center text-gray-900 border-b border-solid sm:p-4 border-slate-200">
          {editedData ? formData.title : "Criar uma reserva"}
        </Dialog.Title>
        <XMarkIcon
          className="absolute w-6 h-6 text-gray-400 cursor-pointer right-3 top-2"
          onClick={() => toggleVisibility(false)}
        />
      </div>
      <div className="pb-4 bg-white sm:p-1">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left sm:w-full">
            <div>
              <div className="pl-4 pr-4 mt-2">
                {(!editedData || formData.isSemester) && (
                  <Toggle
                    label="É uma reserva semestral?"
                    description="Ao marcar isso sua reserva irá para todo o semestre"
                    onChange={(e: boolean) => {
                      setColor(e ? "#e67c73" : "#039be5");
                      setFormData((prev) => ({
                        ...prev,
                        isSemester: e,
                        semester: e
                          ? semesters.find((item) => item.currentSemester)
                          : undefined,
                        color: e ? "#e67c73" : "#039be5",
                      }));
                    }}
                    checked={formData.isSemester}
                    disabled={editedData ? true : false}
                  />
                )}
                <Input
                  label="Titulo"
                  name="title"
                  type="text"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  value={formData.title}
                />
                <Select
                  label="Ambiente"
                  name="room"
                  options={reservationAmbienceOptions}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selectedAmbience = ambiences.find(
                      (ambience) => ambience.id === parseInt(e.target.value)
                    );

                    setFormData((prev) => ({
                      ...prev,
                      ambience: selectedAmbience!,
                    }));
                    clearErrorMessage();
                  }}
                  required
                  placeholder="Selecione uma sala"
                  value={formData.ambience?.id}
                />
                <Input
                  label="Inicio"
                  name="start"
                  type="datetime-local"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      start: new Date(e.target.value),
                    }));
                    clearErrorMessage();
                  }}
                  value={moment(formData?.start || calendarData?.start).format(
                    "YYYY-MM-DDTHH:mm"
                  )}
                />
                <Input
                  label="Fim"
                  name="end"
                  type="datetime-local"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      end: new Date(e.target.value),
                    }));
                    clearErrorMessage();
                  }}
                  value={moment(formData?.end || calendarData?.end).format(
                    "YYYY-MM-DDTHH:mm"
                  )}
                />
                <ColorPicker
                  label="Selecione a cor da reserva"
                  color={formData.color}
                  onChange={(color) => {
                    setColor(color.hex);
                    setFormData((prev) => ({ ...prev, color: color.hex }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {!!errorMessage && (
          <Error
            bgColor="bg-red-100"
            borderColor="border-red-400"
            textColor="text-red-700"
            error={errorMessage}
          />
        )}
      </div>
      <div className="gap-4 px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="submit"
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm hover:bg-green-700 focus:ring-green-500"
          disabled={!!errorMessage}
        >
          Solicitar
        </Button>
        <Button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            toggleVisibility(false);
            clearErrorMessage();
          }}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ReservationForm;
