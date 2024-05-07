import { semesterModel } from "@/models";
import { api } from "@/services";

export async function getSemesters(params?: any) {
  try {
    const response = await api.get(
      params ? `/semesters?${params}` : "/semesters"
    );

    return response.data;
  } catch (e: any) {
    throw new Error(`API error:${e?.message}`);
  }
}

export async function createSemester(body: { data: semesterModel }) {
  try {
    const response = await api.post(`/semesters`, body);

    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
}

export async function editSemester(id: number, body: { data: semesterModel }) {
  try {
    const response = await api.put(`/semesters/${id}`, body);

    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
}

export async function deleteSemester(id: number) {
  try {
    const response = await api.delete(`/semesters/${id}`);

    return response.data;
  } catch (e: any) {
    throw new Error(`API error:${e?.message}`);
  }
}
