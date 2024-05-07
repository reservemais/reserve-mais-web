import { userModel } from "@/models";

export const findUser = (id: number, users: userModel[]) => {
  const user = users?.find((user) => user.id === id);

  return user;
};
