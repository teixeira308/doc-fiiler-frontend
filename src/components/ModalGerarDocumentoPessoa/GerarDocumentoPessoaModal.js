import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import { useNavigate } from "react-router-dom";


const GerarDocumentoPessoaModal = ({ isOpen, onClose , pessoa}) => {

    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(null); // Estado para armazenar o ID do template selecionado
    const { getTemplates, downloadFilledFile} = useApi();
    const [templates, setTemplates] = useState([]);


    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await getTemplates();
                //console.log(data)
                setTemplates(data);
            } catch (error) {
                console.error("Erro ao carregar templates:", error);
            }
        };
        fetchTemplates();
    }, []);



    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await downloadFilledFile(selectedTemplate,pessoa.id);
            const fileContent = response;
            generateAndDownloadDocx(fileContent);
            onClose();
        } catch (error) {
            console.error("Erro ao gerar arquivo completado:", error);
        }
    };

    const handleSelectTemplate = (templateId) => {
        setSelectedTemplate(templateId);
    };

    const generateAndDownloadDocx = (data) => {
        try {
          // Converta os dados em um Blob
          const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          //console.log(blob);
          // Crie um URL para o Blob
          const url = URL.createObjectURL(blob);
    
          // Crie um link ancorado para fazer o download
          const link = document.createElement("a");
          link.href = url;
          link.download = pessoa.nome + ".docx";
          link.click();
          // Libere o URL criado
          URL.revokeObjectURL(url);
          //console.log("Document created and downloaded successfully");
        } catch (error) {
          console.error("Error generating or downloading document:", error);
        }
      };

    if (!isOpen) return null;

    return (
        <C.ModalOverlay>
            <C.ModalContainer>
                <C.ModalHeader>
                    <h2>Gerar Documento</h2>
                    <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
                </C.ModalHeader>
                <C.ModalForm onSubmit={handleSubmit}>
                    <C.FormRow>
                        <C.FormColumn>
                            <C.Label htmlFor="nome">Selecione o template para gerar o documento:</C.Label>
                            {templates && templates.length > 0 ? (
                                <>
                                    <C.Select
                                        id="dropdown-basic-button"
                                        value={selectedTemplate || ""}
                                        onChange={(e) => handleSelectTemplate(e.target.value)}
                                    >
                                        <C.Option value="" disabled>
                                            Selecione um template
                                        </C.Option>
                                        {templates.map((template) => (
                                            <C.Option
                                                key={template.id}
                                                value={template.id}
                                                onClick={() => handleSelectTemplate(template.id)}
                                            >
                                                {template.descricao}
                                            </C.Option>
                                        ))}
                                    </C.Select>

                                </>
                            ) : (
                                <><br />
                                    <p>Não há templates disponíveis.  </p>
                                </>
                            )}
                        </C.FormColumn>
                    </C.FormRow>
                    {templates && templates.length > 0 ? (
                        <C.Button type="submit">Gerar Documento</C.Button>
                    ) : (
                        <C.Link onClick={() => { navigate("/templates"); }}>Clique aqui e crie Templates</C.Link>
                    )}
                </C.ModalForm>
            </C.ModalContainer>
        </C.ModalOverlay>
    );
};

export default GerarDocumentoPessoaModal;
