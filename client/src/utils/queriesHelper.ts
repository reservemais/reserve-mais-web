import qs from "qs";

type QueryOptions = {
  populate?: Record<string, unknown> | string;
  filters?: Record<string, unknown>;
  sort?: string[];
  pagination: {
    page: number;
    pageSize: number;
  };
};

export const buildQuery = ({
  populate,
  pagination,
  filters,
  sort,
}: QueryOptions): string => {
  const query: Record<string, unknown> = {};

  if (populate) {
    query.populate = populate;
  }

  if (filters) {
    query.filters = filters;
  }

  if (sort) {
    query.sort = sort;
  }

  if (pagination) {
    query.pagination = pagination;
  }

  return qs.stringify(query, { encodeValuesOnly: true });
};
