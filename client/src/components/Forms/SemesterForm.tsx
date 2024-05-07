"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useModalStore, useSemesterStore } from "@/store";
import { semesterModel } from "@/models";
import { Button, Error, Input, Toggle } from "@/components";

const SemesterForm = () => {
  const { toggleVisibility, modalType } = useModalStore();
  const {
    selectedSemester,
    addSemester,
    editSemester,
    errorMessage,
    clearErrorMessage,
  } = useSemesterStore();
  const [formData, setFormData] = useState(
    selectedSemester
      ? selectedSemester
      : ({
          currentSemester: false,
        } as semesterModel)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modalType === "edit") {
      const response: any = await editSemester(formData.id, formData);

      if (!response.data && !!response.error) {
        toggleVisibility(true);
      } else {
        toggleVisibility(false);
        clearErrorMessage();
      }
    } else {
      const response: any = await addSemester(formData);

      if (!response.data && !!response.error) {
        toggleVisibility(true);
      } else {
        toggleVisibility(false);
        clearErrorMessage();
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
          {!!selectedSemester && modalType !== "view"
            ? "Editar Semestre"
            : modalType === "view"
            ? "Visualizar Semestre"
            : "Adicionar Semestre"}
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
                <Input
                  label="Semestre"
                  name="semester"
                  type="text"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      semester: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.semester}
                  disabled={modalType === "view"}
                />
                <Input
                  label="Data de início do semestre"
                  name="initialDayOfSemester"
                  type="date"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const selectedDate = new Date(e.target.value);
                    const timezoneOffset = selectedDate.getTimezoneOffset();
                    selectedDate.setMinutes(
                      selectedDate.getMinutes() + timezoneOffset
                    );

                    setFormData((prev) => ({
                      ...prev,
                      initialDayOfSemester: selectedDate,
                    }));
                    clearErrorMessage();
                  }}
                  value={
                    formData.initialDayOfSemester
                      ? moment(formData.initialDayOfSemester).format(
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  disabled={modalType === "view"}
                />
                <Input
                  label="Data de termino do semestre"
                  name="lastDayOfSemester"
                  type="date"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const selectedDate = new Date(e.target.value);
                    const timezoneOffset = selectedDate.getTimezoneOffset();
                    selectedDate.setMinutes(
                      selectedDate.getMinutes() + timezoneOffset
                    );

                    setFormData((prev) => ({
                      ...prev,
                      lastDayOfSemester: selectedDate,
                    }));
                    clearErrorMessage();
                  }}
                  value={
                    formData.lastDayOfSemester
                      ? moment(formData.lastDayOfSemester).format("YYYY-MM-DD")
                      : ""
                  }
                  disabled={modalType === "view"}
                />
                <Toggle
                  label="É o semestre atual?"
                  description="Ao marcar isso esse semestre vai ser o atual e todos os outros vão ser desmarcados"
                  onChange={(e: boolean) => {
                    setFormData((prev) => ({
                      ...prev,
                      currentSemester: e,
                    }));
                    clearErrorMessage();
                  }}
                  checked={formData?.currentSemester ? true : false}
                  disabled={modalType === "view"}
                />
              </div>
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
      <div className="gap-4 px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
        {modalType !== "view" && (
          <Button
            type="submit"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm hover:bg-green-700 focus:ring-green-500"
          >
            Salvar
          </Button>
        )}
        <Button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            toggleVisibility(false);
            clearErrorMessage();
          }}
        >
          {modalType === "view" ? "Fechar" : "Cancelar"}
        </Button>
      </div>
    </form>
  );
};

export default SemesterForm;
