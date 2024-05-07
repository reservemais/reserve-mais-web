"use client";

import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useModalStore, useSolicitationStore } from "@/store";
import { formatDateToPtBR, getStatusStyleAndText } from "@/utils";
import { Button } from "@/components";

const SolicitationViewModal = () => {
  const { toggleVisibility } = useModalStore();
  const { selectedSolicitation } = useSolicitationStore();

  return (
    <>
      <div className="bg-white ">
        <Dialog.Title
          as="h3"
          className="relative p-4 text-lg font-medium leading-6 text-center text-gray-900 border-b border-solid sm:p-4 border-slate-200"
        >
          {selectedSolicitation?.title}
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
                {selectedSolicitation && (
                  <>
                    {formatDateToPtBR(selectedSolicitation.start)} -{" "}
                    {formatDateToPtBR(selectedSolicitation.end)}
                  </>
                )}
              </div>
              <div className="flex flex-col items-center mt-4 mb-4 ">
                <p className="mb-3 font-semibold">
                  <span className="font-normal">Solicitante: </span>
                  {selectedSolicitation?.requester.name}
                </p>
                <p className="mb-3 font-semibold">
                  <span className="font-normal">Ambiente: </span>
                  {selectedSolicitation?.ambience.value}
                </p>
                <p className="mb-3 font-semibold ">
                  <span className="font-normal">Semestral: </span>
                  {selectedSolicitation?.isSemester ? "Sim" : "Não"}
                </p>
                <p
                  className={`font-semibold ${
                    getStatusStyleAndText(selectedSolicitation?.status!)
                      .statusClass
                  }`}
                >
                  <span className="font-normal text-black">Status: </span>
                  {
                    getStatusStyleAndText(selectedSolicitation?.status!)
                      .statusText
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4 px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => toggleVisibility(false)}
        >
          Fechar
        </Button>
      </div>
    </>
  );
};

export default SolicitationViewModal;
