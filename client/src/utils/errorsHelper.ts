type ErrorMapProps = {
  [key: string]: {
    message: string;
    type: "success" | "error" | "info";
  };
};

const ERROR_MAP: ErrorMapProps = {
  CredentialsSignin: {
    message: "Senha ou Email incorretos!",
    type: "error",
  },
  // outros erros aqui
};

export const ErrorsMessages = (error: string) => {
  const { message = "", type = "error" } = ERROR_MAP[error] ?? {};

  return { message, type };
};
