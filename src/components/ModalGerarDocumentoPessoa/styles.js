import styled from "styled-components";

// Estilos para o overlay do modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Estilos para o container do modal
export const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Estilos para o cabeçalho do modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Estilos para o botão de fechar
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

// Estilos para o formulário do modal
export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

// Estilos para cada linha do formulário
export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  & > div {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

// Estilos para as colunas do formulário
export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

// Estilos para os rótulos dos inputs
export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

// Estilos para os inputs
export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;


// Estilos para o botão de submit
export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

// Estilos para o select
export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Estilos para as opções do select
export const Option = styled.option`
  padding: 10px;
  font-size: 1rem;
  color: #333;

  &:hover {
    background-color: #f1f1f1;
  }
`;
export const Link = styled.div`
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  color: black;
 
  
  &:hover {
    text-decoration: underline;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #bdc3c7;

  &:hover {
    background-color: #95a5a6;
  }
`;
