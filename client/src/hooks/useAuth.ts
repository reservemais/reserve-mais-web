import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated" && !!session;

  return { isAuthenticated, session, token: session?.jwt || null };
};
