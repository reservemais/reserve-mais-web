import { ambienceApiModel, ambienceModel } from "@/models";

export const orderInList = ["laboratory", "class", "others"];

export const findAmbience = (id: number, ambiences: ambienceModel[]) => {
  const ambience = ambiences?.find((ambience) => ambience.id === id);

  return ambience;
};

export const formatAmbienceData = (
  ambience: ambienceApiModel
): ambienceModel => {
  return {
    id: ambience.id,
    value: ambience.attributes.value,
    type: ambience.attributes.type,
    availability: ambience.attributes.availability,
    dependsOnReservation: ambience.attributes.dependsOnReservation
      ? "Sim"
      : "Não",
    description: ambience.attributes.description,
    computerSoftwares: ambience.attributes.computerSoftwares,
    numberOfMachines: ambience.attributes.numberOfMachines,
    peopleCapacity: ambience.attributes.peopleCapacity,
    lock: ambience.attributes.lock,
    responsibles: ambience.attributes.responsibles?.data.map((responsible) => ({
      id: responsible?.id,
      username: responsible.attributes?.username,
      type: responsible.attributes?.type,
    })),
  };
};
