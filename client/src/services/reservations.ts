import { api } from "@/services";

export async function getReservations(params?: string) {
  try {
    const response = await api.get(
      params ? `/reservations?${params}` : "/reservations"
    );

    return response.data;
  } catch (e: any) {
    throw new Error(`API error:${e?.message}`);
  }
}

export async function createReservation(body: any, params?: string) {
  try {
    const response = await api.post(`/reservations?${params}`, body);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status,
      data: error.response.data.error.message,
    };
  }
}

export async function updateReservation(
  id: number,
  body: any,
  params?: string
) {
  try {
    const response = await api.put(`/reservations/${id}?${params}`, body);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status,
      data: error.response.data.error.message,
    };
  }
}

export async function deleteReservation(id: number) {
  try {
    const response = await api.delete(`/reservations/${id}`);

    return response.data;
  } catch (e: any) {
    throw new Error(`API error:${e?.message}`);
  }
}
