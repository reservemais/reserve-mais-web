import { reservationModel } from "@/models";
import { PaginationProps } from "@/store";
import { buildQuery } from "@/utils";

export const solicitationQueries = (
  pagination: PaginationProps,
  id: number,
  filterData?: Pick<reservationModel, "status">
) => {
  const query = buildQuery({
    populate: {
      ambience: {
        populate: "responsibles",
      },
      requester: {
        populate: "*",
      },
    },
    filters: {
      ambience: {
        responsibles: {
          id: {
            $eq: id,
          },
        },
      },
      status: "pending",
    },
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 10,
    },
  });

  const queryWithFilters = buildQuery({
    populate: {
      ambience: {
        populate: "responsibles",
      },
      requester: {
        populate: "*",
      },
    },
    filters: {
      ambience: {
        responsibles: {
          id: {
            $eq: id,
          },
        },
      },
      ...(filterData?.status && {
        status: {
          $eq: filterData.status,
        },
      }),
    },
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 10,
    },
  });

  return { query, queryWithFilters };
};
