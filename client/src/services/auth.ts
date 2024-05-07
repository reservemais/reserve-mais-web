import axios from "axios";

type signInProps = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: signInProps) {
  const res = await axios
    .create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    })
    .post("/auth/local", {
      identifier: email,
      password,
    });

  return res.data;
}
