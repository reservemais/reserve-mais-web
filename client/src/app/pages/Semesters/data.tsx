"use client";

import {
  CheckCircleIcon,
  EyeIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { useModalStore, useSemesterStore } from "@/store";

export const Data = () => {
  const { semesters } = useSemesterStore();

  return {
    data: semesters
      .sort((a, b) => {
        return b.semester.localeCompare(a.semester);
      })
      .map((semester) => ({
        ...semester,
      })),
    columns: [
      { Header: "Semestre", accessor: "semester" },
      {
        Header: "Semestre Atual",
        accessor: "currentSemester",
        Cell: ({ value }: { value: boolean }) =>
          value ? (
            <CheckCircleIcon className="w-full text-green-400 h-7" />
          ) : (
            <XCircleIcon className="w-full text-red-400 h-7 " />
          ),
      },
    ],
  };
};

export const Actions = () => {
  const { toggleVisibility } = useModalStore();
  const { selectSemester } = useSemesterStore();

  const seeAction = (row: any) => (
    <EyeIcon
      className="p-2 bg-blue-200 rounded-lg cursor-pointer text-primary w-9 h-9"
      title="Visualizar"
      onClick={() => {
        toggleVisibility(true, "view");
        selectSemester(row.original.id);
      }}
    />
  );

  const editAction = (row: any) => (
    <PencilSquareIcon
      className="p-2 text-green-500 bg-green-200 rounded-lg cursor-pointer w-9 h-9"
      title="Editar"
      onClick={() => {
        toggleVisibility(true, "edit");
        selectSemester(row.original.id);
      }}
    />
  );

  const deleteAction = (row: any) => (
    <TrashIcon
      className="p-2 text-red-500 bg-red-200 rounded-lg cursor-pointer w-9 h-9"
      title="Deletar"
      onClick={() => {
        toggleVisibility(true, "delete");
        selectSemester(row.original.id);
      }}
    />
  );

  return [seeAction, editAction, deleteAction];
};
