import { useAuth } from "@/hooks";

export const GetRoutes = () => {
  const { isAuthenticated, session } = useAuth();

  const routes = [
    {
      name: "Tela Inicial",
      route: "/",
    },
    {
      name: "Reservar",
      route: "/pages/Reserve",
    },
  ];

  if (isAuthenticated) {
    if (session?.user?.type === "Docente ou TAE") {
      routes.push({
        name: "Ambientes",
        route: "/pages/Ambiences",
      });
      routes.push({
        name: "Solicitações",
        route: "/pages/Solicitations",
      });
    } else {
      routes.push({
        name: "Ambientes",
        route: "/pages/Ambiences",
      });
    }
    if (session?.user?.isAdmin) {
      routes.push({
        name: "Semestres",
        route: "/pages/Semesters",
      });
      routes.push({
        name: "Usuários",
        route: "/pages/Users",
      });
    }
  }

  return routes;
};
