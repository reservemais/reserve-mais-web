import { orderInList } from "@/utils";
import { useAmbiencesStore } from "@/store";

export const filtersOptions = () => {
  const { ambiences } = useAmbiencesStore();

  const ambienceFilterTypeOptions = [
    {
      id: 1,
      title: "Laboratório",
      value: "laboratory",
    },
    {
      id: 2,
      title: "Sala",
      value: "class",
    },
    {
      id: 3,
      title: "Outros",
      value: "others",
    },
  ];

  const ambienceFilterAvailabilityOptions = [
    {
      id: 1,
      title: "Disponível",
      value: "available",
    },
    {
      id: 2,
      title: "Indisponível",
      value: "unavailable",
    },
  ];

  const solicitationFilterStatusOptions = [
    {
      id: 1,
      title: "Aprovado",
      value: "approved",
    },
    {
      id: 2,
      title: "Reprovado",
      value: "disapproved",
    },
  ];

  const calendarFilterTypeOptions = [
    {
      id: 1,
      value: "Pontual",
      title: "Pontual",
    },
    {
      id: 2,
      value: "Semestral",
      title: "Semestral",
    },
  ];

  const calendarFilterAmbiencesOptions = ambiences
    .sort((a, b) => {
      const indexA = orderInList.indexOf(a.type);
      const indexB = orderInList.indexOf(b.type);

      return indexA - indexB;
    })
    .filter((ambience) => ambience.dependsOnReservation === "Sim")
    .map((ambience) => ({
      id: ambience.id,
      value: ambience.id.toString(),
      title: ambience.value,
    }));

  const userFilterTypeOptions = [
    { id: 1, title: "Docente ou TAE", value: "Docente ou TAE" },
    { id: 2, title: "Terceirizado", value: "Terceirizado" },
    { id: 3, title: "Aluno", value: "Aluno" },
    {
      id: 4,
      title: "Comunidade Externa",
      value: "Comunidade Externa",
    },
  ];

  return {
    ambienceFilterTypeOptions,
    ambienceFilterAvailabilityOptions,
    solicitationFilterStatusOptions,
    calendarFilterTypeOptions,
    calendarFilterAmbiencesOptions,
    userFilterTypeOptions,
  };
};
