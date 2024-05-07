import { PaginationProps } from "@/store";
import { ambienceModel } from "@/models";
import { buildQuery } from "@/utils";

export const ambienceQueries = (
  pagination?: PaginationProps,
  filterData?: Pick<ambienceModel, "type" | "availability" | "numberOfMachines">
) => {
  const query = buildQuery({
    populate: {
      responsibles: {
        populate: "*",
      },
    },
    sort: ["value:asc"],
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 10,
    },
  });

  const queryToSelect = buildQuery({
    populate: "*",
    pagination: {
      page: 1,
      pageSize: 999,
    },
    sort: ["value:asc"],
    filters: {
      dependsOnReservation: {
        $eq: "Sim",
      },
    },
  });

  const queryWithFilters = buildQuery({
    populate: {
      responsibles: {
        populate: "*",
      },
    },
    filters: {
      ...(filterData?.type && {
        type: {
          $eq: filterData.type,
        },
      }),
      ...(filterData?.availability && {
        availability: {
          $eq: filterData.availability,
        },
      }),
      ...(filterData?.numberOfMachines && {
        numberOfMachines: {
          $eq: filterData.numberOfMachines,
        },
      }),
    },
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 10,
    },
  });

  return { query, queryWithFilters, queryToSelect };
};
