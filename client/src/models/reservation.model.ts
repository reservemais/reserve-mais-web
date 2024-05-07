import { stringOrDate } from "react-big-calendar";

import { ambienceApiModel, ambienceModel } from "./ambience.model";
import { responsibleAndRequesterModel, userModel } from "./user.model";
import { semesterApiModel, semesterModel } from "./semester.model";

export type reservationModel = {
  id?: number;
  ambience: Pick<
    ambienceModel,
    "id" | "value" | "availability" | "numberOfMachines" | "peopleCapacity"
  >;
  title: string;
  start: stringOrDate;
  end: stringOrDate;
  isSemester: boolean;
  status: string;
  reasonForDisapproved?: string;
  color?: string;
  semester?: semesterModel;
  requester: Pick<userModel, "id" | "name" | "type">;
};

export type reservationApiModel = {
  id: number;
  attributes: {
    createdAt: string;
    end: string;
    isSemester: boolean;
    publishedAt: string;
    start: string;
    status: string;
    reasonForDisapproved?: string;
    color?: string;
    title: string;
    updatedAt: string;
    semester?: {
      data: semesterApiModel;
    };
    ambience?: {
      data: ambienceApiModel;
    };
    requester?: {
      data: responsibleAndRequesterModel;
    };
  };
};
