"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useModalStore, useAmbiencesStore } from "@/store";
import { ambienceModel } from "@/models";
import { Button, Input, MultiSelect, Radio, Textarea } from "@/components";
import * as D from "./data";

const AmbienceForm = () => {
  const { toggleVisibility, modalType } = useModalStore();
  const { selectedAmbience, clearErrorMessage, addAmbience, editAmbience } =
    useAmbiencesStore();
  const [formData, setFormData] = useState(
    selectedAmbience ? selectedAmbience : ({} as ambienceModel)
  );
  const [responsiblesSelected, setResponsiblesSelected] = useState<any>([]);

  const { ambienceResponsiblesOptions } = D.FormsOptions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
      dependsOnReservation:
        formData.dependsOnReservation === "Sim" ? true : false,
      responsibles: responsiblesSelected.map((responsible: any) => ({
        id: Number(responsible.value),
      })),
    };

    if (modalType === "edit") {
      const response: any = await editAmbience(formData.id, payload);
      if (!response.data && !!response.error) {
        toggleVisibility(true);
      } else {
        toggleVisibility(false);
        clearErrorMessage();
      }
    } else {
      const response: any = await addAmbience(payload);

      if (!response.data && !!response.error) {
        toggleVisibility(true);
      } else {
        toggleVisibility(false);
        clearErrorMessage();
      }
    }
  };

  useEffect(() => {
    if (modalType === "edit" || modalType === "view") {
      const responsables = selectedAmbience?.responsibles?.map(
        (responsible) => ({
          key: responsible.id.toString(),
          value: responsible.id.toString(),
          label: responsible.username,
        })
      );

      setResponsiblesSelected(responsables);
    }
  }, [modalType]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white ">
        <Dialog.Title className="relative p-4 text-lg font-medium leading-6 text-center text-gray-900 border-b border-solid sm:p-4 border-slate-200">
          {!!selectedAmbience && modalType !== "view"
            ? "Editar Ambiente"
            : modalType === "view"
            ? "Visualizar Ambiente"
            : "Adicionar Ambiente"}
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
                  label="Código"
                  name="value"
                  type="text"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.value}
                  disabled={modalType === "view"}
                />
                <Radio
                  label="Tipo"
                  name="type"
                  required
                  legend="Selecione o tipo de ambiente"
                  options={[
                    { title: "Laboratório", value: "laboratory" },
                    { title: "Sala", value: "class" },
                    { title: "Outros", value: "others" },
                  ]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      type: e.target.id,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.type}
                  disabled={modalType === "view"}
                />
                <Radio
                  label="Disponibilidade"
                  name="availability"
                  required
                  legend="Selecione a disponibilidade do ambiente"
                  options={[
                    { title: "Disponível", value: "available" },
                    { title: "Indisponível", value: "unavailable" },
                  ]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      availability: e.target.id,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.availability}
                  disabled={modalType === "view"}
                />
                <Radio
                  label="Depende de reserva"
                  name="dependsOnReservation"
                  required
                  legend="Selecione se o ambiente depende de reserva"
                  options={[
                    { title: "Sim", value: "Sim" },
                    { title: "Não", value: "Não" },
                  ]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      dependsOnReservation: e.target.id,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.dependsOnReservation as any}
                  disabled={modalType === "view"}
                />
                <MultiSelect
                  options={ambienceResponsiblesOptions}
                  name="responsibles"
                  label="Responsáveis"
                  labelledBy="selecione os responsáveis"
                  value={responsiblesSelected}
                  disabled={modalType === "view"}
                  onChange={setResponsiblesSelected}
                />
                {(selectedAmbience?.numberOfMachines ||
                  formData.type === "laboratory") && (
                  <Input
                    label="Número de máquinas"
                    name="value"
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        numberOfMachines: Number(e.target.value),
                      }));
                      clearErrorMessage();
                    }}
                    value={formData?.numberOfMachines}
                    disabled={modalType === "view"}
                    required={formData.type === "laboratory"}
                  />
                )}
                {(selectedAmbience?.numberOfMachines ||
                  formData.type === "laboratory") && (
                  <Textarea
                    label="Softwares nos computadores"
                    name="computerSoftwares"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        computerSoftwares: e.target.value,
                      }));
                      clearErrorMessage();
                    }}
                    value={formData?.computerSoftwares}
                    disabled={modalType === "view"}
                  />
                )}
                {(selectedAmbience?.peopleCapacity || modalType === "add") && (
                  <Input
                    label="Capacidade de pessoas"
                    name="value"
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        peopleCapacity: Number(e.target.value),
                      }));
                      clearErrorMessage();
                    }}
                    value={formData?.peopleCapacity}
                    disabled={modalType === "view"}
                  />
                )}
                <Textarea
                  label="Descrição"
                  name="description"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.description}
                  disabled={modalType === "view"}
                />
                <Input
                  label="Tranca"
                  name="lock"
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      lock: e.target.value,
                    }));
                    clearErrorMessage();
                  }}
                  value={formData?.lock}
                  disabled={modalType === "view"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default AmbienceForm;
