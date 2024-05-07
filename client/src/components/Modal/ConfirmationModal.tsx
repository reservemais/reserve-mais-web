"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useModalStore } from "@/store";
import { Button, Textarea } from "@/components";

import { Modal } from ".";

type ConfirmationModalProps = {
  title: string;
  description: string;
  action: (reason?: string) => void;
  approvedButton?: boolean;
  solicitationDisapproved?: boolean;
};

const ConfirmationModal = ({
  title,
  description,
  action,
  approvedButton = false,
  solicitationDisapproved = false,
}: ConfirmationModalProps) => {
  const { toggleVisibility } = useModalStore();
  const [data, setData] = useState({ reason: "" });

  return (
    <Modal>
      <div className="bg-white ">
        <Dialog.Title className="relative p-4 text-lg font-medium leading-6 text-center text-gray-900 border-b border-solid sm:p-4 border-slate-200">
          {title}
        </Dialog.Title>
        <XMarkIcon
          className="absolute w-6 h-6 text-gray-400 cursor-pointer right-3 top-2"
          onClick={() => toggleVisibility(false)}
        />
      </div>
      <div className="pb-4 bg-white sm:p-1">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left sm:w-full">
            <div className="my-4 text-center ">{description}</div>
            <div className="px-12 my-2 text-center">
              {solicitationDisapproved && (
                <Textarea
                  label="Motivo"
                  name="reason"
                  value={data.reason}
                  required
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData((prev) => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4 px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          disabled={data.reason === "" && solicitationDisapproved}
          className={`${
            approvedButton
              ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
              : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
          }inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white  border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm `}
          onClick={() => {
            toggleVisibility(false);
            action(data.reason);
          }}
        >
          Sim
        </Button>
        <Button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => toggleVisibility(false)}
        >
          Não
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
