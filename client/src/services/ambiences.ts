import { ambienceModel } from "@/models";
import { api } from "@/services";

export async function getAmbiences(params?: any) {
  try {
    const response = await api.get(
      params ? `/ambiences?${params}` : "/ambiences"
    );

    return response.data;
  } catch (e: any) {
    throw new Error(`API error:${e?.message}`);
  }
}

export async function createAmbience(body: { data: ambienceModel }) {
  try {
    const response = await api.post(`/ambiences`, body);

    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
}

export async function editAmbience(id: number, body: { data: ambienceModel }) {
  try {
    const response = await api.put(`/ambiences/${id}`, body);

    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
}

export async function deleteAmbience(id: number) {
  try {
    const response = await api.delete(`/ambiences/${id}`);

    return response.data;
  } catch (e: any) {
    throw new Error(`API error:${e?.message}`);
  }
}
