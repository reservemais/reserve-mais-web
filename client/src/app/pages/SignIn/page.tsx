"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useToastNotificationStore } from "@/store";
import { ErrorsMessages } from "@/utils";
import { Button, Input } from "@/components";

type formDataProps = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { push } = useRouter();
  const { show } = useToastNotificationStore();
  const [formData, setFormData] = useState({} as formDataProps);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      callbackUrl: "/",
    });

    if (response?.ok) {
      push("/");
    } else {
      const { message, type } = ErrorsMessages(response?.error!);

      show(message, type);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen m-0">
      <div className="p-8 bg-white rounded-lg shadow-lg sm:w-96 lg:w-1/3">
        <h2 className="mb-5 text-2xl font-bold text-center text-primary">
          Faça seu login
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            value={formData.email}
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            value={formData.password}
          />

          <Button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-green-700 focus:ring-green-500"
            disabled={loading || !formData.email || !formData.password}
          >
            Acessar
          </Button>
          <Button
            type="button"
            className="w-full px-4 py-2 mt-8 text-sm font-medium text-black bg-white shadow-none "
            onClick={() => push("/")}
          >
            Acessar sem fazer login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
