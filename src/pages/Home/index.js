import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <C.Container>
      <Navbar />
      <C.Title>Bem vindo ao Doc Filler</C.Title>
      <C.Section>
        <C.Subtitle>Vamos começar?</C.Subtitle>
        <C.Step>
          <C.StepTitle>1. Configure Templates</C.StepTitle>
          <C.StepDescription>
          Vá para o menu "Templates" para criar e configurar modelos que usarão os dados que você vai adicionar.
          </C.StepDescription>
        </C.Step>
        <C.Step>
          <C.StepTitle>2. Registre pessoas</C.StepTitle>
          <C.StepDescription>
            No menu "Pessoas" comece a adicionar pessoas e seus dados.
          </C.StepDescription>
        </C.Step>
        <C.Step>
          <C.StepTitle>3. Gere documentos automaticamente</C.StepTitle>
          <C.StepDescription>
            Selecione a pessoa e gere documentos automaticamente com os dados inseridos.
          </C.StepDescription>
        </C.Step>
      </C.Section>
    </C.Container>
  );
};

export default Home;
