"use client";

import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { useModalStore, useUserStore } from "@/store";

export const Data = () => {
  const { users } = useUserStore();

  return {
    data: users.map((user) => ({
      ...user,
    })),
    columns: [
      { Header: "Nome", accessor: "username" },
      { Header: "Tipo de usuário", accessor: "type" },
      { Header: "Email", accessor: "email" },
      { Header: "Código", accessor: "code" },
    ],
  };
};

export const Actions = () => {
  const { toggleVisibility } = useModalStore();
  const { selectUser } = useUserStore();

  const seeAction = (row: any) => (
    <EyeIcon
      className="p-2 bg-blue-200 rounded-lg cursor-pointer text-primary w-9 h-9"
      title="Visualizar"
      onClick={() => {
        toggleVisibility(true, "view");
        selectUser(row.original.id);
      }}
    />
  );

  const editAction = (row: any) => (
    <PencilSquareIcon
      className="p-2 text-green-500 bg-green-200 rounded-lg cursor-pointer w-9 h-9"
      title="Editar"
      onClick={() => {
        toggleVisibility(true, "edit");
        selectUser(row.original.id);
      }}
    />
  );

  const deleteAction = (row: any) => (
    <TrashIcon
      className="p-2 text-red-500 bg-red-200 rounded-lg cursor-pointer w-9 h-9"
      title="Deletar"
      onClick={() => {
        toggleVisibility(true, "delete");
        selectUser(row.original.id);
      }}
    />
  );

  return [seeAction, editAction, deleteAction];
};
