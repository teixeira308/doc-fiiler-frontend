// src/components/Modal/DeletePessoaModal.js

import React from "react";
import * as C from "./styles";

const DeletePessoaModal = ({ isOpen, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete();
      onClose();
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Confirmar Exclusão</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalBody>
          <p>Tem certeza de que deseja deletar esta pessoa?</p>
        </C.ModalBody>
        <C.ModalFooter>
          <C.Button onClick={handleDelete}>Deletar</C.Button>
          <C.CancelButton onClick={onClose}>Cancelar</C.CancelButton>
        </C.ModalFooter>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DeletePessoaModal;
