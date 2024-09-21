import React from "react";
import * as C from "./styles";

const DetalhesPessoaModal = ({ isOpen, onClose, pessoa }) => {
  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Detalhes da Pessoa</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalBody>
          {/* Exibindo os detalhes da pessoa */}
          <div>
            <strong>Nome:</strong> {pessoa.nome}
          </div>
          <br/>
          <div>
            <strong>CPF:</strong> {pessoa.cpf}
          </div>
          <br/>
          <div>
            <strong>RG:</strong> {pessoa.rg}
          </div><br/>
          <div>
            <strong>Data de Nascimento:</strong> {pessoa.datanascimento}
          </div><br/>
          <div>
            <strong>Número da Carteira de Trabalho:</strong> {pessoa.numerocarteiratrabalho}
          </div><br/>
          <div>
            <strong>E-mail:</strong> {pessoa.email}
          </div><br/>
          <div>
            <strong>Data de Admissão:</strong> {pessoa.dataadmissao}
          </div><br/>
          <div>
            <strong>Nome da Mãe:</strong> {pessoa.nomemae}
          </div><br/>
          <div>
            <strong>Nome do Pai:</strong> {pessoa.nomepai}
          </div><br/>
          <div>
            <strong>Endereço:</strong> {pessoa.endereco}
          </div><br/>
          <div>
            <strong>Telefone:</strong> {pessoa.telefone}
          </div><br/>
          <div>
            <strong>Estado Civil:</strong> {pessoa.estadocivil}
          </div><br/>
          <div>
            <strong>Função:</strong> {pessoa.funcao}
          </div><br/>
          <div>
            <strong>Gênero:</strong> {pessoa.genero}
          </div><br/>
          <div>
            <strong>Celular:</strong> {pessoa.celular}
          </div>
        </C.ModalBody>
        <C.ModalFooter>
          <C.CancelButton onClick={onClose}>Fechar</C.CancelButton>
        </C.ModalFooter>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DetalhesPessoaModal;
