// src/components/Modal/CreatePessoaModal.js

import React, { useState } from "react";
import * as C from "./styles";
import useApi from "../../services/api";

const CreatePessoaModal = ({ isOpen, onClose, onCreate }) => {
  const { createPessoa } = useApi();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    numeroCarteiraTrabalho: "",
    email: "",
    dataAdmissao: "",
    nomeMae: "",
    nomePai: "",
    endereco: "",
    telefone: "",
    estadoCivil: "",
    funcao: "",
    genero: "",
    celular: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetFormData = () => {
    setFormData({
      nome: "",
      cpf: "",
      rg: "",
      dataNascimento: "",
      numeroCarteiraTrabalho: "",
      email: "",
      dataAdmissao: "",
      nomeMae: "",
      nomePai: "",
      endereco: "",
      telefone: "",
      estadoCivil: "",
      funcao: "",
      genero: "",
      celular: "",
    });
  };
  

  const handleClose = () => {
    onClose();
    resetFormData(); // Adicione isso para limpar o formulário
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPessoa(formData);
      onCreate();
      handleClose();
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Criar Nova Pessoa</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
       
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default CreatePessoaModal;
