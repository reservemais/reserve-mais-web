import { semesterModel } from "@/models";

export const semesterMock: semesterModel = {
  id: 1,
  semester: "2023.1",
  currentSemester: true,
  initialDayOfSemester: new Date(2023, 1, 6),
  lastDayOfSemester: new Date(2023, 5, 30),
};
