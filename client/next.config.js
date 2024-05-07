/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "standalone",
  // redirects: async () => [
  //   {
  //     source: "/ambientes",
  //     destination: "/pages/Ambiences",
  //     permanent: true,
  //   },
  //   {
  //     source: "/reservar",
  //     destination: "/pages/Reserve",
  //     permanent: true,
  //   },
  //   {
  //     source: "/solicitacoes",
  //     destination: "/pages/Solicitations",
  //     permanent: true,
  //   },
  //   {
  //     source: "/semestres",
  //     destination: "/pages/Semesters",
  //     permanent: true,
  //   },
  //   {
  //     source: "/usuarios",
  //     destination: "/pages/Users",
  //     permanent: true,
  //   },
  //   {
  //     source: "/signIn",
  //     destination: "/pages/SignIn",
  //     permanent: true,
  //   },
  // ],
};

module.exports = nextConfig;
