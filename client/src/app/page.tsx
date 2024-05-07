"use client";

import React from "react";

import { useAuth } from "@/hooks";
import { Carousel, Section } from "@/components";
import * as D from "./data";

const Home = () => {
  const { session } = useAuth();
  const userType = session?.user?.type;

  const renderSection = (
    title: string,
    description: string,
    images: { image: string }[]
  ) => (
    <Section title={title} description={description}>
      <Carousel className="w-full px-4 mb-4 md:w-3/4" data={images} />
    </Section>
  );

  return (
    <>
      <div className="flex px-2 mx-2 mb-4 sm:flex-nowrap sm:mx-0">
        <h1 className="font-mono text-3xl font-semibold text-primary">
          Olá{!!session ? `, ${session?.user?.name}!` : "!"} Bem-vindo(a) ao
          Sistema de Reservas!
        </h1>
      </div>
      <h3 className="px-2 mx-2 mb-4 text-lg font-normal text-justify text-primary sm:mx-0">
        Aqui você pode agendar facilmente os ambientes disponíveis para suas
        atividades acadêmicas ou de pesquisa. Nossa plataforma oferece uma
        experiência simplificada para gerenciar suas reservas e garantir que
        você tenha os ambientes certos no momento certo.
      </h3>

      {renderSection(
        "Reservar",
        "Esta é a tela de reserva, equipada com um calendário que oferece visualização semanal, mensal, diária e em forma de agenda. Aqui, você pode facilmente fazer solicitações de reserva para ambientes. Basta um clique e um arrastar para baixo para selecionar o horário desejado para a reserva. Ao fazê-lo, um formulário será exibido, permitindo que você preencha detalhes importantes, como a natureza semestral da reserva, título da solicitação e o ambiente desejado. Ao clicar em 'Solicitar' no formulário, sua solicitação será enviada para os responsáveis pelo ambiente, que terão a opção de aprovar ou recusar. Além disso, esta tela oferece a conveniência de filtrar as reservas por ambiente e tipo, o que melhora significativamente a visualização. Assim, você tem total controle sobre suas solicitações e pode ajustar sua agenda de acordo com suas necessidades acadêmicas ou de pesquisa.",
        D.reserveImages
      )}

      {userType === "Docente ou TAE" ? (
        <>
          {renderSection(
            "Ambientes",
            "Esta é a tela de listagem de ambientes, onde você tem acesso a todos os ambientes disponíveis. Aqui, você pode verificar a disponibilidade de cada ambiente, identificar o tipo de espaço e quem é o responsável por sua gestão. Ao clicar no botão de visualização, você terá acesso a informações detalhadas, incluindo a capacidade de pessoas suportada, o número de máquinas (se o ambiente for um laboratório), uma breve descrição e informações sobre a segurança do ambiente, como fechaduras e trancas.",
            D.ambiencesImages
          )}
          {renderSection(
            "Solicitações",
            "Esta é a tela de listagem de solicitações, onde você terá acesso a todas as solicitações relacionadas aos ambientes sob sua responsabilidade. Neste espaço, você pode revisar os detalhes das solicitações, incluindo o título da solicitação, o ambiente específico, o nome do solicitante e o status atual. Ao selecionar a opção de visualização, você poderá explorar informações mais detalhadas, como a data e horário da reserva, bem como se a solicitação é para uma reserva semestral ou não. Além disso, nesta tela, você terá a capacidade de aprovar ou recusar solicitações, proporcionando um controle completo sobre o processo de gestão.",
            D.solicitationsImages
          )}
        </>
      ) : !!userType ? (
        <>
          {renderSection(
            "Ambientes",
            "Esta é a tela de listagem de ambientes, onde você tem acesso a todos os ambientes disponíveis. Aqui, você pode verificar a disponibilidade de cada ambiente, identificar o tipo de espaço e quem é o responsável por sua gestão. Ao clicar no botão de visualização, você terá acesso a informações detalhadas, incluindo a capacidade de pessoas suportada, o número de máquinas (se o ambiente for um laboratório), uma breve descrição e informações sobre a segurança do ambiente, como fechaduras e trancas.",
            D.ambiencesImages
          )}
        </>
      ) : null}
    </>
  );
};

export default Home;
