import {
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { useModalStore, useSolicitationStore } from "@/store";

export const Data = () => {
  const { solicitations } = useSolicitationStore();

  return {
    data: solicitations.map((solicitation) => ({
      ...solicitation,
    })),
    columns: [
      { Header: "Título", accessor: "title" },
      {
        Header: "Ambiente",
        accessor: "ambience",
        Cell: ({ value }: any) => value?.value,
      },
      {
        Header: "Solicitante",
        accessor: "requester",
        Cell: ({ value }: any) => value?.name,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }: any) =>
          value === "pending" ? (
            <div className="flex items-center justify-center w-full font-semibold text-orange-400">
              <ClockIcon
                title="Pendente"
                className="mr-2 text-orange-400 h-7"
              />
              Pendente
            </div>
          ) : value === "approved" ? (
            <div className="flex items-center justify-center w-full font-semibold text-green-400">
              <CheckCircleIcon
                title="Aprovado"
                className="mr-2 text-green-400 h-7"
              />
              Aprovado
            </div>
          ) : (
            <div className="flex items-center justify-center w-full font-semibold text-red-400">
              <XCircleIcon
                title="Reprovado"
                className="mr-2 text-red-400 h-7 "
              />
              Reprovado
            </div>
          ),
      },
    ],
  };
};

export const Actions = () => {
  const { selectSolicitation } = useSolicitationStore();
  const { toggleVisibility } = useModalStore();

  const seeAction = (row: any) => (
    <EyeIcon
      className="p-2 bg-blue-200 rounded-lg cursor-pointer text-primary w-9 h-9"
      title="Visualizar"
      onClick={() => {
        toggleVisibility(true, "view");
        selectSolicitation(row.original.id);
      }}
    />
  );

  const approvedAction = (row: any) => (
    <CheckCircleIcon
      type="button"
      className="p-2 text-green-700 bg-green-200 rounded-lg cursor-pointer w-9 h-9"
      title="Aprovar"
      onClick={() => {
        toggleVisibility(true, "approved");
        selectSolicitation(row.original.id);
      }}
    />
  );

  const disapprovedAction = (row: any) => (
    <XCircleIcon
      className="p-2 text-red-500 bg-red-200 rounded-lg cursor-pointer w-9 h-9"
      title="Reprovar"
      onClick={() => {
        toggleVisibility(true, "delete");
        selectSolicitation(row.original.id);
      }}
    />
  );

  return [seeAction, approvedAction, disapprovedAction];
};
