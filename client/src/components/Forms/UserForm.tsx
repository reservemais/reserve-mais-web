"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useModalStore, useUserStore } from "@/store";
import { userApiModel } from "@/models";
import { Button, Error, Input, Select, Toggle } from "@/components";
import * as D from "./data";

const UserForm = () => {
  const { toggleVisibility, modalType } = useModalStore();
  const {
    addUser,
    editUser,
    selectedUser,
    errorMessage,
    clearErrorMessage,
    users,
  } = useUserStore();
  const [formData, setFormData] = useState(
    selectedUser ? selectedUser : ({} as userApiModel)
  );

  const { userResponsiblesOptions } = D.FormsOptions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
      confirmed: true,
      blocked: false,
      role: 1,
    };

    if (modalType === "edit") {
      const response: any = await editUser(formData.id, payload);

      if (!response.data && !!response.error) {
        toggleVisibility(true);
      } else {
        toggleVisibility(false);
        clearErrorMessage();
      }
    } else {
      const response: any = await addUser(payload);

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
          {!!selectedUser && modalType !== "view"
            ? "Editar Usuário"
            : modalType === "view"
            ? "Visualizar Usuário"
            : "Adicionar Usuário"}
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
                <Toggle
                  label="É um usuário administrador?"
                  description="Ao marcar isso esse usuário vai ser um usuario administrador"
                  onChange={(e: boolean) => {
                    setFormData((prev) => ({
                      ...prev,
                      isAdmin: e,
                    }));
                    clearErrorMessage();
                  }}
                  checked={formData?.isAdmin ? true : false}
                  disabled={modalType === "view"}
                />
                <Input
                  label="Nome"
                  name="username"
                  type="text"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.username}
                  disabled={modalType === "view"}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.email}
                  disabled={modalType === "view"}
                />
                <Input
                  label="Código"
                  name="code"
                  type="number"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.code}
                  disabled={modalType === "view"}
                />
                <Input
                  label="Senha"
                  name="password"
                  type="password"
                  required={modalType !== "edit"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.password}
                  disabled={modalType === "view"}
                />
                <Select
                  label="Tipo de usuário"
                  name="type"
                  options={[
                    { id: 1, title: "Docente ou TAE", value: "Docente ou TAE" },
                    { id: 2, title: "Terceirizado", value: "Terceirizado" },
                    { id: 3, title: "Aluno", value: "Aluno" },
                    {
                      id: 4,
                      title: "Comunidade Externa",
                      value: "Comunidade Externa",
                    },
                  ]}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData.type}
                  required
                  disabled={modalType === "view"}
                  placeholder="Selecione um tipo de usuário"
                />
                {!!formData.type && formData.type !== "Docente ou TAE" && (
                  <Select
                    label="Responsável"
                    name="type"
                    options={userResponsiblesOptions}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedUser = users.find(
                        (user) => user.id === parseInt(e.target.value)
                      );

                      setFormData((prev) => ({
                        ...prev,
                        responsibleId: selectedUser!,
                      }));
                      clearErrorMessage();
                    }}
                    value={formData.responsibleId?.id}
                    required={
                      !!formData.type && formData.type !== "Docente ou TAE"
                    }
                    disabled={modalType === "view"}
                    placeholder="Selecione um tipo de usuário"
                  />
                )}
                <Input
                  label="Identificação Eletrônica"
                  name="electronicIdentification"
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      electronicIdentification: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.electronicIdentification}
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

export default UserForm;
