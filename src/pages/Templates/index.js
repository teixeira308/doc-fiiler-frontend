import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import useApi from "../../services/api";
import CreateTemplateModal from "../../components/ModalCreateTemplate/CreateTemplateModal";

const Templates = ()  => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { getTemplates, deleteTemplate } = useApi();
  
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data.data);
        setFilteredTemplates(data.data); // Inicialize o filtro com todos os dados
      } catch (error) {
        console.error("Erro ao carregar templates:", error);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    // Filtra a lista de pessoas com base na consulta de busca
    setFilteredTemplates(
      templates.filter((template) =>
        template.nome.toLowerCase().includes(searchQuery.toLowerCase()) 
      )
    );
  }, [searchQuery, templates]);

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
    setSelectedTemplateId(null);
  };

  const handleNewTemplateCreated = async () => {
    const data = await getTemplates();
    setTemplates(data.data);
  };

  const handleDelete = async () => {
    try {
      if (selectedTemplateId) {
        await deleteTemplate(selectedTemplateId);
        setTemplates(templates.filter((template) => template.id !== selectedTemplateId));
      }
      handleDeleteModalClose();
    } catch (error) {
      console.error("Erro ao deletar template:", error);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedTemplateId(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (template) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleTemplateUpdated = async () => {
    const data = await getTemplates();
    setTemplates(data.data);
    handleEditModalClose();
  };

  const handleViewDetails = (template) => {
    setSelectedTemplate(template);
    setIsViewDetailsModalOpen(true);
  };

  const handleViewDetailsModalClose = () => {
    setIsViewDetailsModalOpen(false);
    setSelectedTemplate(null);
  };


  return (
    <C.Container>
      <Navbar />
      <C.Title>Templates</C.Title>
      <C.SearchInput 
        type="text" 
        placeholder="Pesquisar por nome" 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      <C.Button onClick={handleCreateButtonClick}>Criar Novo Template</C.Button>
      <C.Table>
        <thead>
          <tr>
            <C.TableHeader>Nome</C.TableHeader>
            <C.TableHeader>Arquivo</C.TableHeader>
            <C.TableHeader>Criado em</C.TableHeader>
            <C.TableHeader>Ações</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredTemplates.map((template) => (
            <C.TableRow key={template.id}>
              <C.TableData>{template.nome}</C.TableData>
              <C.TableData>{template.cpf}</C.TableData>
              <C.TableData>
                {new Date(template.createdAt).toLocaleDateString()}
              </C.TableData>
              <C.TableData>
               {/* <C.ActionButton onClick={() => openEditModal(template)}>Editar</C.ActionButton>
                <C.ActionButton onClick={() => handleViewDetails(template)}>Detalhes</C.ActionButton>
                <C.ActionButton onClick={() => openDeleteModal(template.id)}>Excluir</C.ActionButton>*/} 
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>
      <CreateTemplateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleNewTemplateCreated}
      />
     {/*  <DeleteTemplateModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDelete}
      />
      <EditTemplateModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        pessoa={selectedTemplate}
        onEdit={handleTemplateUpdated}
      />
      <DetalhesTemplateModal
        isOpen={isViewDetailsModalOpen}
        onClose={handleViewDetailsModalClose}
        pessoa={selectedTemplate}
      />*/}
    </C.Container>
  );
};

export default Templates;