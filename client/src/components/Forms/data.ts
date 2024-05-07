import { orderInList } from "@/utils";
import { useAmbiencesStore, useUserStore } from "@/store";

export const FormsOptions = () => {
  const { ambiences } = useAmbiencesStore();
  const { users } = useUserStore();

  const reservationAmbienceOptions = ambiences
    .sort((a, b) => {
      const indexA = orderInList.indexOf(a.type);
      const indexB = orderInList.indexOf(b.type);

      return indexA - indexB;
    })
    .filter((ambience) => ambience.dependsOnReservation)
    .map((ambience) => ({
      id: ambience.id,
      value: ambience.id.toString(),
      title: `${ambience.value} ${
        ambience.type === "laboratory"
          ? "- Número de máquinas: " + ambience.numberOfMachines
          : ""
      } ${
        !!ambience.peopleCapacity
          ? "- Capacidade de pessoas: " + ambience.peopleCapacity
          : ""
      }`,
    }));

  const ambienceResponsiblesOptions = users
    .filter((user) => user.type === "Docente ou TAE")
    .map((user) => ({
      key: user.id.toString(),
      value: user.id.toString(),
      label: user.username,
    }));

  const userResponsiblesOptions = users
    .filter((user) => user.type === "Docente ou TAE")
    .map((user) => ({
      id: user.id,
      value: user.id.toString(),
      title: user.username,
    }));

  return {
    reservationAmbienceOptions,
    ambienceResponsiblesOptions,
    userResponsiblesOptions,
  };
};
