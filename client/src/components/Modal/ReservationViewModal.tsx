"use client";

import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useCalendarStore, useModalStore, useReservationStore } from "@/store";
import { formatDateToPtBR, getStatusStyleAndText } from "@/utils";
import { useAuth } from "@/hooks";
import { Button, ReservationForm } from "@/components";

import { ConfirmationModal, Modal } from ".";

const ReservationViewModal = () => {
  const { toggleVisibility, modalType } = useModalStore();
  const { selectedCalendarData } = useCalendarStore();
  const { removeReservation } = useReservationStore();
  const { session } = useAuth();

  const isSameUser = session?.user?.id === selectedCalendarData?.requester?.id;

  return (
    <>
      <div className="bg-white ">
        <Dialog.Title
          as="h3"
          className="relative p-4 text-lg font-medium leading-6 text-center text-gray-900 border-b border-solid sm:p-4 border-slate-200"
        >
          {selectedCalendarData?.title}
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
              <div className="p-2 mr-3 text-base text-gray-500 sm:p-0 sm:flex sm:items-center sm:justify-center">
                {selectedCalendarData && (
                  <>
                    {formatDateToPtBR(selectedCalendarData.start)} -{" "}
                    {formatDateToPtBR(selectedCalendarData.end)}
                  </>
                )}
              </div>
              <div className="flex flex-col items-center mt-4 mb-4 ">
                <p className="mb-3 font-semibold">
                  <span className="font-normal">Solicitante: </span>
                  {selectedCalendarData?.requester.name}
                </p>
                <p className="mb-3 font-semibold">
                  <span className="font-normal">Sala/Lab: </span>
                  {selectedCalendarData?.ambience.value}
                </p>
                {selectedCalendarData?.ambience.numberOfMachines && (
                  <p className="mb-3 font-semibold">
                    <span className="font-normal">Número de máquinas: </span>
                    {selectedCalendarData?.ambience.numberOfMachines}
                  </p>
                )}
                {selectedCalendarData?.ambience.peopleCapacity && (
                  <p className="mb-3 font-semibold">
                    <span className="font-normal">Capacidade de pessoas: </span>
                    {selectedCalendarData?.ambience.peopleCapacity}
                  </p>
                )}
                <p className="mb-3 font-semibold">
                  <span className="font-normal">Semestral: </span>
                  {selectedCalendarData?.isSemester ? "Sim" : "Não"}
                </p>
                <p
                  className={`font-semibold ${
                    getStatusStyleAndText(selectedCalendarData?.status!)
                      .statusClass
                  }`}
                >
                  <span className="font-normal text-black">Status: </span>
                  {
                    getStatusStyleAndText(selectedCalendarData?.status!)
                      .statusText
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSameUser && (
        <div className="gap-4 px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
          <Button
            type="button"
            onClick={() => toggleVisibility(true, "form")}
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm bg-primary hover:bg-blue-800 focus:ring-blue-500"
          >
            Editar
          </Button>
          <Button
            type="button"
            onClick={() => toggleVisibility(true, "delete")}
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm hover:bg-red-700 focus:ring-red-500"
          >
            Excluir
          </Button>
        </div>
      )}
      {modalType === "form" && (
        <Modal>
          <ReservationForm editedData={selectedCalendarData!} />
        </Modal>
      )}
      {modalType === "delete" && (
        <ConfirmationModal
          title="Confirmação de exclusão"
          description="Ao fazer isso sua reserva vai ser excluida e não poderá ser
        recuperada. Tem certeza que deseja excluir?"
          action={() => removeReservation(selectedCalendarData?.id!)}
        />
      )}
    </>
  );
};

export default ReservationViewModal;
