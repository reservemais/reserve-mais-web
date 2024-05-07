"use client";

import {
  CheckCircleIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { useAmbiencesStore, useModalStore } from "@/store";
import { useAuth } from "@/hooks";
import { orderInList } from "@/utils";

export const Data = () => {
  const { ambiences } = useAmbiencesStore();

  return {
    data: ambiences.sort((a, b) => {
      const indexA = orderInList.indexOf(a.type);
      const indexB = orderInList.indexOf(b.type);

      return indexA - indexB;
    }),
    columns: [
      { Header: "Ambiente", accessor: "value" },
      {
        Header: "Tipo",
        accessor: "type",
        Cell: ({ value }: any) =>
          value === "laboratory"
            ? "Laboratório"
            : value === "class"
            ? "Sala"
            : "Outros",
      },
      {
        Header: "Disponibilidade",
        accessor: "availability",
        Cell: ({ value }: any) =>
          value === "available" ? (
            <CheckCircleIcon className="w-full text-green-400 h-7" />
          ) : (
            <XCircleIcon className="w-full text-red-400 h-7 " />
          ),
      },
      {
        Header: "Número de Maquinas",
        accessor: "numberOfMachines",
        Cell: ({ value }: any) => (!!value ? value : "Não possui"),
      },
      {
        Header: "Responsáveis",
        accessor: "responsibles",
        Cell: ({ value }: any) => (
          <div
            className="flex flex-col"
            title={value?.map((item: any) => item.username)}
          >
            {value?.length === 1
              ? value[0]?.username
              : value?.length === 2
              ? value[0].username + ", " + value[1]?.username
              : value[0].username + ", " + value[1]?.username + "..."}
          </div>
        ),
      },
    ],
  };
};

export const Actions = () => {
  const { selectAmbience } = useAmbiencesStore();
  const { toggleVisibility } = useModalStore();
  const { session } = useAuth();

  const seeAction = (row: any) => (
    <EyeIcon
      className="p-2 bg-blue-200 rounded-lg cursor-pointer text-primary w-9 h-9"
      title="Visualizar"
      onClick={() => {
        toggleVisibility(true, "view");
        selectAmbience(row.original.id);
      }}
    />
  );

  const editAction = (row: any) => (
    <PencilSquareIcon
      className="p-2 text-green-500 bg-green-200 rounded-lg cursor-pointer w-9 h-9"
      title="Editar"
      onClick={() => {
        toggleVisibility(true, "edit");
        selectAmbience(row.original.id);
      }}
    />
  );

  const deleteAction = (row: any) => (
    <TrashIcon
      className="p-2 text-red-500 bg-red-200 rounded-lg cursor-pointer w-9 h-9"
      title="Deletar"
      onClick={() => {
        toggleVisibility(true, "delete");
        selectAmbience(row.original.id);
      }}
    />
  );

  if (session?.user?.isAdmin) {
    return [seeAction, editAction, deleteAction];
  }

  return [seeAction];
};
