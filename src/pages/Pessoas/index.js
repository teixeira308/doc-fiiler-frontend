import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import useApi from "../../services/api";
import CreatePessoaModal from "../../components/ModalCreatePessoa/CreatePessoaModal";
import DeletePessoaModal from "../../components/ModalDeletePessoa/DeletePessoaModal"; 
import EditPessoaModal from "../../components/ModalEditarPessoa/EditarPessoaModal";
import DetalhesPessoaModal from "../../components/ModalDetalhesPessoa/DetalhesPessoaModal";

const Pessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const [filteredPessoas, setFilteredPessoas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedPessoaId, setSelectedPessoaId] = useState(null);
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const { getPessoas, deletePessoa } = useApi();
  
  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const data = await getPessoas();
        setPessoas(data.data);
        setFilteredPessoas(data.data); // Inicialize o filtro com todos os dados
      } catch (error) {
        console.error("Erro ao carregar pessoas:", error);
      }
    };
    fetchPessoas();
  }, []);

  useEffect(() => {
    // Filtra a lista de pessoas com base na consulta de busca
    setFilteredPessoas(
      pessoas.filter((pessoa) =>
        pessoa.nome.toLowerCase().includes(searchQuery.toLowerCase()) 
      )
    );
  }, [searchQuery, pessoas]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedPessoaId(null);
  };

  const handleNewPessoaCreated = async () => {
    const data = await getPessoas();
    setPessoas(data.data);
  };

  const handleDelete = async () => {
    try {
      if (selectedPessoaId) {
        await deletePessoa(selectedPessoaId);
        setPessoas(pessoas.filter((pessoa) => pessoa.id !== selectedPessoaId));
      }
      handleDeleteModalClose();
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedPessoaId(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (pessoa) => {
    setSelectedPessoa(pessoa);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedPessoa(null);
  };

  const handlePessoaUpdated = async () => {
    const data = await getPessoas();
    setPessoas(data.data);
    handleEditModalClose();
  };

  const handleViewDetails = (pessoa) => {
    setSelectedPessoa(pessoa);
    setIsViewDetailsModalOpen(true);
  };

  const handleViewDetailsModalClose = () => {
    setIsViewDetailsModalOpen(false);
    setSelectedPessoa(null);
  };

  return (
    <C.Container>
      <Navbar />
      <C.Title>Pessoas</C.Title>
      <C.SearchInput 
        type="text" 
        placeholder="Pesquisar por nome" 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      <C.Button onClick={handleCreateButtonClick}>Criar Nova Pessoa</C.Button>
      <C.Table>
        <thead>
          <tr>
            <C.TableHeader>Nome</C.TableHeader>
            <C.TableHeader>CPF</C.TableHeader>
            <C.TableHeader>Criado em</C.TableHeader>
            <C.TableHeader>Ações</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredPessoas.map((pessoa) => (
            <C.TableRow key={pessoa.id}>
              <C.TableData>{pessoa.nome}</C.TableData>
              <C.TableData>{pessoa.cpf}</C.TableData>
              <C.TableData>
                {new Date(pessoa.createdAt).toLocaleDateString()}
              </C.TableData>
              <C.TableData>
                <C.ActionButton onClick={() => openEditModal(pessoa)}>Editar</C.ActionButton>
                <C.ActionButton onClick={() => handleViewDetails(pessoa)}>Detalhes</C.ActionButton>
                <C.ActionButton onClick={() => openDeleteModal(pessoa.id)}>Excluir</C.ActionButton>
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>
      <CreatePessoaModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleNewPessoaCreated}
      />
      <DeletePessoaModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDelete}
      />
      <EditPessoaModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        pessoa={selectedPessoa}
        onEdit={handlePessoaUpdated}
      />
      <DetalhesPessoaModal
        isOpen={isViewDetailsModalOpen}
        onClose={handleViewDetailsModalClose}
        pessoa={selectedPessoa}
      />
    </C.Container>
  );
};

export default Pessoas;
