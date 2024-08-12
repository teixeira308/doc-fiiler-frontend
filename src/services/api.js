// src/services/api.js
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
const useApi = () => {
  const { user } = useContext(AuthContext);

  const getPessoas = async () => {
    const response = await fetch("http://localhost:3000/v1/pessoas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar pessoas");
    }

    return await response.json();
  };

  const createPessoa = async (pessoaData) => {
    const json = removeEmptyFields(pessoaData)
    const response = await fetch("http://localhost:3000/v1/pessoas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(json),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar pessoa");
    }

    return await response.json();
  };

  const deletePessoa = async (id) => {
    const response = await fetch(`http://localhost:3000/v1/pessoas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar pessoa");
    }

    return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.
  };

  function removeEmptyFields(obj) {
    // Cria um novo objeto iterando sobre as chaves do objeto original
    return Object.fromEntries(
        // Filtra as entradas (pares [chave, valor]) onde o valor não é nulo ou vazio
        Object.entries(obj).filter(([_, value]) => value != null && value !== '')
    );
}

const updatePessoa = async (id, pessoaData) => {
  //const json = removeEmptyFields(pessoaData);
  //console.log(json)
  const response = await fetch(`http://localhost:3000/v1/pessoas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify(pessoaData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao atualizar pessoa");
  }

  return await response.json();
};

  return {
    getPessoas,
    createPessoa,
    deletePessoa,
    updatePessoa
  };
};

export default useApi;
