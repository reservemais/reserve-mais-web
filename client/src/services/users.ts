import { userApiModel } from "@/models";
import { api } from "@/services";

export async function getUsers(params?: any) {
  try {
    const response = await api.get(params ? `/users?${params}` : "/users");

    return response.data;
  } catch (e: any) {
    throw new Error(`API error:${e?.message}`);
  }
}

export async function createUser(body: userApiModel) {
  try {
    const response = await api.post(`/users`, body);

    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
}

export async function editUser(id: number, body: userApiModel) {
  try {
    const response = await api.put(`/users/${id}`, body);

    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await api.delete(`/users/${id}`);

    return response.data;
  } catch (e: any) {
    throw new Error(`API error:${e?.message}`);
  }
}
