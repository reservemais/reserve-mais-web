export const getToken = () => {
  const token = localStorage.getItem("reservas-token");

  return token || null;
};
