"use client";

import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useModalStore } from "@/store";
import { Button } from "@/components";

const NoAuthenticatedViewModal = () => {
  const { toggleVisibility } = useModalStore();
  const router = useRouter();

  const handleLoginClick = () => {
    toggleVisibility(false);
    router.push("/pages/SignIn");
  };

  return (
    <>
      <div className="bg-white ">
        <Dialog.Title
          as="h3"
          className="relative p-4 text-lg font-medium leading-6 text-center text-gray-900 border-b border-solid sm:p-4 border-slate-200"
        >
          Parece que você não está logado
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
              <div className="pl-4 pr-4 my-5 text-center">
                Para realizar uma reserva é necessário estar autenticado na
                plataforma.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4 px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          onClick={handleLoginClick}
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm bg-primary hover:bg-blue-800 focus:ring-blue-500"
        >
          Fazer login
        </Button>
      </div>
    </>
  );
};

export default NoAuthenticatedViewModal;
