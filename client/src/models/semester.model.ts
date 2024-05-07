export type semesterModel = {
  id: number;
  semester: string;
  initialDayOfSemester: Date;
  lastDayOfSemester: Date;
  currentSemester: boolean;
};

export type semesterApiModel = {
  id: number;
  attributes: {
    createdAt: string;
    currentSemester: boolean;
    initialDayOfSemester: Date;
    lastDayOfSemester: Date;
    publishedAt: string;
    semester: string;
    updatedAt: string;
  };
};
