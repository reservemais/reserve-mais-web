import { PaginationProps } from "@/store";
import { buildQuery } from "@/utils";

export const semesterQueries = (pagination?: PaginationProps) => {
  const query = buildQuery({
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 10,
    },
  });

  return { query };
};
