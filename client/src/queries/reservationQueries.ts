import { buildQuery } from "@/utils";

export const reservationQueries = (id?: number) => {
  const query = buildQuery({
    populate: "*",
    filters: {
      ...(id
        ? {
            $or: [
              {
                requester: {
                  id: {
                    $eq: id,
                  },
                },
                status: "pending",
              },
              {
                status: "approved",
              },
            ],
          }
        : {
            $or: [
              {
                status: "approved",
              },
            ],
          }),
    },
    pagination: {
      page: 1,
      pageSize: 999,
    },
  });

  return { query };
};
